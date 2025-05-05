import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';

type GoodsParams = {
	keyword: string;
	title: string;
	description: string;
	prevTitle: string;
	prevDescription: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
};

const goToGoodsSearch = ({
	keyword,
	title,
	description,
	prevTitle,
	prevDescription,
	dispatch,
	navigate,
}: GoodsParams) => {
	const titleData = createTitleData({
		title,
		description,
		prevTitle,
		prevDescription,
	});
	const path = `/goods/search/${keyword}`;
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path);
};

export default goToGoodsSearch;
