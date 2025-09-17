import { ActionCreatorsMapObject } from 'redux';
import { CSRFData, MemberData } from '@/types/api';

export default class CommonService {
	constructor(private code: ActionCreatorsMapObject) {}

	getCSRFToken = async (): Promise<CSRFData> => {
		return await this.code.csrf();
	};

	getMemberInfo = async (): Promise<MemberData> => {
		return await this.code.info();
	};
}
