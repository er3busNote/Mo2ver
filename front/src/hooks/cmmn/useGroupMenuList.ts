import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { SubMenuInfo } from '@store/types';

interface GroupMenuProps {
	menu: ActionCreatorsMapObject;
	menuType: number;
}

const useGroupMenuList = ({
	menu,
	menuType,
}: GroupMenuProps): Array<SubMenuInfo> => {
	const [data, setData] = useState<Array<SubMenuInfo>>([]);

	const fetchAndSetData = useCallback(async () => {
		const data = await menu.list(menuType);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useGroupMenuList;
