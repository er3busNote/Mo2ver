import React, { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppContent from '../components/common/AppContent';
import { Home, Login, Signup, NotFound } from '../pages/index';
import PrivateRoute from './auth';
import './route.css';

const AuthRoutes: FC = (): JSX.Element => {
	const location = useLocation();
	const path = location.pathname.replace('/auth', '');
	const slide = path === '/login' ? 'left' : 'right';
	return (
		<Routes location={location}>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const MainRoutes: FC = (): JSX.Element => {
	const location = useLocation();
	return (
		<Routes location={location}>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const RootRoutes: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/auth/*" element={<AuthRoutes />} />
			<Route element={<PrivateRoute />}>
				<Route element={<AppContent />}>
					<Route path="/*" element={<MainRoutes />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default RootRoutes;
