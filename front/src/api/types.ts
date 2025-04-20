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
	accesstoken: string;
	expiration: string;
}

interface TokenRequestData {
	accesstoken: string;
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
	keywordList: Array<string>;
}

interface GoodsRegisterData {
	goodsName: string;
	goodsBrand: string;
	goodsGender: string;
	goodsYear: number;
	goodsImg: Array<FileData>;
	keyword: string;
	summaryInfo: string;
	largeCategoryCode: string;
	mediumCategoryCode: string;
	smallCategoryCode: string;
	buyLimitYesNo: string;
	buyLimitCondition: string;
	salePeriodYesNo: string;
	saleStartDate: string;
	saleEndDate: string;
	supplyPrice: number;
	salePrice: number;
	maxBuyQuantity: number;
	discountPrice: number;
	discountStartDate: string;
	discountEndDate: string;
	rateYesNo: string;
	maxLimitYesNo: string;
	maxLimitAmount: number;
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

interface GoodsPageData {
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
	displayTemplateCode: string;
	displayConditionCode: string;
	displayYesNo: string;
	register: string;
	registerDate: number;
}

interface BannerRequestData {
	bannerManageNo: number;
	displayTemplateCode: string;
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
	id?: number;
	title: string;
	cnntUrl: string;
	file?: string;
	useyn: string;
}

interface BannerImageData {
	bannerNo?: number;
	title: string;
	startDate: string;
	endDate: string;
	position: string;
	type: string;
	code: string;
	useyn: string;
	bnnrImg: Array<BannerImageDetailData>;
}

interface BannerGoodsDetailData {
	id?: number;
	goodsCode: string;
	goodsName: string;
	salePrice: number;
	sortSequence: number;
}

interface BannerGoodsData {
	bannerNo?: number;
	title: string;
	startDate: string;
	endDate: string;
	position: string;
	type: string;
	code: string;
	useyn: string;
	goods: Array<BannerGoodsDetailData>;
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

interface EventRequestData {
	eventManageNo: number;
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
	eventNo?: number;
	title: string;
	startDate: string;
	endDate: string;
	displayFile: string;
	eventFile: string;
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

// 7. Search Type
interface KeywordSearchPage {
	page: number;
	size: number;
	keyword: string;
}

// 0. ETC Type
interface PageData {
	page: number;
	size: number;
}

interface CodeData {
	commonCode: string;
	commonCodeName: string;
	description: string;
	sortSequence: number;
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
	TokenRequestData,
	CSRFData,
	ImageData,
	GoodsData,
	GoodsRegisterData,
	GoodsPage,
	GoodsSearchPage,
	CategoryData,
	GoodsPageData,
	CategoryDataInfo,
	CategoryDataGroup,
	BannerData,
	BannerRequestData,
	BannerPageData,
	BannerImageData,
	BannerGoodsData,
	EventData,
	EventRequestData,
	EventPageData,
	EventDetailData,
	EventDetailPageData,
	EventDisplayData,
	CartData,
	CartPageData,
	KeywordSearchPage,
	PageData,
	CodeData,
	FileData,
};
