import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';
import { isUndefined } from 'lodash';

const path = '/register';

type GoodsParams = {
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
	goodsCode?: string;
};

const goToGoodsForm = ({
	title,
	description,
	dispatch,
	navigate,
	goodsCode,
}: GoodsParams) => {
	const titleData = createTitleData({
		title: 'Register',
		description: '상품등록',
		prevTitle: title,
		prevDescription: description,
	});
	const state = !isUndefined(goodsCode) ? { goodsCode } : undefined;
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path, { state });
};

export default goToGoodsForm;
