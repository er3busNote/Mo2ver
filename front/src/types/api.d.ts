// 1. Member Type
interface MemberData {
	loginId: string;
	memberName: string;
	passwordChangeDate: string;
	tempPasswordIssueDate: string;
	loginFailCount: number;
	loginFailDate: string;
	memberConditionCode: string;
	memberGradeCode: string;
	cellPhoneNumber: string;
	email: string;
	emailReceptionYesNo: string;
	snsReceptionYesNo: string;
	joinDate: string;
	lastOrderDate: string;
	lastloginDate: string;
	sleepYesNo: string;
	sleepDate: string;
	withdrawalYesNo: string;
	withdrawalDate: string;
	withdrawalReasonCode: string;
	withdrawalReason: string;
}

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

interface GoodsDetailData extends GoodsData {
	goodsimageList: Array<FileData>;
	summaryInfo: string;
	largeCategoryCode: string;
	mediumCategoryCode: string;
	smallCategoryCode: string;
	buyLimitYesNo: string;
	salePeriodYesNo: string;
	saleStartDate: string;
	saleEndDate: string;
	maxBuyQuantity: number;
	discountPrice: number;
	discountStartDate: string;
	discountEndDate: string;
	averageRating: number;
	reviewCount: number;
}

interface GoodsInfoData {
	goodsCode?: string;
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

interface GoodsPage extends PageData {
	categoryCode: string;
	categoryType: string;
}

interface GoodsSearchPage extends PageData {
	goodsName: string;
	largeCategoryCode: string;
	mediumCategoryCode: string;
	smallCategoryCode: string;
}

interface GoodsPageData extends PageableData {
	content: Array<GoodsData>;
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

// 4. Review Type
interface ReviewData {
	goodsReviewNo: number;
	goodsCode: string;
	imageAttachFile: string;
	reviewContents: string;
	rating: number;
	memberName: string;
	reviewResponseList: Array<ReviewData>;
}

interface ReviewInfoData {
	reviewNo?: number;
	goodsCode: string;
	upperReviewNo?: number | undefined;
	reviewImg?: string;
	reviewContents: string;
	rating: number;
}

interface ReviewPageData extends PageableData {
	content: Array<ReviewData>;
}

// 5. Banner Type
interface BannerData {
	bannerNo: number;
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
	bannerNo: number;
	displayTemplateCode: string;
}

interface BannerPageData extends PageableData {
	content: Array<BannerData>;
}

interface BannerImageDetailData {
	id?: number;
	title: string;
	cnntUrl: string;
	file?: string;
	useyn: string;
}

interface BannerImageInfoData {
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

interface BannerGoodsInfoData {
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

// 6. Event Type
interface EventData {
	eventNo: number;
	subject: string;
	eventStartDate: number;
	eventEndDate: number;
	eventYesNo: string;
	register: string;
	registerDate: number;
	imageList: Array<ImageData>;
}

interface EventRequestData {
	eventNo: number;
}

interface EventPageData extends PageableData {
	content: Array<EventData>;
}

interface EventProductData {
	subject: string;
	eventStartDate: number;
	eventEndDate: number;
	goodsImageAttachFile: string;
	goodsImageExtension: string;
	goodsCode: string;
	goodsName: string;
	goodsBrand: string;
	goodsGender: string;
	goodsYear: string;
	supplyPrice: number;
	salePrice: number;
	sortSequence: number;
	keywordList: Array<string>;
}

interface EventProductPageData extends PageableData {
	content: Array<EventProductData>;
}

interface EventDetailProductData {
	goodsCode: string;
	goodsName: string;
	salePrice: number;
	sortSequence: number;
}

interface EventInfoData {
	eventNo?: number;
	title: string;
	startDate: string;
	endDate: string;
	displayFile: string;
	eventFile: string;
	useyn: string;
	goods: Array<EventDetailProductData>;
}

// 7. Notice Type
interface NoticeData {
	noticeNo: number;
	subject: string;
	contents: string;
	noticeYesNo: string;
	memberName: string;
	registerDate: string;
	noticeFileList: Array<FileData>;
}

interface NoticeRequestData {
	noticeNo: number;
}

interface NoticePageData extends PageableData {
	content: Array<NoticeData>;
}

interface NoticeInfoData {
	noticeNo?: number;
	title: string;
	contents: string;
	noticeFiles: Array<FileData>;
}

// 8. Cart Type
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

// 9. Search Type
interface SearchGoodsResuqestData {
	keyword: string;
	minPrice?: number;
	maxPrice?: number;
}

interface SearchRequestData {
	pageInfo: PageData;
	searchGoodsRequest: SearchGoodsResuqestData;
}

// 10. Order Type
interface OrderData {
	orderId: string;
}

interface OrderInfoData {
	totalAmount: number;
	goods: Array<OrderGoodsData>;
}

interface OrderGoodsData extends GoodsData {
	buyQuantity: number;
	amount: number;
}

interface OrderGoodsInfoData {
	goodsCode: string;
	quantity: number;
}

interface OrderInfoData {
	goodsOrders: Array<OrderGoodsInfoData>;
}

interface OrderCouponData {
	orderId: string;
	couponCodes: Array<string>;
	totalAmount: number;
	couponAmount?: number;
}

interface OrderPointData {
	orderId: string;
	pointAmount: number;
}

// 11. Payment Type
interface PaymentData {
	clientKey: string;
	orderId: string;
	amount: number;
}

interface PaymentInfoData {
	orderId: string;
}

interface PaymentConfirmData {
	paymentCode: string;
	paymentKey: string;
	orderId: string;
	amount: number;
}

// 12. Address Type
interface AddressData {
	addressNo: string;
	memberName: string;
	cellPhoneNumber: string;
	zipcode: string;
	roadNameBasicAddress: string;
	roadNameDetailAddress: string;
}

interface AddressInfoData {
	addressNo?: number;
	memberName: string;
	cellPhoneNumber: string;
	zipcode: string;
	roadNameBasicAddress: string;
	roadNameDetailAddress: string;
}

// 0. ETC Type
interface PageData {
	page: number;
	size: number;
}

interface PageableData {
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
	MemberData,
	LoginData,
	SignUpData,
	TokenData,
	TokenRequestData,
	CSRFData,
	ImageData,
	GoodsData,
	GoodsDetailData,
	GoodsInfoData,
	GoodsPage,
	GoodsSearchPage,
	CategoryData,
	GoodsPageData,
	CategoryDataInfo,
	CategoryDataGroup,
	ReviewData,
	ReviewInfoData,
	ReviewPageData,
	BannerData,
	BannerRequestData,
	BannerPageData,
	BannerImageInfoData,
	BannerGoodsInfoData,
	EventData,
	EventRequestData,
	EventPageData,
	EventProductData,
	EventProductPageData,
	EventInfoData,
	NoticeData,
	NoticeRequestData,
	NoticePageData,
	NoticeInfoData,
	CartData,
	CartPageData,
	SearchGoodsResuqestData,
	SearchRequestData,
	OrderData,
	OrderInfoData,
	OrderGoodsData,
	OrderGoodsInfoData,
	OrderInfoData,
	OrderCouponData,
	OrderPointData,
	PaymentData,
	PaymentInfoData,
	PaymentConfirmData,
	AddressData,
	AddressInfoData,
	PageData,
	CodeData,
	FileData,
};
