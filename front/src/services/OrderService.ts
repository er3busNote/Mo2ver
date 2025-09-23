import { ActionCreatorsMapObject } from 'redux';
import { OrderInfoData } from '@/types/api';

export default class OrderService {
	constructor(private order: ActionCreatorsMapObject) {}

	getOrderInfo = async (orderId: string): Promise<OrderInfoData> => {
		return await this.order.info(orderId);
	};
}
