import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from '@handler/api';
import { CSRFData, ReviewInfoData, PageData } from '@/types/api';

const review = (instance: AxiosInstance) => {
	return {
		// 리뷰 리스트 API : <baseURL>/review/list
		list: (goodsCode: string, pageData: PageData) => (dispatch: Dispatch) =>
			instance
				.get(
					`review/list/${goodsCode}?page=${pageData.page}&size=${pageData.size}`
				)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 리뷰 추가 API : <baseURL>/review/create
		create:
			(reviewInfoData: ReviewInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('review/create', reviewInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 리뷰 수정 API : <baseURL>/review/update
		update:
			(reviewInfoData: ReviewInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.put('review/update', reviewInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 리뷰 삭제 API : <baseURL>/review/delete
		delete: (reviewNo: number, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.delete(`review/delete/${reviewNo}`, {
					headers: {
						'X-XSRF-TOKEN': csrfData?.csrfToken,
					},
				})
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default review;
