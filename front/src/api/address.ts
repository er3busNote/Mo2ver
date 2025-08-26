import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';
import { CSRFData, AddressInfoData } from '../types/api';

const address = (instance: AxiosInstance) => {
	return {
		// 기본 배송지 상세정보 API : <baseURL>/address/info
		info: () => (dispatch: Dispatch) =>
			instance
				.get('address/info')
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 주소록 리스트 API : <baseURL>/address/list
		list: () => (dispatch: Dispatch) =>
			instance
				.get('address/list')
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 주소록 저장 API : <baseURL>/address/create
		create:
			(addressInfoData: AddressInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('address/create', addressInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 주소록 수정 API : <baseURL>/address/update
		update:
			(addressInfoData: AddressInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('address/update', addressInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default address;
