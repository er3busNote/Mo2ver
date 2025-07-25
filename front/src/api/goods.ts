import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';
import { CSRFData, GoodsPage, GoodsSearchPage, GoodsInfoData } from './types';

const goods = (instance: AxiosInstance) => {
	return {
		// 상품 상세정보 API : <baseURL>/goods/info
		info: (goodsCode: string) => (dispatch: Dispatch) =>
			instance
				.get('goods/info/' + goodsCode)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 상품 리스트 API : <baseURL>/goods/list
		list: (goodsPage: GoodsPage) => (dispatch: Dispatch) =>
			instance
				.get(
					`goods/list?page=${goodsPage.page}&size=${goodsPage.size}&categoryCode=${goodsPage.categoryCode}&categoryType=${goodsPage.categoryType}`
				)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 상품 인기 목록 API : <baseURL>/goods/list/rank/${count}
		rank: (count: number) => (dispatch: Dispatch) =>
			instance
				.get(`goods/list/rank/${count}`)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 상품 검색 API : <baseURL>/goods/search
		search: (goodsSearchPage: GoodsSearchPage) => (dispatch: Dispatch) =>
			instance
				.get(
					`goods/search?page=${goodsSearchPage.page}&size=${goodsSearchPage.size}&goodsName=${goodsSearchPage.goodsName}&largeCategoryCode=${goodsSearchPage.largeCategoryCode}&mediumCategoryCode=${goodsSearchPage.mediumCategoryCode}&smallCategoryCode=${goodsSearchPage.smallCategoryCode}`
				)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
		// 상품 저장 API : <baseURL>/goods/create
		create:
			(goodsInfoData: GoodsInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.post('goods/create', goodsInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
		// 상품 수정 API : <baseURL>/goods/update
		update:
			(goodsInfoData: GoodsInfoData, csrfData: CSRFData) =>
			(dispatch: Dispatch) =>
				instance
					.patch('goods/update', goodsInfoData, {
						headers: {
							'X-XSRF-TOKEN': csrfData?.csrfToken,
						},
					})
					.then((response: AxiosResponse) => handleResponse(response, dispatch))
					.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default goods;
