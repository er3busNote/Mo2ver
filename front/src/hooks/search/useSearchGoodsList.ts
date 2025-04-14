import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { KeywordSearchPage, GoodsPageData } from '@api/types';
import { isNotEmpty } from '@utils/validation';

interface GoodsSearchProps {
	keyword: string;
	setKeyword: Dispatch<SetStateAction<string>>;
	search: ActionCreatorsMapObject;
}

const debounce = <T extends (...args: any[]) => void>(
	callback: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	let timerId: ReturnType<typeof setTimeout> | null = null;
	return (...args) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};

const useSearchGoodsList = ({
	keyword,
	search,
	setKeyword,
}: GoodsSearchProps): [
	GoodsPageData,
	Dispatch<SetStateAction<number>>,
	(inputText: string) => void
] => {
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
		if (isNotEmpty(keyword)) {
			const keywordSearchPage: KeywordSearchPage = {
				page: page,
				size: 12,
				keyword: keyword,
			};
			const data = await search.goods(keywordSearchPage);
			setData(data);
		} else {
			setData(new Object() as GoodsPageData);
			setPage(0);
		}
	}, [page, keyword]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage, setKeywordData];
};

export default useSearchGoodsList;
