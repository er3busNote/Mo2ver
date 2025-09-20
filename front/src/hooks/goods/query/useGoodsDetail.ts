import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsDetailData } from '@/types/api';
import GoodsService from '@services/GoodsService';

interface GoodsProps {
	code: string;
	goods: ActionCreatorsMapObject;
}

const useGoodsDetail = ({ goods, code }: GoodsProps) => {
	const service = new GoodsService(goods);
	return useQuery<GoodsDetailData>({
		queryKey: ['goodsDetail', code],
		queryFn: () => service.getGoodsDetail(code),
		staleTime: 5 * 60 * 1000,
	});
};

export default useGoodsDetail;
