import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import {
	GoodsPageData,
	SearchGoodsResuqestData,
	PageData,
	CSRFData,
} from '@api/types';

interface GoodsSearchProps {
	search: ActionCreatorsMapObject;
	csrfData: CSRFData;
}

interface GoodsSearchResultProps {
	data: GoodsPageData;
	setPage: Dispatch<SetStateAction<number>>;
	setSearchData: Dispatch<SetStateAction<SearchGoodsResuqestData>>;
}

const useSearchMyGoodsList = ({
	search,
	csrfData,
}: GoodsSearchProps): GoodsSearchResultProps => {
	const [page, setPage] = useState(0);
	const [searchData, setSearchData] = useState<SearchGoodsResuqestData>({
		keyword: '',
	});
	const [data, setData] = useState<GoodsPageData>(
		new Object() as GoodsPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const pageData: PageData = {
			page: page,
			size: 12,
		};
		const data = await search.myGoods(
			{
				pageInfo: pageData,
				searchGoodsRequest: searchData,
			},
			pageData
		);
		setData(data);
	}, [page, searchData, csrfData.csrfToken]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return { data, setPage, setSearchData };
};

export default useSearchMyGoodsList;
