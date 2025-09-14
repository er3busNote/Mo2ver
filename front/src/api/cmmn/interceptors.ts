import axios, {
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosRequestHeaders,
	AxiosResponseHeaders,
	AxiosError,
	AxiosResponse,
} from 'axios';
import { store } from '@App';
import { loginSuccess, logoutSuccess } from '@store/index';
import { TokenData, TokenRequestData } from '@/types/api';
import { getAccessToken, isAuthenticated } from '@utils/jwttoken';

const API_MEMBER_REFRESH_TOKEN = 'member/refresh';

const isProduction = process.env.NODE_ENV === 'production';

const setInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const headers = config.headers as AxiosRequestHeaders;
			const accessToken = getAccessToken();
			if (isAuthenticated()) {
				headers.Authorization = ['Bearer', accessToken].join(' ');
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
			const accessToken = getAccessToken();
			// -> Access Token 인증 실패 (UNAUTHORIZED : status === 401)
			if (status === 401 && isAuthenticated()) {
				const tokenRequestData: TokenRequestData = {
					accesstoken: accessToken,
				};
				const { status, data } = await axios.patch(
					[config.baseURL, API_MEMBER_REFRESH_TOKEN].join(
						isProduction ? '' : '/'
					),
					tokenRequestData,
					{
						withCredentials: true,
					}
				); // O
				if (status === 201) {
					const tokenData: TokenData = {
						accesstoken: data.accesstoken,
						expiration: data.expiration,
					};
					store.dispatch(loginSuccess(tokenData));
					headers.Authorization = ['Bearer', data.accesstoken].join(' ');
				}
				return axios(config);
			}

			// -> Refresh Token 인증 실패 (FORBIDDEN : status === 403)
			if (status === 403 && !isAuthenticated()) {
				store.dispatch(logoutSuccess());
				window.location.href = '/auth/login';
				return axios(config);
			}

			// -> 서버 오류 (INTERNAL_SERVER_ERROR : status === 500)
			if (status === 500) {
				store.dispatch(logoutSuccess());
				window.location.href = '/auth/login';
				return axios(config);
			}

			return Promise.reject(error); // [Case - 2.2] : 요청 에러 처리를 작성함
		}
	);
	return instance;
};

export { setInterceptors };
