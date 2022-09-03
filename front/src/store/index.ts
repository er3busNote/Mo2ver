import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';

// 1.1. 인증 관련 State
const authinitialState: AuthState = {
	token: '',
	isAuthenticated: false,
	isLoading: false,
	errorMessage: '',
};

// 1.2. authSlice : action + reducer → slice
const authSlice = createSlice({
	name: 'auth',
	initialState: authinitialState,
	reducers: {
		loginSuccess: (state: AuthState, action: PayloadAction<string>) => {
			state.isAuthenticated = true;
			state.isLoading = false;
			state.token = action.payload;
		},
		loginFailure: (state: AuthState, action: PayloadAction<string>) => {
			state.isAuthenticated = false;
			state.isLoading = false;
			state.token = '';
			state.errorMessage = action.payload || 'Something went wrong.';
		},
		logoutSuccess: (state: AuthState) => {
			state.isAuthenticated = false;
			state.isLoading = true;
			state.token = '';
		},
	},
});

const rootReducer = combineReducers({
	auth: authSlice.reducer,
});

const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export { loginSuccess, loginFailure, logoutSuccess };

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
