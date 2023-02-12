// 1. 인증 관련 State
interface AuthState {
	token: string;
	isAuthenticated: boolean;
	isLoading: boolean;
	errorMessage: string;
}

interface TokenState {
	token: object;
}

// 2. 메뉴 관련 State
interface TitleState {
	title: string;
	description: string;
}

interface MenuInfo extends TitleState {
	index: number;
	name: string;
	path: string;
	isActive: boolean;
	isShow: boolean;
	count?: number;
	color?: string;
	bgColor?: string;
}

interface SubMenuInfo extends MenuInfo {
	subMenu?: Array<MenuInfo>;
}

interface MenuState {
	menus: Array<SubMenuInfo>;
}

export type {
	AuthState,
	TokenState,
	TitleState,
	MenuInfo,
	SubMenuInfo,
	MenuState,
};
