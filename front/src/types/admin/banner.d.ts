import { Dispatch, SetStateAction, BaseSyntheticEvent } from 'react';
import { CodeData, BannerPageData } from '@/types/api';
import {
	BannerImageFormValues,
	BannerGoodsFormValues,
	BannerVideoFormValues,
} from '@/types/admin/form';

interface BannerProps {
	title: string;
	description: string;
	setPage: Dispatch<SetStateAction<number>>;
	bannerPageData?: BannerPageData;
}

interface BannerImageProp {
	title: string;
	description: string;
	groupCodeData?: Record<string, Array<CodeData>>;
	type: 'Create' | 'Update';
	onSubmit: (
		data: BannerImageFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

interface BannerVideoProp {
	title: string;
	description: string;
	groupCodeData?: Record<string, Array<CodeData>>;
	onSubmit: (
		data: BannerVideoFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

interface BannerGoodsProp {
	title: string;
	description: string;
	groupCodeData?: Record<string, Array<CodeData>>;
	type: 'Create' | 'Update';
	onSubmit: (
		data: BannerGoodsFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

export type { BannerProps, BannerImageProp, BannerGoodsProp, BannerVideoProp };
