import React, { FC, BaseSyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../services/api';
import useCSRFToken from '../hooks/useCSRFToken';
import SignupForm from '../components/form/SignupForm';
import { SignupFormValues } from '../components/form/types';

interface LocationState {
	from: string;
}

interface SignupDispatchProps {
	member: ActionCreatorsMapObject;
}

const SignupPage: FC<SignupDispatchProps> = ({ member }): JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const redirectTo = (location.state as LocationState)?.from || '/';
	const submitForm = async (
		data: SignupFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		const userFormData = {
			username: data.username,
			password: data.password,
			email: data.email,
		};
		await member.signup(userFormData, csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
		navigate(redirectTo);
	};
	return <SignupForm onSubmit={submitForm} />;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(null, mapDispatchToProps)(SignupPage);
