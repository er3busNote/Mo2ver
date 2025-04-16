import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@api/types';

interface RecommendRankListProps {
	count: number;
	isAuthenticated: boolean;
	recommend: ActionCreatorsMapObject;
}

const useRecommendRankList = ({
	count,
	isAuthenticated,
	recommend,
}: RecommendRankListProps): Array<GoodsData> => {
	const [data, setData] = useState<Array<GoodsData>>([]);

	const fetchAndSetData = useCallback(async () => {
		if (isAuthenticated) {
			const data = await recommend.rank(count);
			setData(data);
		}
	}, [isAuthenticated]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useRecommendRankList;
