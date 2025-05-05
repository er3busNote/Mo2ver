import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';

type EventParams = {
	code: string;
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
};

const goToEventDetail = ({
	code,
	title,
	description,
	dispatch,
	navigate,
}: EventParams) => {
	const titleData = createTitleData({ title, description });
	const path = `/event/${code}/detail`;
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path);
};

export default goToEventDetail;
