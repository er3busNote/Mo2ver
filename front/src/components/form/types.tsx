import { FileData } from '../../api/types';

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
}

export type { LoginFormValues, SignupFormValues, RegisterFormValues };
