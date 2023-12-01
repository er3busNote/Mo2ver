import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { MemberState } from '../store/types';
import Api from '../services/api';
import useCSRFToken from '../hooks/useCSRFToken';
import LoginForm from '../components/form/LoginForm';
import { LoginFormValues } from '../components/form/types';

interface LoginDispatchProps {
	member: ActionCreatorsMapObject;
}

const LoginPage: FC<LoginDispatchProps> = ({ member }): JSX.Element => {
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ member });
	const submitForm = (
		data: LoginFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		fetchCSRFTokenData();
		const userData = {
			username: data.username,
			password: data.password,
		};
		console.log(userData);
		console.log(csrfData);
		member.login(userData, csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
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
