import axios, { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import {
	loginSuccess,
	loginFailure,
	logoutSuccess,
	tokenSuccess,
} from '../store/index';
import {
	JWT_USERNAME,
	JWT_ACCESS_TOKEN,
	JWT_REFRESH_TOKEN,
} from '../utils/jwttoken';
import toastMessage from '../utils/toast';
import { setSessionStorage, clearSessionStorage } from '../utils/storage';
import { setInterceptors } from './common/interceptors';
import { LoginData, SignUpData, TokenData, CSRFData } from './types';

// 인스턴스 API 생성
const createInstance = () => {
	const instance = axios.create({
		//baseURL: '/api', // [Case 1] CRA Proxy → X
		baseURL: process.env.REACT_APP_API_URL, // [Case 2.1] Server CORS Origin → O
		withCredentials: true, // [Case 2.2] Client CORS 요청 시 쿠키 포함 여부 설정
	});
	//delete axios.defaults.headers.common['X-XSRF-TOKEN'];

	return setInterceptors(instance);
};
const instance = createInstance();

const member = {
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
				const tokenData = {
					username: response.data.username,
					accesstoken: response.data.accesstoken,
					refreshtoken: response.data.refreshtoken,
				};
				toastMessage(response.data, 'success');
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
					toastMessage('올바르지 않은 로그인 형식입니다', 'info');
				} else if (status === 401) {
					toastMessage(data.message, 'warn');
				} else if (status === 403) {
					toastMessage('CSRF Token이 유효하지 않습니다', 'warn');
				} else if (status === 504) {
					toastMessage('서버가 닫혀있습니다', 'error');
				} else {
					toastMessage(data, 'error');
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
	signup: (userData: SignUpData, csrfData: CSRFData) => () =>
		instance
			.post('member/signup', userData, {
				headers: {
					//Cookie: 'XSRF-TOKEN=' + csrfData.csrfToken,
					'X-XSRF-TOKEN': csrfData.csrfToken,
				},
			})
			.then((response: AxiosResponse) => {
				toastMessage(response.data, 'success');
			})
			.catch((error: AxiosError) => {
				const { status, data } = error.response as AxiosResponse;
				if (status === 400) {
					toastMessage('올바르지 않은 회원가입 형식입니다', 'info');
				} else if (status === 403) {
					toastMessage('CSRF Token이 유효하지 않습니다', 'warn');
				} else if (status === 422) {
					toastMessage(data.message, 'warn');
				} else if (status === 504) {
					toastMessage('서버가 닫혀있습니다', 'error');
				} else {
					toastMessage(data, 'error');
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
				return error.response;
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
				return error.response;
			}),
};

const category = {
	// CSRF 토큰 생성 API : <baseURL>/category/list
	list: () => (dispatch: Dispatch) =>
		instance
			.get('category/list')
			.then((response: AxiosResponse) => {
				dispatch(tokenSuccess(response.data));
				return response.data;
			})
			.catch((error: AxiosError) => {
				return error.response;
			}),
};

const api = {
	member,
	category,
};

export default { ...api };
