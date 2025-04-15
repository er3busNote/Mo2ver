import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CategoryData, CategoryDataInfo, CategoryDataGroup } from '@api/types';
import { has, filter } from 'lodash';

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
		setLargeCategoryData(largeCategoyData);
		// 중/소 카테고리
		const middleCategoryData = new Object() as CategoryDataInfo;
		const smallCategoryData = new Object() as CategoryDataInfo;
		categoryData.forEach((data: CategoryData) => {
			if (data.categoryLevel === 2) {
				if (!has(middleCategoryData, data.upperCategoryCode)) {
					middleCategoryData[data.upperCategoryCode] =
						new Array<CategoryData>();
				}
				middleCategoryData[data.upperCategoryCode].push(data);
			} else if (data.categoryLevel === 3) {
				if (!has(smallCategoryData, data.upperCategoryCode)) {
					smallCategoryData[data.upperCategoryCode] = new Array<CategoryData>();
				}
				smallCategoryData[data.upperCategoryCode].push(data);
			}
		});
		setMiddleCategoryData(middleCategoryData);
		setSmallCategoryData(smallCategoryData);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return categoryDataGroup;
};

export default useCategoryGroupList;
