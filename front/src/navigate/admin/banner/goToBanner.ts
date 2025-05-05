import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';

const path = '/admin/banner';

type BannerParams = {
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
};

const goToBanner = ({
	title,
	description,
	dispatch,
	navigate,
}: BannerParams) => {
	const titleData = createTitleData({ title, description });
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path);
};

export default goToBanner;
