import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPageData } from '@/types/api';
import SearchService from '@services/SearchService';
import { isEmpty } from 'lodash';

interface GoodsSearchProps {
	keyword: string;
	search: ActionCreatorsMapObject;
}

interface GoodsSearchResultProps {
	data?: GoodsPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

const useSearchGoodsList = ({
	keyword,
	search,
}: GoodsSearchProps): GoodsSearchResultProps => {
	const [page, setPage] = useState<number>(0);

	const service = new SearchService(search);
	const { data } = useQuery<GoodsPageData>({
		queryKey: ['searchGoods', keyword, page],
		queryFn: () => service.getSearchGoods(page, keyword),
		enabled: !isEmpty(keyword),
		placeholderData: keepPreviousData,
		staleTime: 0,
	});

	return { data, setPage };
};

export default useSearchGoodsList;
