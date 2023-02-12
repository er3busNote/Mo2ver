import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContent from '../components/common/AppContent';
import AdminContent from '../components/admin/AdminContent';
import {
	Home,
	Login,
	Signup,
	Banner,
	Category,
	Dashboard,
	NotFound,
} from '../pages/index';
import PrivateRoute from './auth';

const AuthRoutes: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const MainRoutes: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const AdminRoutes: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/cagetory" element={<Category />} />
			<Route path="/banner" element={<Banner />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const RootRoutes: FC = (): JSX.Element => {
	return (
		<Routes>
			{/**
			<Route path="/auth/*" element={<AuthRoutes />} />
			<Route element={<PrivateRoute />}>
				<Route element={<AppContent />}>
					<Route path="/*" element={<MainRoutes />} />
				</Route>
			</Route>
			 */}
			<Route element={<AdminContent />}>
				<Route path="/admin/*" element={<AdminRoutes />} />
			</Route>
			<Route element={<AppContent />}>
				<Route path="/*" element={<MainRoutes />} />
			</Route>
		</Routes>
	);
};

export default RootRoutes;
