import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../services/api';
import toastMessage from '../utils/toast';
import useCSRFToken from '../hooks/useCSRFToken';
import SignupForm from '../components/form/SignupForm';
import { SignupFormValues } from '../components/form/types';
import { setCookie, getCookie, removeCookie } from '../utils/cookie';

interface SignupDispatchProps {
	member: ActionCreatorsMapObject;
}

const SignupPage: FC<SignupDispatchProps> = ({ member }): JSX.Element => {
	const csrfData = useCSRFToken({ member });
	setCookie('XSRF-TOKEN', csrfData.csrfToken, {
		//secure: true,	// → [Case 2.4] HTTPS 설정을 진행해야함 (크롬 브라우저에서 강제적으로 막는 경우..)
		//httpOnly: true,
		//sameSite: 'strict',
	});
	const submitForm = (
		data: SignupFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		const userData = {
			username: data.username,
			password: data.password,
			email: data.email,
		};
		if (csrfData.csrfToken === getCookie('XSRF-TOKEN')) {
			member.signup(userData, csrfData);
			if (event) event.preventDefault(); // 새로고침 방지
		} else {
			toastMessage('CSRF Token이 유효하지 않습니다', 'warn');
			removeCookie('XSRF-TOKEN'); // → [Case 2.3] XSRF-TOKEN이 여러개일 경우 다 지우고, 하나로 병합..!
			setCookie('XSRF-TOKEN', csrfData.csrfToken, {
				//secure: true,	// → [Case 2.4] HTTPS 설정을 진행해야함 (크롬 브라우저에서 강제적으로 막는 경우..)
				//httpOnly: true,
				//sameSite: 'strict',
			});
			toastMessage('다시 입력해 주세요', 'info');
		}
	};
	return <SignupForm onSubmit={submitForm} />;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(null, mapDispatchToProps)(SignupPage);
