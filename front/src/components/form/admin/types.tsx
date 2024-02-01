import { Dayjs } from 'dayjs';

interface CategoryFormValues {
	category: string;
	useyn: string;
	level: number;
}

interface BannerDetailValues {
	title: string;
	bnnrText: string;
	cnntUrl: string;
	useyn: string;
}

interface BannerFormImageValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	position: string;
	type: string;
	useyn: string;
	bnnrImg: Array<BannerDetailValues>;
}

interface GoodsFormDisplayValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	position: string;
	type: string;
	useyn: string;
}

interface VideoFormDisplayValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	position: string;
	type: string;
	useyn: string;
}

export type {
	CategoryFormValues,
	BannerFormImageValues,
	GoodsFormDisplayValues,
	VideoFormDisplayValues,
};
