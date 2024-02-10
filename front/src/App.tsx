import React, { FC } from 'react';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import persistedReducer from './store';
import RootRoutes from './routes/index';
import { CookiesProvider } from 'react-cookie';
import './App.css';

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

const App: FC = (): JSX.Element => {
	return (
		<div className="App">
			<Provider store={store}>
				<CookiesProvider>
					<RootRoutes />
				</CookiesProvider>
			</Provider>
		</div>
	);
};

export default App;
