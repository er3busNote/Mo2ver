import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';

type MenuParams = {
	title: string;
	description: string;
	prevTitle: string;
	prevDescription: string;
	path: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
};

const goToMenu = ({
	title,
	description,
	prevTitle,
	prevDescription,
	path,
	dispatch,
	navigate,
}: MenuParams) => {
	const titleData = createTitleData({
		title,
		description,
		prevTitle,
		prevDescription,
	});
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path);
};

export default goToMenu;
