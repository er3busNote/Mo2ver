import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPage, GoodsPageData } from '@/types/api';

interface GoodsListProps {
	categoryCode: string;
	categoryType: string;
	goods: ActionCreatorsMapObject;
}

const useCategoryPageList = ({
	categoryCode,
	categoryType,
	goods,
}: GoodsListProps): [GoodsPageData, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<GoodsPageData>(
		new Object() as GoodsPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const goodsPage: GoodsPage = {
			page: page,
			size: 12,
			categoryCode: categoryCode,
			categoryType: categoryType,
		};
		const data = await goods.list(goodsPage);
		setData(data);
	}, [page, categoryCode, categoryType]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage];
};

export default useCategoryPageList;
