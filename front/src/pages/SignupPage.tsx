import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../services/api';
import useCSRFToken from '../hooks/useCSRFToken';
import SignupForm from '../components/form/SignupForm';
import { SignupFormValues } from '../components/form/types';

interface SignupDispatchProps {
	member: ActionCreatorsMapObject;
}

const UserSignupPage: FC<SignupDispatchProps> = ({ member }): JSX.Element => {
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ member });
	const submitForm = (
		data: SignupFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		fetchCSRFTokenData();
		const userData = {
			email: data.email,
			username: data.username,
			password: data.password,
		};
		member.register(userData, csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
	return <SignupForm onSubmit={submitForm} />;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(null, mapDispatchToProps)(UserSignupPage);
