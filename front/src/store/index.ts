import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { MemberState, TokenState, TitleState, MenuState } from './types';

// 1.1. 인증 관련 State
const memberinitialState: MemberState = {
	token: '',
	isAuthenticated: false,
	isLoading: false,
	errorMessage: '',
};

// 1.1. authSlice : action + reducer → slice
const authSlice = createSlice({
	name: 'member',
	initialState: memberinitialState,
	reducers: {
		loginSuccess: (state: MemberState, action: PayloadAction<string>) => {
			state.isAuthenticated = true;
			state.isLoading = false;
			state.token = action.payload;
		},
		loginFailure: (state: MemberState, action: PayloadAction<string>) => {
			state.isAuthenticated = false;
			state.isLoading = false;
			state.token = '';
			state.errorMessage = action.payload || 'Something went wrong.';
		},
		logoutSuccess: (state: MemberState) => {
			state.isAuthenticated = false;
			state.isLoading = true;
			state.token = '';
		},
	},
});

// 1.2. Token 관련 State
const tokeninitialState: TokenState = {
	token: new Object(),
};

const tokenSlice = createSlice({
	name: 'token',
	initialState: tokeninitialState,
	reducers: {
		tokenSuccess: (state: TokenState, action: PayloadAction<object>) => {
			state.token = action.payload;
		},
	},
});

// 2.1. Title 관련 State
const titleinitialState: TitleState = {
	title: 'Home',
	description: '',
};

// 2.1. titleSlice : action + reducer → slice
const titleSlice = createSlice({
	name: 'title',
	initialState: titleinitialState,
	reducers: {
		changeTitle: (state: TitleState, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		changeDescription: (state: TitleState, action: PayloadAction<string>) => {
			state.description = action.payload;
		},
	},
});

// 2.2. 메뉴 관련 State
const menuinitialState: MenuState = {
	menus: [
		{
			index: 1,
			name: 'CATEGORY',
			path: '/cagetory',
			title: 'Category',
			description: '카테고리 관리',
			subMenu: [
				{
					index: 3,
					name: 'ITEM',
					path: '/item',
					title: 'Item',
					description: '상품 목록',
					isActive: false,
					isShow: true,
					count: 2,
					color: '#1A73E8',
					bgColor: '#E8F0FE',
				},
			],
			isActive: true,
			isShow: true,
		},
		{
			index: 2,
			name: 'BANNER',
			path: '/banner',
			title: 'Recent File',
			description: '배너 관리',
			subMenu: [
				{
					index: 4,
					name: 'MAIN',
					path: '/main',
					title: 'Main',
					description: '메인 전시',
					isActive: false,
					isShow: true,
					count: 1,
					color: '#3C8039',
					bgColor: '#E6f4EA',
				},
				{
					index: 5,
					name: 'POPULAR',
					path: '/popular',
					title: 'Popular',
					description: '인기순',
					isActive: false,
					isShow: true,
					count: 2294,
					color: '#E3742F',
					bgColor: '#FCEFE3',
				},
				{
					index: 6,
					name: 'RECOMMEND',
					path: '/recommend',
					title: 'Recommend',
					description: '추천',
					isActive: false,
					isShow: true,
					count: 3566,
					color: '#A250F5',
					bgColor: '#F3E8FD',
				},
			],
			isActive: false,
			isShow: true,
		},
	],
};

// 2.2. menuSlice : action + reducer → slice
const menuSlice = createSlice({
	name: 'menu',
	initialState: menuinitialState,
	reducers: {
		menuActive: (state: MenuState, action: PayloadAction<string>) => {
			state.menus.forEach((menu) => {
				if (action.payload === menu.path) {
					menu.isActive = true;
				} else {
					menu.isActive = false;
				}
			});
		},
		menuSwitch: (state: MenuState, action: PayloadAction<boolean>) => {
			state.menus.forEach((menu) => {
				menu.isActive = action.payload;
			});
		},
	},
});

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	token: tokenSlice.reducer,
	title: titleSlice.reducer,
	menu: menuSlice.reducer,
});

const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
const { tokenSuccess } = tokenSlice.actions;
const { changeTitle, changeDescription } = titleSlice.actions;
const { menuActive, menuSwitch } = menuSlice.actions;

export {
	loginSuccess,
	loginFailure,
	logoutSuccess,
	tokenSuccess,
	changeTitle,
	changeDescription,
	menuActive,
	menuSwitch,
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
