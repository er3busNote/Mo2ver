import { ActionCreatorsMapObject } from 'redux';
import {
	GoodsPageData,
	SearchRequestData,
	SearchGoodsResuqestData,
	PageData,
	CSRFData,
} from '@/types/api';

export default class SearchService {
	constructor(private search: ActionCreatorsMapObject) {}

	getSearchMyGoodsList = async (
		page: number,
		searchData: SearchGoodsResuqestData,
		csrfData?: CSRFData
	): Promise<GoodsPageData> => {
		const pageData: PageData = { page: page, size: 12 };
		const searchRequestData: SearchRequestData = {
			pageInfo: pageData,
			searchGoodsRequest: searchData,
		};
		return await this.search.myGoods(searchRequestData, csrfData);
	};

	getSearchGoods = async (
		page: number,
		keyword: string
	): Promise<GoodsPageData> => {
		const pageData: PageData = { page: page, size: 12 };
		return await this.search.goods(keyword, pageData);
	};
}
