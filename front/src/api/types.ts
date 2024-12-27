// 1. Member Type
interface LoginData {
	username: string;
	password: string;
}

interface SignUpData {
	email: string;
	username: string;
	password: string;
}

interface TokenData {
	username: string;
	accesstoken: string;
	refreshtoken: string;
}

interface CSRFData {
	csrfToken: string;
}

// 2. Goods Type
interface ImageData {
	base64Image: string;
	goodsImageAttachFile: number;
	goodsImageExtension: string;
	basicImageYesNo: string;
	sortSequence: number;
	useYesNo: string;
}

interface GoodsData {
	goodsCode: string;
	goodsName: string;
	goodsBrand: string;
	goodsGender: string;
	goodsYear: string;
	supplyPrice: number;
	salePrice: number;
	imageList: Array<ImageData>;
}

interface GoodsRegisterData {
	goodsName: string;
	goodsBrand: string;
	goodsGender: string;
	goodsYear: number;
	goodsImg: Array<FileData>;
	keyword: string;
	largeCategoryCode: string;
	mediumCategoryCode: string;
	smallCategoryCode: string;
	buyLimitYesNo: string;
	salePeriodYesNo: string;
	saleStartDate: string;
	saleEndDate: string;
	supplyPrice: number;
	salePrice: number;
	maxBuyQuantity: number;
	discountPrice: number;
	discountStartDate: string;
	discountEndDate: string;
}

interface GoodsPage {
	page: number;
	size: number;
	categoryCode: string;
	categoryType: string;
}

interface GoodsSearchPage {
	page: number;
	size: number;
	goodsName: string;
	largeCategoryCode: string;
	mediumCategoryCode: string;
	smallCategoryCode: string;
}

// 3. Category Type
interface CategoryData {
	categoryCode: string;
	categoryName: string;
	upperCategoryCode: string;
	sortSequence: number;
	categoryLevel: number;
	sortOrdinal: string;
	useYesNo: string;
}

interface CategoryPageData {
	content: Array<GoodsData>;
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	pageable: {
		offset: number;
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
	};
	size: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	totalElements: number;
	totalPages: number;
}

interface CategoryDataInfo {
	[key: string]: Array<CategoryData>;
}

interface CategoryDataGroup {
	largeCategoryData: Array<CategoryData>;
	middleCategoryData: CategoryDataInfo;
	smallCategoryData: CategoryDataInfo;
}

// 4. Banner Type
interface BannerData {
	bannerManageNo: number;
	subject: string;
	displayStartDate: number;
	displayEndDate: number;
	displayYesNo: string;
	register: string;
	registerDate: number;
}

interface BannerPageData {
	content: Array<BannerData>;
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	pageable: {
		offset: number;
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
	};
	size: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	totalElements: number;
	totalPages: number;
}

interface BannerImageDetailData {
	title: string;
	cnntUrl: string;
	useyn: string;
}

interface BannerImageData {
	title: string;
	startDate: string;
	endDate: string;
	position: string;
	type: string;
	useyn: string;
	bnnrImg: Array<BannerImageDetailData>;
}

interface GoodsDisplayDetailData {
	goodsCode: string;
	goodsName: string;
	salePrice: number;
	sortSequence: number;
}

interface GoodsDisplayData {
	title: string;
	startDate: string;
	endDate: string;
	position: string;
	type: string;
	useyn: string;
	goods: Array<GoodsDisplayDetailData>;
}

// 5. Event Type
interface EventData {
	eventManageNo: number;
	subject: string;
	eventStartDate: number;
	eventEndDate: number;
	eventYesNo: string;
	register: string;
	registerDate: number;
	imageList: Array<ImageData>;
}

interface EventPageData {
	content: Array<EventData>;
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	pageable: {
		offset: number;
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
	};
	size: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	totalElements: number;
	totalPages: number;
}

interface EventDetailData {
	subject: string;
	eventStartDate: number;
	eventEndDate: number;
	goodsImageAttachFile: number;
	goodsImageExtension: string;
	goodsCode: string;
	goodsName: string;
	goodsBrand: string;
	goodsGender: string;
	goodsYear: string;
	supplyPrice: number;
	salePrice: number;
	sortSequence: number;
}

interface EventDetailPageData {
	content: Array<EventDetailData>;
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	pageable: {
		offset: number;
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
	};
	size: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	totalElements: number;
	totalPages: number;
}

interface EventDisplayDetailData {
	goodsCode: string;
	goodsName: string;
	salePrice: number;
	sortSequence: number;
}

interface EventDisplayData {
	title: string;
	startDate: string;
	endDate: string;
	useyn: string;
	goods: Array<EventDisplayDetailData>;
}

// 6. Cart Type
interface CartData {
	goodsCode: string;
	goodsName?: string;
	goodsBrand?: string;
	goodsGender?: string;
	goodsYear?: string;
	supplyPrice?: number;
	salePrice?: number;
	image?: ImageData;
	amount: number;
	totalPrice?: number;
	optionName?: Array<string>;
	optionPrice?: Array<number>;
	optionId?: Array<string>;
	check?: boolean;
}

interface CartPageData {
	cartTotal: number;
	cartList: Array<CartData>;
}

// 0. ETC Type
interface PageData {
	page: number;
	size: number;
}

interface FileData {
	fileAttachCode: string;
	fileName: string;
	fileType: string;
	fileSize: number;
	fileExtension: string;
}

export type {
	LoginData,
	SignUpData,
	TokenData,
	CSRFData,
	ImageData,
	GoodsData,
	GoodsRegisterData,
	GoodsPage,
	GoodsSearchPage,
	CategoryData,
	CategoryPageData,
	CategoryDataInfo,
	CategoryDataGroup,
	BannerData,
	BannerPageData,
	BannerImageData,
	BannerImageDetailData,
	GoodsDisplayData,
	EventData,
	EventPageData,
	EventDetailData,
	EventDetailPageData,
	EventDisplayData,
	CartData,
	CartPageData,
	PageData,
	FileData,
};
