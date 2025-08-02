import type { NavigateFunction } from 'react-router-dom';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { changeNext, menuActive } from '@store/index';
import createTitleData from '@navigate/createTitleData';
import { isUndefined, negate, every } from 'lodash';

const codeMap: Record<string, string> = {
	BN: '/admin/banner/image/edit',
	GD: '/admin/banner/goods/edit',
	VD: '/admin/banner/video/edit',
};

type BannerParams = {
	type: string;
	title: string;
	description: string;
	dispatch: Dispatch<AnyAction>;
	navigate: NavigateFunction;
	bannerNo?: number;
	displayTemplateCode?: string;
};

const goToBannerForm = ({
	type,
	title,
	description,
	dispatch,
	navigate,
	bannerNo,
	displayTemplateCode,
}: BannerParams) => {
	const titleData = createTitleData({ title, description });

	const path = codeMap[type];

	if (path) {
		dispatch(changeNext(titleData));
		dispatch(menuActive(path));

		const state = every([bannerNo, displayTemplateCode], negate(isUndefined))
			? { bannerNo, displayTemplateCode }
			: undefined;

		navigate(path, { state });
	}
};

export default goToBannerForm;
