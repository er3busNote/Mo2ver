import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { ActionCreatorsMapObject } from 'redux';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';
import { CSRFData, OrderInfoData } from '@/types/api';

const path = '/order';

type OrderParams = {
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
	order: ActionCreatorsMapObject;
	orderInfoData: OrderInfoData;
	csrfData: CSRFData;
};

const goToOrderForm = async ({
	title,
	description,
	dispatch,
	navigate,
	order,
	orderInfoData,
	csrfData,
}: OrderParams) => {
	const titleData = createTitleData({
		title: 'Order',
		description: '주문목록',
		prevTitle: title,
		prevDescription: description,
	});
	const { headers } = await order.create(orderInfoData, csrfData);
	const orderId = headers.location.replace('/create/', '');
	const state = { orderId };
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path, { state });
};

export default goToOrderForm;
