import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import {
	loginSuccess,
	loginFailure,
	logoutSuccess,
	tokenSuccess,
	toastMessage,
} from '../store/index';
import {
	JWT_USERNAME,
	JWT_ACCESS_TOKEN,
	JWT_REFRESH_TOKEN,
} from '../utils/jwttoken';
import { setSessionStorage, clearSessionStorage } from '../utils/storage';
import { LoginData, SignUpData, TokenData, CSRFData } from './types';

const member = (instance: AxiosInstance) => {
	return {
		// 로그인 API : <baseURL>/member/login
		login: (userData: LoginData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.post('member/login', userData, {
					headers: {
						//Cookie: 'XSRF-TOKEN=' + csrfData.csrfToken,
						'X-XSRF-TOKEN': csrfData.csrfToken,
					},
				})
				.then((response: AxiosResponse) => {
					console.log(response.data);
					const tokenData = {
						username: response.data.username,
						accesstoken: response.data.accesstoken,
						refreshtoken: response.data.refreshtoken,
					};
					dispatch(
						toastMessage({
							message: '반갑습니다. ' + response.data.username + '님',
							type: 'success',
						})
					);
					dispatch(loginSuccess(tokenData.accesstoken));
					setSessionStorage(JWT_USERNAME, tokenData.username);
					setSessionStorage(JWT_ACCESS_TOKEN, tokenData.accesstoken);
					setSessionStorage(JWT_REFRESH_TOKEN, tokenData.refreshtoken);
				})
				.catch((error: AxiosError) => {
					console.log(csrfData);
					console.log(error.response);
					const { status, data } = error.response as AxiosResponse;
					if (status === 400) {
						dispatch(
							toastMessage({
								message: '올바르지 않은 로그인 형식입니다',
								type: 'info',
							})
						);
					} else if (status === 401) {
						dispatch(toastMessage({ message: data.message, type: 'warning' }));
					} else if (status === 403) {
						dispatch(
							toastMessage({
								message: 'CSRF Token이 유효하지 않습니다',
								type: 'warning',
							})
						);
					} else if (status === 504) {
						dispatch(
							toastMessage({ message: '서버가 닫혀있습니다', type: 'error' })
						);
					} else {
						dispatch(toastMessage({ message: data.message, type: 'error' }));
					}
					dispatch(loginFailure(error.message));
				}),
		logout: () => (dispatch: Dispatch) => {
			clearSessionStorage(JWT_USERNAME);
			clearSessionStorage(JWT_ACCESS_TOKEN);
			clearSessionStorage(JWT_REFRESH_TOKEN);
			dispatch(logoutSuccess());
		},
		// 회원가입 API : <baseURL>/member/signup
		signup:
			(userData: SignUpData, csrfData: CSRFData) => (dispatch: Dispatch) =>
				instance
					.post('member/signup', userData, {
						headers: {
							//Cookie: 'XSRF-TOKEN=' + csrfData.csrfToken,
							'X-XSRF-TOKEN': csrfData.csrfToken,
						},
					})
					.then((response: AxiosResponse) => {
						dispatch(
							toastMessage({ message: response.data.message, type: 'success' })
						);
					})
					.catch((error: AxiosError) => {
						const { status, data } = error.response as AxiosResponse;
						if (status === 400) {
							dispatch(
								toastMessage({
									message: '올바르지 않은 회원가입 형식입니다',
									type: 'info',
								})
							);
						} else if (status === 403) {
							dispatch(
								toastMessage({
									message: 'CSRF Token이 유효하지 않습니다',
									type: 'warning',
								})
							);
						} else if (status === 422) {
							dispatch(
								toastMessage({ message: data.message, type: 'warning' })
							);
						} else if (status === 504) {
							dispatch(
								toastMessage({ message: '서버가 닫혀있습니다', type: 'error' })
							);
						} else {
							dispatch(toastMessage({ message: data.message, type: 'error' }));
						}
					}),
		// Access 토큰 재생성 API : <baseURL>/member/refresh
		refresh: (tokenData: TokenData) => (dispatch: Dispatch) =>
			instance
				.patch('member/refresh', tokenData)
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					dispatch(loginFailure(error.message));
					return error.response?.data;
				}),
		// CSRF 토큰 생성 API : <baseURL>/member/csrf-token
		csrf: () => (dispatch: Dispatch) =>
			instance
				.get('member/csrf-token')
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					return error.response?.data;
				}),
	};
};

export default member;
