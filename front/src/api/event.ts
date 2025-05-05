import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';
import { CSRFData, EventRequestData, EventDetailData, PageData } from './types';

const event = (instance: AxiosInstance) => {
	return {
		// 이벤트 리스트 API : <baseURL>/event/list
		list: (pageData: PageData) => (dispatch: Dispatch) =>
			instance
				.get(`event/list?page=${pageData.page}&size=${pageData.size}`)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 이벤트 상세정보 API : <baseURL>/event/info
		info: (eventCode: string) => (dispatch: Dispatch) =>
			instance
				.get(`event/info/${eventCode}`)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 이벤트 상품 상세정보 API : <baseURL>/event/product
		product: (eventCode: string, pageData: PageData) => (dispatch: Dispatch) =>
			instance
				.get(
					`event/product/${eventCode}?page=${pageData.page}&size=${pageData.size}`
				)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 이벤트 상세 정보 API : <baseURL>/event/detail
		detail:
			(eventData: EventRequestData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('event/detail', eventData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 이벤트 정보 추가 API : <baseURL>/event/create
		create:
			(eventDetailData: EventDetailData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('event/create', eventDetailData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 이벤트 정보 수정 API : <baseURL>/event/update
		update:
			(eventDetailData: EventDetailData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('event/update', eventDetailData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 이벤트 이미지 업로드 API : <baseURL>/event/upload
		upload: (formData: FormData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.post('event/upload', formData, {
					headers: {
						'X-XSRF-TOKEN': csrfData?.csrfToken,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default event;
