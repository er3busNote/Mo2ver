import { ActionCreatorsMapObject } from 'redux';
import { CSRFData, CodeData } from '@/types/api';

export default class CodeService {
	constructor(private code: ActionCreatorsMapObject) {}

	getCodeList = async (
		groupCodelist: string[],
		csrfData?: CSRFData
	): Promise<Record<string, CodeData[]>> => {
		return await this.code.list(groupCodelist, csrfData);
	};
}
