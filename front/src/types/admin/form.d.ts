import { FileData } from '@/types/api';
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

interface BannerVideoFormValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	position: string;
	type: string;
	code: string;
	useyn: string;
}

interface EventDetailValues {
	goodsCode: string;
	goodsName: string;
	salePrice: number;
	sortSequence: number;
}

interface EventFormValues {
	title: string;
	startDate: Dayjs;
	endDate: Dayjs;
	displayFile: string;
	eventFile: string;
	useyn: string;
	goods: Array<EventDetailValues>;
}

interface NoticeFormValues {
	title: string;
	contents: string;
	noticeFiles: Array<FileData>;
}

export type {
	CategoryFormValues,
	BannerImageFormValues,
	BannerImageDetailValues,
	BannerGoodsFormValues,
	BannerGoodsDetailValues,
	BannerVideoFormValues,
	EventFormValues,
	EventDetailValues,
	NoticeFormValues,
};
