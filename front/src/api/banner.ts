import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';
import {
	CSRFData,
	BannerGoodsInfoData,
	BannerImageInfoData,
	BannerRequestData,
	PageData,
} from '../types/api';

const banner = (instance: AxiosInstance) => {
	return {
		// 배너 리스트 API : <baseURL>/banner/list
		list: (pageData: PageData) => (dispatch: Dispatch) =>
			instance
				.get(`banner/list?page=${pageData.page}&size=${pageData.size}`)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 배너 전시 정보 API : <baseURL>/banner/display
		display: () => (dispatch: Dispatch) =>
			instance
				.get('banner/display')
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
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
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
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
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 상품 전시 정보 추가 API : <baseURL>/banner/goods/create
		goodsCreate:
			(bannerGoodsInfoData: BannerGoodsInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('banner/goods/create', bannerGoodsInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 상품 전시 정보 수정 API : <baseURL>/banner/goods/update
		goodsUpdate:
			(bannerGoodsInfoData: BannerGoodsInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('banner/goods/update', bannerGoodsInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 배너 이미지 정보 추가 API : <baseURL>/banner/images/create
		imagesCreate:
			(bannerImageInfoData: BannerImageInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('banner/images/create', bannerImageInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 배너 이미지 정보 수정 API : <baseURL>/banner/images/update
		imagesUpdate:
			(bannerImageInfoData: BannerImageInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('banner/images/update', bannerImageInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 배너 이미지 업로드 API : <baseURL>/banner/upload
		upload: (formData: FormData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.post('banner/upload', formData, {
					headers: {
						'X-XSRF-TOKEN': csrfData?.csrfToken,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default banner;
