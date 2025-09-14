import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CategoryData, CategoryDataInfo, CategoryDataGroup } from '@/types/api';
import { filter, groupBy } from 'lodash';

interface CategoryListProps {
	category: ActionCreatorsMapObject;
}

const useCategoryGroupList = ({
	category,
}: CategoryListProps): CategoryDataGroup => {
	const [largeCategoryData, setLargeCategoryData] = useState<
		Array<CategoryData>
	>([]);
	const [middleCategoryData, setMiddleCategoryData] =
		useState<CategoryDataInfo>({});
	const [smallCategoryData, setSmallCategoryData] = useState<CategoryDataInfo>(
		{}
	);
	const categoryDataGroup: CategoryDataGroup = {
		largeCategoryData: largeCategoryData,
		middleCategoryData: middleCategoryData,
		smallCategoryData: smallCategoryData,
	};

	const fetchAndSetData = useCallback(async () => {
		const categoryData = await category.list();
		// 대 카테고리
		const largeCategoyData = filter(categoryData, {
			categoryLevel: 1,
			useYesNo: 'Y',
		});
		// 중/소 카테고리
		const middleCategoryData = groupBy(
			filter(categoryData, { categoryLevel: 2 }),
			'upperCategoryCode'
		);
		const smallCategoryData = groupBy(
			filter(categoryData, { categoryLevel: 3 }),
			'upperCategoryCode'
		);
		setLargeCategoryData(largeCategoyData);
		setMiddleCategoryData(middleCategoryData);
		setSmallCategoryData(smallCategoryData);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return categoryDataGroup;
};

export default useCategoryGroupList;
