import { ActionCreatorsMapObject } from 'redux';
import {
	GoodsData,
	GoodsPage,
	GoodsDetailData,
	GoodsPageData,
	GoodsSearchPage,
} from '@/types/api';

export default class GoodsService {
	constructor(private goods: ActionCreatorsMapObject) {}

	getGoodsDetail = async (code: string): Promise<GoodsDetailData> => {
		return this.goods.info(code);
	};

	getGoodsRankList = async (count: number): Promise<GoodsData[]> => {
		return this.goods.rank(count);
	};

	getGoodsPageList = async (
		page: number,
		categoryCode: string,
		categoryType: string
	): Promise<GoodsPageData> => {
		const goodsPage: GoodsPage = { page, size: 12, categoryCode, categoryType };
		return this.goods.list(goodsPage);
	};

	getGoodsSearchPageList = async (
		page: number,
		goodsName: string,
		largeCategoryCode: string,
		mediumCategoryCode: string,
		smallCategoryCode: string
	): Promise<GoodsPageData> => {
		const params: GoodsSearchPage = {
			page,
			size: 12,
			goodsName,
			largeCategoryCode,
			mediumCategoryCode,
			smallCategoryCode,
		};
		return this.goods.search(params);
	};
}
