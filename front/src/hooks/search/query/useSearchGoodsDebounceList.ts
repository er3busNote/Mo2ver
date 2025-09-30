import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPageData } from '@/types/api';
import SearchService from '@services/SearchService';
import { debounce, isEmpty } from 'lodash';

interface GoodsSearchProps {
	keyword: string;
	setKeyword: Dispatch<SetStateAction<string>>;
	search: ActionCreatorsMapObject;
}

interface GoodsSearchResultProps {
	data: GoodsPageData | undefined;
	setPage: Dispatch<SetStateAction<number>>;
	setKeywordData: (inputText: string) => void;
}

const useSearchGoodsDebounceList = ({
	keyword,
	search,
	setKeyword,
}: GoodsSearchProps): GoodsSearchResultProps => {
	const [page, setPage] = useState<number>(0);

	const setKeywordData = useCallback(
		debounce((inputText: string) => {
			setKeyword(inputText);
		}, 1000),
		[setKeyword]
	);

	const service = new SearchService(search);
	const { data } = useQuery<GoodsPageData>({
		queryKey: ['searchGoods', keyword, page],
		queryFn: () => service.getSearchGoods(page, keyword),
		enabled: !isEmpty(keyword),
		placeholderData: keepPreviousData,
		staleTime: 0,
	});

	return { data, setPage, setKeywordData };
};

export default useSearchGoodsDebounceList;
