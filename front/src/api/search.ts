import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';
import { PageData } from './types';

const search = (instance: AxiosInstance) => {
	return {
		// 상품 검색 API : <baseURL>/search/goods
		goods: (keyword: string, pageData: PageData) => (dispatch: Dispatch) =>
			instance
				.get(
					`search/goods?page=${pageData.page}&size=${pageData.size}&keyword=${keyword}`
				)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 최근 검색어 API : <baseURL>/search/recent
		recent: () => (dispatch: Dispatch) =>
			instance
				.get('search/recent')
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default search;
