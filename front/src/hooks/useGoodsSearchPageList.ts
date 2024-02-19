import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsSearchPage, CategoryPageData } from '../services/types';

interface GoodsSearchProps {
	goodsName: string;
	largeCategoryCode: string;
	mediumCategoryCode: string;
	smallCategoryCode: string;
	goods: ActionCreatorsMapObject;
}

const useGoodsSearchPageList = ({
	goodsName,
	largeCategoryCode,
	mediumCategoryCode,
	smallCategoryCode,
	goods,
}: GoodsSearchProps): [CategoryPageData, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<CategoryPageData>(
		new Object() as CategoryPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const goodsSearchPage: GoodsSearchPage = {
			page: page,
			size: 12,
			goodsName: goodsName,
			largeCategoryCode: largeCategoryCode,
			mediumCategoryCode: mediumCategoryCode,
			smallCategoryCode: smallCategoryCode,
		};
		const data = await goods.search(goodsSearchPage);
		setData(data);
	}, [
		page,
		goodsName,
		largeCategoryCode,
		mediumCategoryCode,
		smallCategoryCode,
	]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage];
};

export default useGoodsSearchPageList;
