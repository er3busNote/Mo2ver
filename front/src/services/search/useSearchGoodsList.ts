import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPageData, PageData } from '@/types/api';

interface GoodsSearchProps {
	keyword: string;
	search: ActionCreatorsMapObject;
}

const useSearchGoodsList = ({
	keyword,
	search,
}: GoodsSearchProps): [GoodsPageData, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<GoodsPageData>(
		new Object() as GoodsPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const pageData: PageData = {
			page: page,
			size: 12,
		};
		const data = await search.goods(keyword, pageData);
		setData(data);
	}, [page, keyword]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage];
};

export default useSearchGoodsList;
