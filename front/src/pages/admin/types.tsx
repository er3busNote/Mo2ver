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

interface BannerFormImageValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	position: string;
	type: string;
	code: string;
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
	code: string;
	useyn: string;
	goods: Array<GoodsDisplayDetailValues>;
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

interface VideoFormDisplayValues {
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
	BannerFormImageValues,
	BannerImageDetailValues,
	GoodsFormDisplayValues,
	GoodsDisplayDetailValues,
	EventFormDisplayValues,
	EventDisplayDetailValues,
	VideoFormDisplayValues,
};
