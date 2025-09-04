import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import {
	MemberData,
	AddressData,
	OrderCouponData,
	OrderPointData,
	OrderGoodsData,
} from '@/types/api';

interface OrderProps {
	title: string;
	description: string;
	steps: string[];
	file: ActionCreatorsMapObject;
	orderId: string;
	memberData: MemberData;
	addressData: AddressData;
	orderData: Array<OrderGoodsData>;
	setAddressReload: Dispatch<SetStateAction<boolean>>;
	onCouponApply: (orderCouponData: OrderCouponData) => void;
	onPointApply: (orderPointData: OrderPointData) => void;
	onSubmit: (
		data: OrderFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

export type { OrderProps };
