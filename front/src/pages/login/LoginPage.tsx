import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { MemberState } from '@/types/store';
import Api from '@api/index';
import { LoginData } from '@/types/api';
import useCSRFToken from '@hooks/member/query/useCSRFToken';
import LoginForm from './LoginForm';
import { LoginFormValues } from '@/types/form';

const loginSchema = yup
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
			.max(50, '입력 범위가 초과되었습니다'),
	})
	.required();

interface LocationState {
	from: string;
}

interface LoginDispatchProps {
	member: ActionCreatorsMapObject;
}

const LoginPage: FC<LoginDispatchProps> = ({ member }): JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const { data: csrfData } = useCSRFToken({ member });
	const redirectTo = (location.state as LocationState)?.from || '/';

	const methods = useForm<LoginFormValues>({
		resolver: yupResolver(loginSchema),
	});

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

	return (
		<FormProvider {...methods}>
			<LoginForm onSubmit={submitForm} />
		</FormProvider>
	);
};

const mapStateToProps = (state: any) => ({
	isAuthenticated: (state.auth as MemberState).isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
