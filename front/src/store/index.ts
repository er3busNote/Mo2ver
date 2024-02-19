import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import {
	MemberState,
	TokenState,
	TitleInfo,
	TitleState,
	MenuState,
	ToastInfo,
	ToastState,
} from './types';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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
	prevTitle: '',
	prevDescription: '',
	stackPrevTitle: [],
	stackNextTitle: [],
	stackPrevDescription: [],
	stackNextDescription: [],
};

// 2.1. titleSlice : action + reducer → slice
const titleSlice = createSlice({
	name: 'title',
	initialState: titleinitialState,
	reducers: {
		changePrev: (state: TitleState) => {
			const title = state.stackPrevTitle.pop() ?? '';
			const description = state.stackPrevDescription.pop() ?? '';
			state.title = title;
			state.description = description;
			state.stackNextTitle.push(title);
			state.stackNextDescription.push(description);
		},
		changeNext: (state: TitleState, action: PayloadAction<TitleInfo>) => {
			state.title = action.payload.title;
			state.description = action.payload.description;
			state.prevTitle = action.payload.prevTitle;
			state.prevDescription = action.payload.prevDescription;
			state.stackPrevTitle.push(state.prevTitle);
			state.stackPrevDescription.push(state.prevDescription);
		},
		changePrevNext: (state: TitleState) => {
			state.title = state.stackNextTitle.pop() ?? '';
			state.description = state.stackNextDescription.pop() ?? '';
		},
	},
});

// 2.2. 메뉴 관련 State
const userMenuinitialState: MenuState = {
	menus: [
		{
			index: 1,
			name: 'EVENT',
			path: '/event',
			title: 'event',
			description: '이벤트',
			subMenu: [],
			isActive: true,
			isShow: true,
		},
		{
			index: 2,
			name: 'NOTICE',
			path: '/notice',
			title: 'Notice',
			description: '공지사항',
			subMenu: [],
			isActive: false,
			isShow: true,
		},
	],
};

const adminMenuinitialState: MenuState = {
	menus: [
		{
			index: 1,
			name: 'CATEGORY',
			path: '/cagetory',
			title: 'Category',
			description: '카테고리 관리',
			subMenu: [
				{
					index: 4,
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
			title: 'Banner',
			description: '배너 관리',
			subMenu: [
				{
					index: 5,
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
					index: 6,
					name: 'RECOMMEND',
					path: '/recommend',
					title: 'Recommend',
					description: '추천',
					isActive: false,
					isShow: true,
					count: 2294,
					color: '#E3742F',
					bgColor: '#FCEFE3',
				},
			],
			isActive: false,
			isShow: true,
		},
		{
			index: 3,
			name: 'EVENT',
			path: '/event',
			title: 'Event',
			description: '이벤트 관리',
			subMenu: [
				{
					index: 7,
					name: 'ITEM',
					path: '/item',
					title: 'Item',
					description: '이벤트 목록',
					isActive: false,
					isShow: true,
					count: 2,
					color: '#A250F5',
					bgColor: '#F3E8FD',
				},
			],
			isActive: true,
			isShow: true,
		},
	],
};

// 2.2. menuSlice : action + reducer → slice
const menuSlice = createSlice({
	name: 'menu',
	initialState: userMenuinitialState,
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
		menuLotate: (state: MenuState, action: PayloadAction<string>) => {
			if (action.payload === 'admin') {
				state.menus = adminMenuinitialState.menus;
			} else {
				state.menus = userMenuinitialState.menus;
			}
		},
	},
});

// 3.1. Toast 관련 State
const toastinitialState: ToastState = {
	open: false,
	type: undefined,
	message: '',
};

// 3.2. toastSlice : action + reducer → slice
const toastSlice = createSlice({
	name: 'toast',
	initialState: toastinitialState,
	reducers: {
		toastMessage: (state: ToastState, action: PayloadAction<ToastInfo>) => {
			state.open = true;
			state.type = action.payload.type;
			state.message = action.payload.message;
		},
		toastClose: (state: ToastState) => {
			state.open = false;
		},
	},
});

const persistConfig = {
	key: 'root',
	storage, // 로컬 스토리지에 저장
	blacklist: ['toast'],
};

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	token: tokenSlice.reducer,
	title: titleSlice.reducer,
	menu: menuSlice.reducer,
	toast: toastSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
const { tokenSuccess } = tokenSlice.actions;
const { changePrev, changeNext, changePrevNext } = titleSlice.actions;
const { menuActive, menuSwitch, menuLotate } = menuSlice.actions;
const { toastMessage, toastClose } = toastSlice.actions;

export {
	loginSuccess,
	loginFailure,
	logoutSuccess,
	tokenSuccess,
	changePrev,
	changeNext,
	changePrevNext,
	menuActive,
	menuSwitch,
	menuLotate,
	toastMessage,
	toastClose,
};

export type RootState = ReturnType<typeof persistedReducer>;

export default persistedReducer;
