import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess, toastMessage } from '../store/index';
import {
	CSRFData,
	GoodsDisplayData,
	BannerImageData,
	BannerRequestData,
	PageData,
} from './types';

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
					dispatch(toastMessage({ message: error.message, type: 'error' }));
					return error.response?.data;
				}),
		// 배너 전시 정보 API : <baseURL>/banner/display
		display: () => (dispatch: Dispatch) =>
			instance
				.get('banner/display')
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					dispatch(toastMessage({ message: error.message, type: 'error' }));
					return error.response?.data;
				}),
		// 배너 상품 상세 정보 API : <baseURL>/banner/goods/detail
		goodsDetail:
			(bannerData: BannerRequestData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('banner/goods/detail', bannerData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => {
						dispatch(tokenSuccess(response.data));
						return response.data;
					})
					.catch((error: AxiosError) => {
						dispatch(toastMessage({ message: error.message, type: 'error' }));
						return error.response?.data;
					}),
		// 배너 이미지 상세 정보 API : <baseURL>/banner/images/detail
		imagesDetail:
			(bannerData: BannerRequestData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('banner/images/detail', bannerData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => {
						dispatch(tokenSuccess(response.data));
						return response.data;
					})
					.catch((error: AxiosError) => {
						dispatch(toastMessage({ message: error.message, type: 'error' }));
						return error.response?.data;
					}),
		// 상품 전시 정보 추가 API : <baseURL>/banner/goods/create
		goodsCreate:
			(goodsDisplayData: GoodsDisplayData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('banner/goods/create', goodsDisplayData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => {
						dispatch(tokenSuccess(response.data));
						return response.data;
					})
					.catch((error: AxiosError) => {
						dispatch(toastMessage({ message: error.message, type: 'error' }));
						return error.response?.data;
					}),
		// 상품 전시 정보 수정 API : <baseURL>/banner/goods/updata
		goodsUpdate:
			(goodsDisplayData: GoodsDisplayData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('banner/goods/update', goodsDisplayData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => {
						dispatch(tokenSuccess(response.data));
						return response.data;
					})
					.catch((error: AxiosError) => {
						dispatch(toastMessage({ message: error.message, type: 'error' }));
						return error.response?.data;
					}),
		// 배너 이미지 정보 추가 API : <baseURL>/banner/images/create
		imagesCreate:
			(BannerImageData: BannerImageData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('banner/images/create', BannerImageData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => {
						dispatch(tokenSuccess(response.data));
						return response.data;
					})
					.catch((error: AxiosError) => {
						dispatch(toastMessage({ message: error.message, type: 'error' }));
						return error.response?.data;
					}),
		// 배너 이미지 정보 수정 API : <baseURL>/banner/images/updata
		imagesUpdate:
			(BannerImageData: BannerImageData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('banner/images/update', BannerImageData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => {
						dispatch(tokenSuccess(response.data));
						return response.data;
					})
					.catch((error: AxiosError) => {
						dispatch(toastMessage({ message: error.message, type: 'error' }));
						return error.response?.data;
					}),
		// 배너 이미지 업로드 API : <baseURL>/banner/upload
		upload: (formData: FormData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.post('banner/upload', formData, {
					headers: {
						'X-XSRF-TOKEN': csrfData?.csrfToken,
						'Content-Type': 'multipart/form-data',
					},
				})
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

export default banner;
