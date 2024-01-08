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

// 2. Category Type
interface ImageData {
	base64Image: string;
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

interface GoodsPage {
	page: number;
	size: number;
	categoryCode: string;
	categoryType: string;
}

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
	largeCategoyData: Array<CategoryData>;
	middleCategoyData: CategoryDataInfo;
	smallCategoyData: CategoryDataInfo;
}

// 3. Banner Type
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

// 0. ETC Type
interface PageData {
	page: number;
	path: string;
	type: string; // enum → (all / video / photo / pdf / doc & current / download)
	identifier: 'file' | 'folder'; // ← enum
}

interface KeywordData {
	page: number;
	keyword: string;
}

export type {
	LoginData,
	SignUpData,
	TokenData,
	CSRFData,
	GoodsData,
	GoodsPage,
	CategoryData,
	CategoryPageData,
	CategoryDataInfo,
	CategoryDataGroup,
	BannerData,
	BannerPageData,
	PageData,
	KeywordData,
};
