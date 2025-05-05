import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';

type GoodsParams = {
	code: string;
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
};

const goToGoodsDetail = ({
	code,
	title,
	description,
	dispatch,
	navigate,
}: GoodsParams) => {
	const titleData = createTitleData({ title, description });
	const path = `/goods/${code}/detail`;
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path);
};

export default goToGoodsDetail;
