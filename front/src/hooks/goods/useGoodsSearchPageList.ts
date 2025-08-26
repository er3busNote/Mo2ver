import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsSearchPage, GoodsPageData } from '@/types/api';

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
}: GoodsSearchProps): [GoodsPageData, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<GoodsPageData>(
		new Object() as GoodsPageData
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
