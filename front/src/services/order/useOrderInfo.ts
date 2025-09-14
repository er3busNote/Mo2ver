import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { OrderInfoData } from '@/types/api';

interface OrderInfoProps {
	order: ActionCreatorsMapObject;
	orderId: string;
}

const useOrderInfo = ({
	order,
	orderId,
}: OrderInfoProps): [OrderInfoData, Dispatch<SetStateAction<boolean>>] => {
	const [reload, setReload] = useState(false);
	const [data, setData] = useState<OrderInfoData>(
		new Object() as OrderInfoData
	);

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

export default useOrderInfo;
