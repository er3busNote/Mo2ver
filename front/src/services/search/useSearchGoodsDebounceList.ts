import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPageData, PageData } from '@/types/api';
import { isEmpty, debounce } from 'lodash';

interface GoodsSearchProps {
	keyword: string;
	setKeyword: Dispatch<SetStateAction<string>>;
	search: ActionCreatorsMapObject;
}

interface GoodsSearchResultProps {
	data: GoodsPageData;
	setPage: Dispatch<SetStateAction<number>>;
	setKeywordData: (inputText: string) => void;
}

const useSearchGoodsDebounceList = ({
	keyword,
	search,
	setKeyword,
}: GoodsSearchProps): GoodsSearchResultProps => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<GoodsPageData>(
		new Object() as GoodsPageData
	);

	const setKeywordData = useCallback(
		debounce((inputText: string) => {
			setKeyword(inputText);
		}, 1000 * 60),
		[]
	);

	const fetchAndSetData = useCallback(async () => {
		if (!isEmpty(keyword)) {
			const pageData: PageData = {
				page: page,
				size: 12,
			};
			const data = await search.goods(keyword, pageData);
			setData(data);
		} else {
			setData(new Object() as GoodsPageData);
			setPage(0);
		}
	}, [page, keyword]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return { data, setPage, setKeywordData };
};

export default useSearchGoodsDebounceList;
