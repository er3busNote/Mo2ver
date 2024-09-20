import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CategoryData } from '../../api/types';

interface CategoryInfoProps {
	categoryLevel: 1 | 2 | 3;
	categoryInfo?: string;
	category: ActionCreatorsMapObject;
}

const useCategoryInfo = ({
	categoryLevel,
	categoryInfo,
	category,
}: CategoryInfoProps): Array<CategoryData> => {
	const [data, setData] = useState<Array<CategoryData>>([]);

	const fetchAndSetData = useCallback(async () => {
		const data = await category.info(categoryLevel, categoryInfo);
		setData(data);
	}, [categoryInfo]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useCategoryInfo;
