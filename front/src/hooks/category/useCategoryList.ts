import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CategoryData } from '@api/types';

interface CategoryListProps {
	category: ActionCreatorsMapObject;
}

const useCategoryList = ({
	category,
}: CategoryListProps): Array<CategoryData> => {
	const [data, setData] = useState<Array<CategoryData>>([]);

	const fetchAndSetData = useCallback(async () => {
		const data = await category.list();
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useCategoryList;
