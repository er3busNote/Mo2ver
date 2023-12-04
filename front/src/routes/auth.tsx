import React, { FC } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { getAccessToken, isAuthenticated, isAdmin } from '../utils/jwttoken';

interface LocationState {
	from: string;
}

interface PrivateRouteProps {
	role: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ role }): JSX.Element => {
	const location = useLocation();
	let redirectTo = location.pathname;
	if (location.pathname.includes('/auth'))
		redirectTo = (location.state as LocationState)?.from || '/';
	if (role === 'admin' && getAccessToken() && isAuthenticated() && isAdmin())
		return <Outlet />;
	else if (role === 'user' && getAccessToken() && isAuthenticated()) {
		return <Outlet />;
	}
	console.log(redirectTo);
	return (
		<Navigate
			to={{ pathname: '/auth/login' }}
			state={{ from: redirectTo }}
			replace
		/>
	);
};

export default PrivateRoute;
