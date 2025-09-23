import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { OrderInfoData } from '@/types/api';
import OrderService from '@services/OrderService';

interface OrderInfoProps {
	order: ActionCreatorsMapObject;
	orderId: string;
}

const useOrderInfo = ({ order, orderId }: OrderInfoProps) => {
	const service = new OrderService(order);
	return useQuery<OrderInfoData>({
		queryKey: ['orderInfo', orderId],
		queryFn: () => service.getOrderInfo(orderId),
		enabled: !!orderId,
		refetchOnWindowFocus: false,
	});
};

export default useOrderInfo;
