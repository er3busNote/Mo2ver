import { FileData } from '../../api/types';
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
	price: number;
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

export type { LoginFormValues, SignupFormValues, RegisterFormValues };
