import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { MemberState } from '../store/types';
import Api from '../services/api';
import toastMessage from '../utils/toast';
import useCSRFToken from '../hooks/useCSRFToken';
import LoginForm from '../components/form/LoginForm';
import { LoginFormValues } from '../components/form/types';
import { setCookie, getCookie, removeCookie } from '../utils/cookie';

interface LoginDispatchProps {
	member: ActionCreatorsMapObject;
}

const LoginPage: FC<LoginDispatchProps> = ({ member }): JSX.Element => {
	const csrfData = useCSRFToken({ member });
	setCookie('XSRF-TOKEN', csrfData.csrfToken, {
		//secure: true,	// → [Case 2.4] HTTPS 설정 후 진행 (크롬 브라우저에서 강제적 DENY ISSUE)
		//httpOnly: true,
		//sameSite: 'strict',
	});
	const submitForm = (
		data: LoginFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		const userData = {
			username: data.username,
			password: data.password,
		};
		if (csrfData.csrfToken === getCookie('XSRF-TOKEN')) {
			member.login(userData, csrfData);
			if (event) event.preventDefault(); // 새로고침 방지
		} else {
			toastMessage('CSRF Token이 유효하지 않습니다', 'warn');
			removeCookie('XSRF-TOKEN'); // → [Case 2.3] XSRF-TOKEN이 여러개일 경우, 하나로 병합..!
			setCookie('XSRF-TOKEN', csrfData.csrfToken, {
				//secure: true,	// → [Case 2.4] HTTPS 설정 후 진행 (크롬 브라우저에서 강제적 DENY ISSUE)
				//httpOnly: true,
				//sameSite: 'strict',
			});
			toastMessage('다시 입력해 주세요', 'info');
		}
	};
	return <LoginForm onSubmit={submitForm} />;
};

const mapStateToProps = (state: any) => ({
	isAuthenticated: (state.auth as MemberState).isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
