import { Dispatch, SetStateAction } from 'react';
import { GoodsPageData, SearchGoodsResuqestData } from '@api/types';

type Position = 'relative' | 'absolute' | 'fixed';
type DetailType = 'Delivery' | 'Register';
type CommonProps = {
	title: string;
	description: string;
	type: string;
	setSwitch?: () => void;
};
type CartDeliveryProps = CommonProps;
type GoodsRegisterProps = CommonProps & {
	goodsData: GoodsPageData;
	setGoodsPage: Dispatch<SetStateAction<number>>;
	setSearchGoodsData: Dispatch<SetStateAction<SearchGoodsResuqestData>>;
};
type DetailBoxProps = CartDeliveryProps | GoodsRegisterProps;
type DetailStyleProps = CommonProps | (CommonProps & GoodsRegisterProps);

export type {
	Position,
	DetailType,
	DetailBoxProps,
	DetailStyleProps,
	CartDeliveryProps,
	GoodsRegisterProps,
};
