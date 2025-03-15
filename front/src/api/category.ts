import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';

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
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 카테고리 리스트 API : <baseURL>/category/list
		list: () => (dispatch: Dispatch) =>
			instance
				.get('category/list')
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default category;
