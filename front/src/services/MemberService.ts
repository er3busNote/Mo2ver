import { ActionCreatorsMapObject } from 'redux';
import { CSRFData, MemberData } from '@/types/api';

export default class MemberService {
	constructor(private member: ActionCreatorsMapObject) {}

	getCSRFToken = async (): Promise<CSRFData> => {
		return await this.member.csrf();
	};

	getMemberInfo = async (): Promise<MemberData> => {
		return await this.member.info();
	};
}
