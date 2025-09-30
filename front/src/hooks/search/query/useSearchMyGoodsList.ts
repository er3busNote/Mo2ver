import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPageData, SearchGoodsResuqestData, CSRFData } from '@/types/api';
import SearchService from '@services/SearchService';
import { isEmpty, get } from 'lodash';

interface GoodsSearchProps {
	search: ActionCreatorsMapObject;
	csrfData?: CSRFData;
}

interface GoodsSearchResultProps {
	data?: GoodsPageData;
	setPage: Dispatch<SetStateAction<number>>;
	setSearchData: Dispatch<SetStateAction<SearchGoodsResuqestData>>;
}

const useSearchMyGoodsList = ({
	search,
	csrfData,
}: GoodsSearchProps): GoodsSearchResultProps => {
	const [page, setPage] = useState<number>(0);
	const [searchData, setSearchData] = useState<SearchGoodsResuqestData>({
		keyword: '',
	});

	const service = new SearchService(search);
	const { data } = useQuery<GoodsPageData>({
		queryKey: ['myGoods', page, searchData, csrfData?.csrfToken],
		queryFn: () => service.getSearchMyGoodsList(page, searchData, csrfData),
		enabled: !isEmpty(get(searchData, 'keyword', '')),
		placeholderData: keepPreviousData,
		staleTime: 0,
	});

	return { data, setPage, setSearchData };
};

export default useSearchMyGoodsList;
