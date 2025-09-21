import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@/types/api';
import RecommendService from '@services/RecommendService';

interface RecommendRankListProps {
	count: number;
	isAuthenticated: boolean;
	recommend: ActionCreatorsMapObject;
}

const useRecommendRankList = ({
	count,
	isAuthenticated,
	recommend,
}: RecommendRankListProps) => {
	const service = new RecommendService(recommend);
	return useQuery<GoodsData[]>({
		queryKey: ['recommendRankList', count],
		queryFn: () => service.getRecommendRankList(count),
		enabled: isAuthenticated,
		staleTime: 5 * 60 * 1000,
	});
};

export default useRecommendRankList;
