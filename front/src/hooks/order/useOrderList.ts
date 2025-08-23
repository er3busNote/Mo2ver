import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { OrderGoodsData } from '@api/types';

interface OrderListProps {
	order: ActionCreatorsMapObject;
	orderId: string;
}

const useOrderList = ({
	order,
	orderId,
}: OrderListProps): [
	Array<OrderGoodsData>,
	Dispatch<SetStateAction<boolean>>
] => {
	const [reload, setReload] = useState(false);
	const [data, setData] = useState<Array<OrderGoodsData>>([]);

	const fetchAndSetData = useCallback(async () => {
		const data = await order.info(orderId);
		setData(data);
		setReload(false);
	}, [reload]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setReload];
};

export default useOrderList;
