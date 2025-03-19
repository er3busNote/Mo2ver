import { Dayjs } from 'dayjs';

interface CategoryFormValues {
	category: string;
	useyn: string;
	level: number;
}

interface BannerImageDetailValues {
	title: string;
	cnntUrl: string;
	file: string;
	useyn: string;
}

interface BannerImageFormValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	position: string;
	type: string;
	code: string;
	useyn: string;
	bnnrImg: Array<BannerImageDetailValues>;
}

interface BannerGoodsDetailValues {
	goodsCode: string;
	goodsName: string;
	salePrice: number;
	sortSequence: number;
}

interface BannerGoodsFormValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	position: string;
	type: string;
	code: string;
	useyn: string;
	goods: Array<BannerGoodsDetailValues>;
}

interface EventDisplayDetailValues {
	goodsCode: string;
	goodsName: string;
	salePrice: number;
	sortSequence: number;
}

interface EventFormDisplayValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	displayFile: string;
	eventFile: string;
	useyn: string;
	goods: Array<EventDisplayDetailValues>;
}

interface BannerVideoFormValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	position: string;
	type: string;
	code: string;
	useyn: string;
}

export type {
	CategoryFormValues,
	BannerImageFormValues,
	BannerImageDetailValues,
	BannerGoodsFormValues,
	BannerGoodsDetailValues,
	BannerVideoFormValues,
	EventFormDisplayValues,
	EventDisplayDetailValues,
};
