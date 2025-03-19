import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPage, CategoryPageData } from '@api/types';

interface GoodsListProps {
	categoryCode: string;
	categoryType: string;
	goods: ActionCreatorsMapObject;
}

const useCategoryPageList = ({
	categoryCode,
	categoryType,
	goods,
}: GoodsListProps): [CategoryPageData, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<CategoryPageData>(
		new Object() as CategoryPageData
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
