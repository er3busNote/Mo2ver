import axios, {
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosRequestHeaders,
	AxiosResponseHeaders,
	AxiosError,
	AxiosResponse,
} from 'axios';
import {
	JWT_USERNAME,
	JWT_ACCESS_TOKEN,
	JWT_REFRESH_TOKEN,
	getAccessToken,
	isAuthenticated,
	clearAuthenticated,
} from '../../utils/jwttoken';
import { setSessionStorage, getSessionStorage } from '../../utils/storage';

const API_MEMBER_REFRESH_TOKEN = 'member/refresh';

const isProduction = process.env.NODE_ENV === 'production';

const setInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const headers = config.headers as AxiosRequestHeaders;
			if (isAuthenticated()) {
				headers.Authorization = ['Bearer', getAccessToken()].join(' ');
			}
			return config;
		},
		(error: AxiosError) => Promise.reject(error)
	);

	instance.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError): Promise<AxiosResponse> => {
			const { status, config } = error.response as AxiosResponse;
			const headers = config.headers as AxiosResponseHeaders;
			// -> Access Token 인증 실패 (UNAUTHORIZED : status === 401)
			if (status === 401 && isAuthenticated()) {
				const tokenData = {
					username: getSessionStorage(JWT_USERNAME),
					accesstoken: getSessionStorage(JWT_ACCESS_TOKEN),
					refreshtoken: getSessionStorage(JWT_REFRESH_TOKEN),
				};
				const { status, data } = await axios.patch(
					[config.baseURL, API_MEMBER_REFRESH_TOKEN].join(
						isProduction ? '' : '/'
					),
					tokenData
				); // O
				if (status === 201) {
					setSessionStorage(JWT_ACCESS_TOKEN, data.accesstoken);
					headers.Authorization = ['Bearer', getAccessToken()].join(' ');
				}
				return axios(config);
			}

			// -> Refresh Token 인증 실패 (FORBIDDEN : status === 403)
			if (status === 403) {
				if (config.url === API_MEMBER_REFRESH_TOKEN) {
					clearAuthenticated();
					window.location.href = '/auth/login';
					return axios(config);
				}
			}

			// -> 서버 오류 (INTERNAL_SERVER_ERROR : status === 500)
			if (status === 500) {
				clearAuthenticated();
				window.location.href = '/auth/login';
				return axios(config);
			}

			return Promise.reject(error); // [Case - 2.2] : 요청 에러 처리를 작성함
		}
	);
	return instance;
};

export { setInterceptors };
