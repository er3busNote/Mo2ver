import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';
import { isUndefined } from 'lodash';

const path = '/admin/notice/edit';

type NoticeParams = {
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
	noticeNo?: number;
};

const goToNoticeForm = ({
	title,
	description,
	dispatch,
	navigate,
	noticeNo,
}: NoticeParams) => {
	const titleData = createTitleData({ title, description });
	const state = !isUndefined(noticeNo) ? { noticeNo } : undefined;
	dispatch(changeNext(titleData));
	dispatch(menuActive(path));
	navigate(path, { state });
};

export default goToNoticeForm;
