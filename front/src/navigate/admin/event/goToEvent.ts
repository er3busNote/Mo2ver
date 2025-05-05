import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';

const path = '/admin/event';

type EventParams = {
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
};

const goToEvent = ({ title, description, dispatch, navigate }: EventParams) => {
	const titleData = createTitleData({ title, description });
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path);
};

export default goToEvent;
