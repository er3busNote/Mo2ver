import { Dayjs } from 'dayjs';

interface CategoryFormValues {
	category: string;
	useyn: string;
	level: number;
}

interface BannerImageDetailValues {
	title: string;
	bnnrImg?: File;
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
	bnnrImg: Array<BannerImageDetailValues>;
}

interface GoodsDisplayDetailValues {
	goodsCode: string;
	goodsName: string;
	salePrice: number;
	sortSequence: number;
}

interface GoodsFormDisplayValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	position: string;
	type: string;
	useyn: string;
	goods: Array<GoodsDisplayDetailValues>;
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
	BannerImageDetailValues,
	GoodsFormDisplayValues,
	GoodsDisplayDetailValues,
	VideoFormDisplayValues,
};
