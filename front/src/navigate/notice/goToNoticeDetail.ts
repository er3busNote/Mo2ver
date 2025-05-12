import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';

type NoticeParams = {
	code: number;
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
};

const goToNoticeDetail = ({
	code,
	title,
	description,
	dispatch,
	navigate,
}: NoticeParams) => {
	const titleData = createTitleData({ title, description });
	const path = `/notice/${code}/detail`;
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path);
};

export default goToNoticeDetail;
