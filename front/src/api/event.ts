import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess } from '../store/index';
import { CSRFData, PageData } from './types';

const event = (instance: AxiosInstance) => {
	return {
		// 이벤트 상세정보 API : <baseURL>/event/info
		info: (eventCode: string, pageData: PageData) => (dispatch: Dispatch) =>
			instance
				.get(
					`event/info/${eventCode}?page=${pageData.page}&size=${pageData.size}`
				)
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					return error.response;
				}),
		// 이벤트 리스트 API : <baseURL>/event/list
		list: (pageData: PageData) => (dispatch: Dispatch) =>
			instance
				.get(`event/list?page=${pageData.page}&size=${pageData.size}`)
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					return error.response;
				}),
		// 이벤트 이미지 업로드 API : <baseURL>/event/upload
		upload: (formData: FormData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.post('event/upload', formData, {
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

export default event;
