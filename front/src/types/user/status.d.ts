import { ReactNode, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPageData, SearchGoodsResuqestData } from '@/types/api';

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

interface UserProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	goodsData: GoodsPageData;
	setGoodsPage: Dispatch<SetStateAction<number>>;
	setSearchGoodsData: Dispatch<SetStateAction<SearchGoodsResuqestData>>;
}

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

interface UserOrderDetailProps {
	title: string;
	description: string;
}

export type {
	Position,
	DetailType,
	DetailBoxProps,
	DetailStyleProps,
	CartDeliveryProps,
	GoodsRegisterProps,
	UserProps,
	TabPanelProps,
	UserOrderDetailProps,
};
