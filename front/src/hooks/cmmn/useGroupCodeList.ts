import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CodeData, CSRFData } from '../../api/types';

interface GroupCodeProps {
	code: ActionCreatorsMapObject;
	groupCodelist: Array<string>;
	csrfData: CSRFData;
}

const useGroupCodeList = ({
	code,
	groupCodelist,
	csrfData,
}: GroupCodeProps): Record<string, Array<CodeData>> | undefined => {
	const [data, setData] = useState<Record<string, Array<CodeData>>>();

	const fetchAndSetData = useCallback(async () => {
		const data = await code.list(groupCodelist, csrfData);
		setData(data);
	}, [csrfData.csrfToken]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useGroupCodeList;
