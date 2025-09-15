import { ActionCreatorsMapObject } from 'redux';
import { AddressData } from '@/types/api';

export default class AddressService {
	constructor(private address: ActionCreatorsMapObject) {}

	getAddressInfo = async (): Promise<AddressData> => {
		return await this.address.info();
	};

	getAddressList = async (): Promise<Array<AddressData>> => {
		return await this.address.list();
	};
}
