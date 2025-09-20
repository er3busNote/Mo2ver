import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@/types/api';
import GoodsService from '@services/GoodsService';

interface GoodsRankListProps {
	count: number;
	goods: ActionCreatorsMapObject;
}

const useGoodsRankList = ({ count, goods }: GoodsRankListProps) => {
	const service = new GoodsService(goods);
	return useQuery<GoodsData[]>({
		queryKey: ['goodsRankList', count],
		queryFn: async () => service.getGoodsRankList(count),
		staleTime: 60 * 1000,
	});
};

export default useGoodsRankList;
