import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';
import { CSRFData, PaymentInfoData, PaymentConfirmData } from '../types/api';

const payment = (instance: AxiosInstance) => {
	return {
		// 결제 진행 API : <baseURL>/payment/start
		start:
			(paymentInfoData: PaymentInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('payment/start', paymentInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 결제 완료 API : <baseURL>/payment/confirm
		confirm:
			(paymentConfirmData: PaymentConfirmData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('payment/confirm', paymentConfirmData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default payment;
