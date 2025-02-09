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
} from '../../utils/jwttoken';
import {
	setSessionStorage,
	getSessionStorage,
	clearSessionStorage,
} from '../../utils/storage';

const API_MEMBER_REFRESH_TOKEN = 'member/refresh';
const API_MEMBER_CSRF_TOKEN = 'member/csrf-token';

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
		async (error: AxiosError) => {
			const { status, config } = error.response as AxiosResponse;
			const headers = config.headers as AxiosResponseHeaders;
			// -> Access Token 인증 실패 (UNAUTHORIZED : status === 401)
			if (status === 401 && isAuthenticated()) {
				const tokenData = {
					username: getSessionStorage(JWT_USERNAME),
					accesstoken: getSessionStorage(JWT_ACCESS_TOKEN),
					refreshtoken: getSessionStorage(JWT_REFRESH_TOKEN),
				};
				clearSessionStorage(JWT_ACCESS_TOKEN);
				const { status, data } = await axios.patch(
					[config.baseURL, API_MEMBER_REFRESH_TOKEN].join('/'),
					tokenData
				); // O
				if (status === 201) {
					setSessionStorage(JWT_ACCESS_TOKEN, data.accesstoken);
					headers.Authorization = ['Bearer', getAccessToken()].join(' ');
				} else {
					clearSessionStorage(JWT_USERNAME);
					clearSessionStorage(JWT_REFRESH_TOKEN);
				}
				return axios(config);
			}

			// -> Refresh Token 인증 실패 (FORBIDDEN : status === 403)
			if (status === 403) {
				if (config.url === API_MEMBER_REFRESH_TOKEN) {
					clearSessionStorage(JWT_USERNAME);
					clearSessionStorage(JWT_ACCESS_TOKEN);
					clearSessionStorage(JWT_REFRESH_TOKEN);
					return axios(config);
				} else {
					if (['post', 'put', 'delete'].includes(config.method ?? '')) {
						const { status, data } = await axios.get(
							[config.baseURL, API_MEMBER_CSRF_TOKEN].join('/')
						); // O
						if (status === 200) {
							headers['X-XSRF-TOKEN'] = data.csrfToken;
							return axios(config);
						}
					}
				}
			}

			return Promise.reject(error); // [Case - 2.2] : 요청 에러 처리를 작성함
		}
	);
	return instance;
};

export { setInterceptors };
