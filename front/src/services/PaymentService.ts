import { ActionCreatorsMapObject } from 'redux';
import { PaymentData, CSRFData } from '@/types/api';

export default class PaymentService {
	constructor(private payment: ActionCreatorsMapObject) {}

	getPaymentStart = async (
		orderId: string,
		csrfData?: CSRFData
	): Promise<PaymentData> => {
		return await this.payment.start(orderId, csrfData);
	};
}
