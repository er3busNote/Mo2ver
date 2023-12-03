import React, { FC } from 'react';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './store';
import RootRoutes from './routes/index';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const store = configureStore({
	reducer: rootReducer,
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
				<ToastContainer
					position="top-right" // 알람 위치 지정
					autoClose={3000} // 자동 off 시간
					hideProgressBar={false} // 진행시간바 숨김
					closeOnClick // 클릭으로 알람 닫기
					rtl={false} // 알림 좌우 반전
					pauseOnFocusLoss // 화면을 벗어나면 알람 정지
					draggable // 드래그 가능
					pauseOnHover // 마우스를 올리면 알람 정지
					theme="light"
					// limit={1} // 알람 개수 제한
				/>
			</Provider>
		</div>
	);
};

export default App;
