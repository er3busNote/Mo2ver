import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';

const menu = (instance: AxiosInstance) => {
	return {
		// 공통메뉴 조회 API : <baseURL>/menu/list
		list: (menuType: number) => (dispatch: Dispatch) =>
			instance
				.get(`menu/list/${menuType}`)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default menu;
