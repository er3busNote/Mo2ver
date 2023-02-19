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

interface BannerFormValues {
	title: string;
	startDate: Date;
	endDate: Date;
	position: string;
	type: string;
	useyn: string;
	bnnrImg: Array<BannerDetailValues>;
}

export type { CategoryFormValues, BannerFormValues };
