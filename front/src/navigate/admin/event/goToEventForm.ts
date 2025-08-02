import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';
import { isUndefined } from 'lodash';

const path = '/admin/event/edit';

type EventParams = {
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
	eventNo?: number;
};

const goToEventForm = ({
	title,
	description,
	dispatch,
	navigate,
	eventNo,
}: EventParams) => {
	const titleData = createTitleData({ title, description });
	const state = !isUndefined(eventNo) ? { eventNo } : undefined;
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));

	navigate(path, { state });
};

export default goToEventForm;
