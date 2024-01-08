import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import {
	CategoryData,
	CategoryDataInfo,
	CategoryDataGroup,
} from '../services/types';

interface CategoryListProps {
	category: ActionCreatorsMapObject;
}

const useCategoryGroupList = ({
	category,
}: CategoryListProps): CategoryDataGroup => {
	const [data, setData] = useState<Array<CategoryData>>([]);
	const [largeCategoyData, setLargeCategoyData] = useState<Array<CategoryData>>(
		[]
	);
	const [middleCategoyData, setMiddleCategoyData] = useState<CategoryDataInfo>(
		{}
	);
	const [smallCategoyData, setSmallCategoyData] = useState<CategoryDataInfo>(
		{}
	);
	const categoryDataGroup: CategoryDataGroup = {
		largeCategoyData: largeCategoyData,
		middleCategoyData: middleCategoyData,
		smallCategoyData: smallCategoyData,
	};

	const fetchAndSetData = useCallback(async () => {
		const categoryData = await category.list();
		// 대 카테고리
		const largeCategoyData = categoryData.filter(
			(data: CategoryData) => data.categoryLevel === 1 && data.useYesNo === 'Y'
		);
		setLargeCategoyData(largeCategoyData);
		// 중/소 카테고리
		const middleCategoyData = new Object() as CategoryDataInfo;
		const smallCategoyData = new Object() as CategoryDataInfo;
		categoryData.forEach((data: CategoryData) => {
			if (data.categoryLevel === 2) {
				if (!Object.keys(middleCategoyData).includes(data.upperCategoryCode)) {
					middleCategoyData[data.upperCategoryCode] = new Array<CategoryData>();
				}
				middleCategoyData[data.upperCategoryCode].push(data);
			} else if (data.categoryLevel === 3) {
				if (!Object.keys(smallCategoyData).includes(data.upperCategoryCode)) {
					smallCategoyData[data.upperCategoryCode] = new Array<CategoryData>();
				}
				smallCategoyData[data.upperCategoryCode].push(data);
			}
		});
		setMiddleCategoyData(middleCategoyData);
		setSmallCategoyData(smallCategoyData);
		setData(categoryData);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return categoryDataGroup;
};

export default useCategoryGroupList;
