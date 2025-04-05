// 1. 인증 관련 State
interface MemberState {
	token: string;
	isAuthenticated: boolean;
	isLoading: boolean;
	errorMessage: string;
	expiration: string;
}

interface TokenState {
	token: object;
}

// 2. 메뉴 관련 State
interface TitleInfo {
	title: string;
	description: string;
	prevTitle: string;
	prevDescription: string;
}

interface TitleState extends TitleInfo {
	stackPrevTitle: string[];
	stackNextTitle: string[];
	stackPrevDescription: string[];
	stackNextDescription: string[];
}

interface MenuInfo {
	code: string;
	name: string;
	path: string;
	description: string;
	isActive: boolean;
}

interface SubMenuInfo extends MenuInfo {
	subMenu?: Array<MenuInfo>;
}

interface MenuState {
	menus: Array<SubMenuInfo>;
}

interface ToastInfo {
	type: 'success' | 'info' | 'warning' | 'error' | undefined;
	message: string;
}

interface ToastState extends ToastInfo {
	open: boolean;
}

export type {
	MemberState,
	TokenState,
	TitleInfo,
	TitleState,
	MenuInfo,
	SubMenuInfo,
	MenuState,
	ToastInfo,
	ToastState,
};
