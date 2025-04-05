import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import {
	MemberState,
	TokenState,
	TitleInfo,
	TitleState,
	MenuState,
	SubMenuInfo,
	ToastInfo,
	ToastState,
} from './types';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TokenData } from '@api/types';

// 1.1. 인증 관련 State
const memberinitialState: MemberState = {
	token: '',
	isAuthenticated: false,
	isLoading: false,
	errorMessage: '',
	expiration: '',
};

// 1.1. authSlice : action + reducer → slice
const authSlice = createSlice({
	name: 'member',
	initialState: memberinitialState,
	reducers: {
		loginSuccess: (state: MemberState, action: PayloadAction<TokenData>) => {
			state.isAuthenticated = true;
			state.isLoading = false;
			state.token = action.payload.accesstoken;
			state.expiration = action.payload.expiration;
		},
		loginFailure: (state: MemberState, action: PayloadAction<string>) => {
			state.isAuthenticated = false;
			state.isLoading = false;
			state.token = '';
			state.errorMessage = action.payload || 'Something went wrong.';
			state.expiration = '';
		},
		logoutSuccess: (state: MemberState) => {
			state.isAuthenticated = false;
			state.isLoading = true;
			state.token = '';
			state.expiration = '';
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
			state.stackNextTitle.push(state.title);
			state.stackNextDescription.push(state.description);
			state.title = state.stackPrevTitle.pop() ?? '';
			state.description = state.stackPrevDescription.pop() ?? '';
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
			state.stackPrevTitle.push(state.title);
			state.stackPrevDescription.push(state.description);
			state.title = state.stackNextTitle.pop() ?? '';
			state.description = state.stackNextDescription.pop() ?? '';
		},
	},
});

// 2.2. 메뉴 관련 State
const menuinitialState: MenuState = {
	menus: [],
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
		menuLotate: (
			state: MenuState,
			action: PayloadAction<Array<SubMenuInfo>>
		) => {
			state.menus = action.payload;
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
