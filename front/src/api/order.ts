import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';
import {
	CSRFData,
	OrderInfoData,
	OrderCouponData,
	OrderPointData,
} from '../types/api';

const order = (instance: AxiosInstance) => {
	return {
		// 주문 상세정보 API : <baseURL>/order/info
		info: (orderId: string) => (dispatch: Dispatch) =>
			instance
				.get('order/info/' + orderId)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 주문 저장 API : <baseURL>/order/create
		create:
			(orderInfoData: OrderInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('order/create', orderInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => response)
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 주문 쿠폰 정보 수정 API : <baseURL>/order/update/coupon
		updateCoupon:
			(orderCouponData: OrderCouponData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('order/update/coupon', orderCouponData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 주문 포인트 정보 수정 API : <baseURL>/order/update/point
		updatePoint:
			(orderPointData: OrderPointData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('order/update/point', orderPointData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default order;
