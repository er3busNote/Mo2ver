import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess, toastMessage } from '../store/index';
import { CSRFData, CartData } from './types';

const cart = (instance: AxiosInstance) => {
	return {
		// 장바구니 리스트 API : <baseURL>/cart/list
		list: () => (dispatch: Dispatch) =>
			instance
				.get('cart/list')
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					dispatch(toastMessage({ message: error.message, type: 'error' }));
					return error.response?.data;
				}),
		// 장바구니 추가 API : <baseURL>/cart/add
		add: (cartData: CartData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.post('cart/add', cartData, {
					headers: {
						'X-XSRF-TOKEN': csrfData.csrfToken,
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
		// 장바구니 수정 API : <baseURL>/cart/update
		update: (cartData: CartData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.put('cart/update', cartData, {
					headers: {
						'X-XSRF-TOKEN': csrfData.csrfToken,
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
		// 장바구니 삭제 API : <baseURL>/cart/delete
		delete: (goodsCode: string, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.delete(`cart/delete/${goodsCode}`, {
					headers: {
						'X-XSRF-TOKEN': csrfData.csrfToken,
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
		// 장바구니 전체 삭제 API : <baseURL>/cart/deleteAll
		deleteAll: (csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.delete('cart/delete', {
					headers: {
						'X-XSRF-TOKEN': csrfData.csrfToken,
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

export default cart;
