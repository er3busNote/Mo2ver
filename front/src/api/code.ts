import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess } from '../store/index';
import { CSRFData } from './types';

const code = (instance: AxiosInstance) => {
	return {
		// 공통코드 조회 API : <baseURL>/code/list
		list:
			(groupCodelist: Array<string>, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('code/list', groupCodelist, {
						headers: {
							'X-XSRF-TOKEN': csrfData.csrfToken,
						},
					})
					.then((response: AxiosResponse) => {
						dispatch(tokenSuccess(response.data));
						return response.data;
					})
					.catch((error: AxiosError) => {
						return error.response;
					}),
	};
};

export default code;
