import { BaseSyntheticEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import {
	MemberData,
	AddressData,
	OrderCouponData,
	OrderPointData,
	OrderInfoData,
} from '@/types/api';

interface OrderProps {
	title: string;
	description: string;
	steps: string[];
	file: ActionCreatorsMapObject;
	address: ActionCreatorsMapObject;
	orderId: string;
	memberData?: MemberData;
	addressData?: AddressData;
	orderData?: OrderInfoData;
	onAddressRefetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<AddressData, Error>>;
	onCouponApply: (orderCouponData: OrderCouponData) => void;
	onPointApply: (orderPointData: OrderPointData) => void;
	onSubmit: (
		data: OrderFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

export type { OrderProps };
