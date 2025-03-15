import React, { FC } from 'react';
import logger from 'redux-logger';
import { configureStore, Middleware, AnyAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { SnackbarProvider } from 'notistack';
import persistedReducer, { RootState } from './store';
import { MemberState } from './store/types';
import { setAccessToken, setRefreshTokenExpiration } from './utils/jwttoken';
import RootRoutes from './routes/index';
import './App.css';

const authMiddleware: Middleware = (store) => (next) => (action: AnyAction) => {
	const result = next(action);
	const state: RootState = store.getState();

	if (
		[
			'member/loginSuccess',
			'member/loginFailure',
			'member/logoutSuccess',
		].includes(action.type)
	) {
		setAccessToken((state.auth as MemberState).token);
		setRefreshTokenExpiration((state.auth as MemberState).expiration);
	}

	return result;
};

const isProduction = process.env.NODE_ENV === 'production';
const middlewares = [authMiddleware];

if (!isProduction) {
	middlewares.push(logger);
}

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Redux Persist와 충돌 방지
		}).concat(middlewares),
});

const App: FC = (): JSX.Element => {
	return (
		<div className="App">
			<Provider store={store}>
				<SnackbarProvider
					maxSnack={5}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				>
					<CookiesProvider>
						<RootRoutes />
					</CookiesProvider>
				</SnackbarProvider>
			</Provider>
		</div>
	);
};

export { store };

export default App;
