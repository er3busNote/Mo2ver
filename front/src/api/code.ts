import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';
import { CSRFData } from '../types/api';

const code = (instance: AxiosInstance) => {
	return {
		// 공통코드 조회 API : <baseURL>/code/list
		list:
			(groupCodelist: Array<string>, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('code/list', groupCodelist, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default code;
