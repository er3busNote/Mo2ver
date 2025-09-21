import { ActionCreatorsMapObject } from 'redux';
import { CartPageData } from '@/types/api';

export default class CartService {
	constructor(private cart: ActionCreatorsMapObject) {}

	getCartPageList = async (): Promise<CartPageData> => {
		return await this.cart.list();
	};
}
