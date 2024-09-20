import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess } from '../store/index';
import { CSRFData, GoodsDisplayData, PageData } from './types';

const banner = (instance: AxiosInstance) => {
	return {
		// 배너 리스트 API : <baseURL>/banner/list
		list: (pageData: PageData) => (dispatch: Dispatch) =>
			instance
				.get(`banner/list?page=${pageData.page}&size=${pageData.size}`)
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					return error.response;
				}),
		// 상품 전시 정보 API : <baseURL>/banner/goods
		goods:
			(goodsDisplayData: GoodsDisplayData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('banner/goods', goodsDisplayData, {
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
		// 배너 이미지 업로드 API : <baseURL>/banner/upload
		upload: (formData: FormData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.post('banner/upload', formData, {
					headers: {
						'X-XSRF-TOKEN': csrfData.csrfToken,
						'Content-Type': 'multipart/form-data',
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

export default banner;
