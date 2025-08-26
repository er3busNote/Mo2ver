import { FileData } from '@/types/api';
import { Dayjs } from 'dayjs';

interface LoginFormValues {
	username: string;
	password: string;
}

interface SignupFormValues {
	username: string;
	password: string;
	repeat_password: string;
	email: string;
}

interface RegisterFormValues {
	name: string;
	brand: string;
	gender: string;
	year: number;
	keyword: Array<string>;
	summaryInfo: string;
	goodsImg: Array<FileData>;
	largeCategory: string;
	mediumCategory: string;
	smallCategory: string;
	buyLimitYesNo: string;
	salePeriodYesNo: string;
	saleStartDate: Dayjs;
	saleEndDate: Dayjs;
	supplyPrice: number;
	salePrice: number;
	maxBuyQuantity: number;
	discountPrice: number;
	discountStartDate: Dayjs;
	discountEndDate: Dayjs;
}

interface OrderFormValues {
	addressNo: string;
	memo?: string;
	coupon?: number;
	couponNumber?: string;
	point?: number;
	paymentMethod: string;
	card: string;
	cardOwner?: string;
	agreeReceipt: boolean;
	agreeAll: boolean;
	agreePurchase: boolean;
}

export type {
	LoginFormValues,
	SignupFormValues,
	RegisterFormValues,
	OrderFormValues,
};
