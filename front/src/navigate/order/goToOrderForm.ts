import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { ActionCreatorsMapObject } from 'redux';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';
import { CSRFData, OrderRequestData } from '@/types/api';
import { CreateResponse } from '@/types/handler';

const path = '/order';

type OrderParams = {
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
	order: ActionCreatorsMapObject;
	orderRequestData: OrderRequestData;
	csrfData?: CSRFData;
};

const goToOrderForm = async ({
	title,
	description,
	dispatch,
	navigate,
	order,
	orderRequestData,
	csrfData,
}: OrderParams) => {
	const titleData = createTitleData({
		title: 'Order',
		description: '주문목록',
		prevTitle: title,
		prevDescription: description,
	});
	const response: CreateResponse = await order.create(
		orderRequestData,
		csrfData
	);
	const orderId = response?.createId;
	const state = { orderId };
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path, { state });
};

export default goToOrderForm;
