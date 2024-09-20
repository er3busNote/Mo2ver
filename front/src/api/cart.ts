import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess } from '../store/index';
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
					return error.response;
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
					return error.response;
				}),
		// 장바구니 삭제 API : <baseURL>/cart/delete
		delete: (cartIndex?: number) => (dispatch: Dispatch) =>
			instance
				.delete(cartIndex ? `cart/delete/${cartIndex}` : 'cart/delete')
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					return error.response;
				}),
	};
};

export default cart;
