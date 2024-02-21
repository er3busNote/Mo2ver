import React, { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppContent from '../components/common/AppContent';
import AdminContent from '../components/admin/AdminContent';
import {
	Home,
	Login,
	Signup,
	User,
	Cart,
	Goods,
	GoodsDetail,
	GoodsRegister,
	Event,
	EventDetail,
	Notice,
	AdminDashboard,
	AdminCategory,
	AdminBanner,
	AdminBannerImage,
	AdminBannerGoods,
	AdminBannerVideo,
	AdminEvent,
	AdminEventGoods,
	NotFound,
} from '../pages/index';
import PrivateRoute from './auth';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './route.css';

const AuthRoutes: FC = (): JSX.Element => {
	const location = useLocation();
	const path = location.pathname.replace('/auth', '');
	const slide = path === '/login' ? 'left' : 'right';
	return (
		<TransitionGroup>
			<CSSTransition key={location.pathname} classNames={slide} timeout={300}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
};

const MainRoutes: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/auth/*" element={<AuthRoutes />} />
			<Route element={<PrivateRoute role={'user'} />}>
				<Route path="/goods/:type/:code" element={<Goods />} />
				<Route path="/goods/:id/detail" element={<GoodsDetail />} />
				<Route path="/event" element={<Event />} />
				<Route path="/event/:id/detail" element={<EventDetail />} />
				<Route path="/register" element={<GoodsRegister />} />
				<Route path="/notice" element={<Notice />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/profile" element={<User />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const AdminRoutes: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<AdminDashboard />} />
			<Route path="/cagetory" element={<AdminCategory />} />
			<Route path="/banner" element={<AdminBanner />} />
			<Route path="/banner/image" element={<AdminBannerImage />} />
			<Route path="/banner/goods" element={<AdminBannerGoods />} />
			<Route path="/banner/video" element={<AdminBannerVideo />} />
			<Route path="/event" element={<AdminEvent />} />
			<Route path="/event/goods" element={<AdminEventGoods />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const RootRoutes: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route element={<PrivateRoute role={'admin'} />}>
				<Route element={<AdminContent />}>
					<Route path="/admin/*" element={<AdminRoutes />} />
				</Route>
			</Route>
			<Route element={<AppContent />}>
				<Route path="/*" element={<MainRoutes />} />
			</Route>
		</Routes>
	);
};

export default RootRoutes;
