import { ActionCreatorsMapObject } from 'redux';
import { CategoryData, CategoryDataInfo, CategoryDataGroup } from '@/types/api';
import { filter, groupBy } from 'lodash';

export default class CategoryService {
	constructor(private category: ActionCreatorsMapObject) {}

	getCategoryGroupList = async (): Promise<CategoryDataGroup> => {
		const categoryData: CategoryData[] = await this.category.list();

		// 대 카테고리
		const largeCategoryData = filter(categoryData, {
			categoryLevel: 1,
			useYesNo: 'Y',
		});

		// 중/소 카테고리
		const middleCategoryData: CategoryDataInfo = groupBy(
			filter(categoryData, { categoryLevel: 2 }),
			'upperCategoryCode'
		);
		const smallCategoryData: CategoryDataInfo = groupBy(
			filter(categoryData, { categoryLevel: 3 }),
			'upperCategoryCode'
		);

		return {
			largeCategoryData,
			middleCategoryData,
			smallCategoryData,
		} as CategoryDataGroup;
	};

	getCategoryInfo = async (
		categoryLevel: 1 | 2 | 3,
		categoryInfo?: string
	): Promise<CategoryData[]> => {
		return await this.category.info(categoryLevel, categoryInfo);
	};

	getCategoryList = async (): Promise<CategoryData[]> => {
		return await this.category.list();
	};
}
