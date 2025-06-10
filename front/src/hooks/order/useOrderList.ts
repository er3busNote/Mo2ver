import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { OrderGoodsData } from '@api/types';

interface OrderListProps {
	order: ActionCreatorsMapObject;
	orderId: string;
}

const useOrderList = ({
	order,
	orderId,
}: OrderListProps): Array<OrderGoodsData> => {
	const [data, setData] = useState<Array<OrderGoodsData>>([]);

	const fetchAndSetData = useCallback(async () => {
		const data = await order.info(orderId);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useOrderList;
