import { Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import {
	GoodsData,
	GoodsPageData,
	GoodsDetailData,
	CartData,
	ReviewPageData,
	ReviewInfoData,
} from '@/types/api';

interface GoodsProp {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
}

interface GoodsProps extends GoodsProp {
	goodsData?: GoodsPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface GoodsGridProps extends GoodsProp {
	goodsData?: Array<GoodsData>;
}

interface GoodsDetailProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	goodsData?: GoodsDetailData;
	reviewData?: ReviewPageData;
	setPage: Dispatch<SetStateAction<number>>;
	onReviewAdd: (reviewInfo: ReviewInfoData) => void;
	onReviewMod: (reviewInfo: ReviewInfoData) => void;
	onCartAdd: (cartData: CartData) => void;
	onOrder: (code: string) => void;
}

export type { GoodsProps, GoodsGridProps, GoodsDetailProps };
