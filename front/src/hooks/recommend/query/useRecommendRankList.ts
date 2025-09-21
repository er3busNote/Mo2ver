import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@/types/api';

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
	return useQuery<GoodsData[]>({
		queryKey: ['recommendRankList', count],
		queryFn: () => recommend.rank(count),
		enabled: isAuthenticated,
		staleTime: 5 * 60 * 1000,
	});
};

export default useRecommendRankList;
