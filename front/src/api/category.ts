import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess, toastMessage } from '../store/index';

const category = (instance: AxiosInstance) => {
	return {
		// 카테고리 정보 API : <baseURL>/category/info
		info:
			(categoryLevel: number, upperCategoryCode: string) =>
			(dispatch: Dispatch) =>
				instance
					.get(
						upperCategoryCode === undefined || upperCategoryCode === ''
							? 'category/info/' + categoryLevel
							: 'category/info/' +
									categoryLevel +
									'?upperCategoryCode=' +
									upperCategoryCode
					)
					.then((response: AxiosResponse) => {
						dispatch(tokenSuccess(response.data));
						return response.data;
					})
					.catch((error: AxiosError) => {
						dispatch(toastMessage({ message: error.message, type: 'error' }));
						return error.response?.data;
					}),
		// 카테고리 리스트 API : <baseURL>/category/list
		list: () => (dispatch: Dispatch) =>
			instance
				.get('category/list')
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					dispatch(toastMessage({ message: error.message, type: 'error' }));
					return error.response?.data;
				}),
	};
};

export default category;
