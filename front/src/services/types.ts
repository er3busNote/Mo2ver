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
interface CategoryData {
	categoryCode: string;
	categoryName: string;
	upperCategoryCode: string;
	sortSequence: number;
	categoryLevel: number;
	sortOrdinal: string;
	useYesNo: string;
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
	CategoryData,
	PageData,
	KeywordData,
};
