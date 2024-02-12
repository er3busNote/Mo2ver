import React, { FC, BaseSyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { MemberState } from '../store/types';
import Api from '../services/api';
import { LoginData } from '../services/types';
import useCSRFToken from '../hooks/useCSRFToken';
import LoginForm from '../components/form/LoginForm';
import { LoginFormValues } from '../components/form/types';

interface LocationState {
	from: string;
}

interface LoginDispatchProps {
	member: ActionCreatorsMapObject;
}

const LoginPage: FC<LoginDispatchProps> = ({ member }): JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const redirectTo = (location.state as LocationState)?.from || '/';
	const submitForm = async (
		data: LoginFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		const userFormData: LoginData = {
			username: data.username,
			password: data.password,
		};
		await member.login(userFormData, csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
		navigate(redirectTo);
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
