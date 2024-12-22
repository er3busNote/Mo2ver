import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess } from '../store/index';
import { GoodsPage, GoodsSearchPage } from './types';

const goods = (instance: AxiosInstance) => {
	return {
		// 상품 상세정보 API : <baseURL>/goods/info
		info: (goodsCode: string) => (dispatch: Dispatch) =>
			instance
				.get('goods/info/' + goodsCode)
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					return error.response;
				}),
		// 상품 리스트 API : <baseURL>/goods/list
		list: (goodsPage: GoodsPage) => (dispatch: Dispatch) =>
			instance
				.get(
					`goods/list?page=${goodsPage.page}&size=${goodsPage.size}&categoryCode=${goodsPage.categoryCode}&categoryType=${goodsPage.categoryType}`
				)
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					return error.response;
				}),
		// 상품 검색 API : <baseURL>/goods/search
		search: (goodsSearchPage: GoodsSearchPage) => (dispatch: Dispatch) =>
			instance
				.get(
					`goods/search?page=${goodsSearchPage.page}&size=${goodsSearchPage.size}&goodsName=${goodsSearchPage.goodsName}&largeCategoryCode=${goodsSearchPage.largeCategoryCode}&mediumCategoryCode=${goodsSearchPage.mediumCategoryCode}&smallCategoryCode=${goodsSearchPage.smallCategoryCode}`
				)
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					return error.response;
				}),
	};
};

export default goods;