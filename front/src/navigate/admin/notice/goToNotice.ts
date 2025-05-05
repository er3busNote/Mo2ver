import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';

const path = '/admin/notice';

type NoticeParams = {
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
};

const goToNotice = ({
	title,
	description,
	dispatch,
	navigate,
}: NoticeParams) => {
	const titleData = createTitleData({ title, description });
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path);
};

export default goToNotice;
