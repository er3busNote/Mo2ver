import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext } from '@store/index';
import createTitleData from '@navigate/createTitleData';

type MenuParams = {
	title: string;
	description: string;
	prevTitle: string;
	prevDescription: string;
	dispatch: Dispatch<AnyAction>;
};

const goToMenuNone = ({
	title,
	description,
	prevTitle,
	prevDescription,
	dispatch,
}: MenuParams) => {
	const titleData = createTitleData({
		title,
		description,
		prevTitle,
		prevDescription,
	});
	dispatch(changeNext(titleData));
};

export default goToMenuNone;
