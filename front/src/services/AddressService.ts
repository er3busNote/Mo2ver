import { ActionCreatorsMapObject } from 'redux';
import { AddressData, JusoData, PageData } from '@/types/api';

export default class AddressService {
	constructor(private address: ActionCreatorsMapObject) {}

	getAddressInfo = async (): Promise<AddressData> => {
		return await this.address.info();
	};

	getAddressList = async (): Promise<Array<AddressData>> => {
		return await this.address.list();
	};

	getAddressSearch = async (
		page: number,
		keyword: string
	): Promise<Array<JusoData>> => {
		const pageData: PageData = { page, size: 12 };
		return await this.address.search(keyword, pageData);
	};
}
