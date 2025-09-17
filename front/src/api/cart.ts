import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from '@handler/api';
import { toastMessage } from '@store/index';
import { CSRFData, CartData } from '@/types/api';
import {
	getAccessToken,
	getRolesFromToken,
	isAuthenticated,
} from '@utils/jwttoken';

const cart = (instance: AxiosInstance) => {
	return {
		// 장바구니 리스트 API : <baseURL>/cart/list
		list: () => (dispatch: Dispatch) =>
			instance
				.get('cart/list')
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 장바구니 추가 API : <baseURL>/cart/add
		add: (cartData: CartData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.post('cart/add', cartData, {
					headers: {
						'X-XSRF-TOKEN': csrfData?.csrfToken,
					},
				})
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => {
					const { status, data } = error.response as AxiosResponse;
					if (status === 403) {
						if (isAuthenticated()) {
							const accessToken = getAccessToken();
							const roles = getRolesFromToken(accessToken);
							dispatch(
								toastMessage({
									message:
										'허용되지 않은 접근입니다 : ' + roles.join(',') + ' 권한',
									type: 'warning',
								})
							);
						}
					} else {
						dispatch(toastMessage({ message: data.message, type: 'error' }));
					}
				}),
		// 장바구니 수정 API : <baseURL>/cart/update
		update: (cartData: CartData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.put('cart/update', cartData, {
					headers: {
						'X-XSRF-TOKEN': csrfData?.csrfToken,
					},
				})
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 장바구니 삭제 API : <baseURL>/cart/delete
		delete: (goodsCode: string, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.delete(`cart/delete/${goodsCode}`, {
					headers: {
						'X-XSRF-TOKEN': csrfData?.csrfToken,
					},
				})
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 장바구니 전체 삭제 API : <baseURL>/cart/deleteAll
		deleteAll: (csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.delete('cart/delete', {
					headers: {
						'X-XSRF-TOKEN': csrfData?.csrfToken,
					},
				})
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default cart;
