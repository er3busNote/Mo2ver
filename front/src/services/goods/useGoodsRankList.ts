import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@/types/api';

interface GoodsRankListProps {
	count: number;
	goods: ActionCreatorsMapObject;
}

const useGoodsRankList = ({
	count,
	goods,
}: GoodsRankListProps): Array<GoodsData> => {
	const [data, setData] = useState<Array<GoodsData>>([]);

	const fetchAndSetData = useCallback(async () => {
		const data = await goods.rank(count);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useGoodsRankList;
