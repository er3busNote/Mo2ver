import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from '@handler/api';
import {
	CSRFData,
	NoticeRequestData,
	NoticeInfoData,
	PageData,
} from '@/types/api';

const notice = (instance: AxiosInstance) => {
	return {
		// 공지사항 리스트 API : <baseURL>/notice/list
		list: (pageData: PageData) => (dispatch: Dispatch) =>
			instance
				.get(`notice/list?page=${pageData.page}&size=${pageData.size}`)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 공지사항 상세정보 API : <baseURL>/notice/info
		info: (noticeCode: string) => (dispatch: Dispatch) =>
			instance
				.get(`notice/info/${noticeCode}`)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 공지사항 상세 정보 API : <baseURL>/notice/detail
		detail:
			(noticeData: NoticeRequestData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('notice/detail', noticeData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 공지사항 정보 추가 API : <baseURL>/notice/create
		create:
			(noticeInfoData: NoticeInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('notice/create', noticeInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 공지사항 정보 수정 API : <baseURL>/notice/update
		update:
			(noticeInfoData: NoticeInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('notice/update', noticeInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default notice;
