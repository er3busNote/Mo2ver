import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { SignUpData } from '@/types/api';
import useCSRFToken from '@services/useCSRFToken';
import SignupForm from './SignupForm';
import { SignupFormValues } from '@/types/form';
import { isEmail, isPassword } from '@utils/validation';

const signupSchema = yup
	.object({
		username: yup
			.string()
			.required('아이디를 입력해주세요')
			.min(3, '3자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		password: yup
			.string()
			.required('비밀번호를 입력해주세요')
			.min(8, '8자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다')
			.matches(
				isPassword,
				'비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.'
			),
		repeat_password: yup
			.string()
			.required('비밀번호를 입력해주세요')
			.oneOf([yup.ref('password')], '패스워드가 일치하지 않습니다'),
		email: yup
			.string()
			.required('이메일을 입력해주세요')
			.matches(isEmail, '유효하지 않은 이메일 주소입니다')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
	})
	.required();

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

	const methods = useForm<SignupFormValues>({
		resolver: yupResolver(signupSchema),
	});

	const submitForm = async (
		data: SignupFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		const userFormData: SignUpData = {
			username: data.username,
			password: data.password,
			email: data.email,
		};
		await member.signup(userFormData, csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
		navigate(redirectTo);
	};

	return (
		<FormProvider {...methods}>
			<SignupForm onSubmit={submitForm} />
		</FormProvider>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(null, mapDispatchToProps)(SignupPage);
