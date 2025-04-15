import { CodeData } from '@api/types';
import { isEmpty, has } from 'lodash';

const keyMap = {
	commonCode: 'value',
	commonCodeName: 'label',
};

const renameKey = (codeData: CodeData) => {
	return Object.keys(codeData).reduce((data: any, key: string) => {
		const newKey = keyMap[key as keyof typeof keyMap] || key;
		data[newKey] = codeData[key as keyof typeof keyMap];
		return data;
	}, {});
};

const renameKeys = (
	codeDatalist: Record<string, Array<CodeData>> | undefined,
	key: string
) => {
	if (isEmpty(codeDatalist)) return [];
	if (codeDatalist && !has(codeDatalist, key)) return [];
	if (codeDatalist && codeDatalist[key]) {
		return codeDatalist[key].map((item: CodeData) => renameKey(item));
	}
	return [];
};

export { renameKeys };
