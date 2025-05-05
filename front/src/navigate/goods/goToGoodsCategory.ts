import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';

type GoodsParams = {
	code: string;
	type: string;
	title: string;
	description: string;
	prevTitle: string;
	prevDescription: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
};

const goToGoodsCategory = ({
	code,
	type,
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
	const path = `/goods/${type}/${code}`;
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path);
};

export default goToGoodsCategory;
