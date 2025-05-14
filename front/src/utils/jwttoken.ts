import jwtDecode, { JwtPayload } from 'jwt-decode';
import { isEmpty } from 'lodash';

const JWT_ACCESS_TOKEN = 'accessToken';
const JWT_REFRESH_TOKEN_EXPIRATION = 'refreshTokenExpiration';

interface CustomJwtPayload extends JwtPayload {
	auth: string;
}

const isAdminRole = (token: string): boolean => {
	try {
		const decoded: CustomJwtPayload = jwtDecode(token);
		if (decoded?.auth.split(',').includes('ROLE_ADMIN')) return true;
		return false;
	} catch (e) {
		return false;
	}
};

const isAccessTokenExpired = (token: string): boolean => {
	try {
		const decoded: CustomJwtPayload = jwtDecode(token);
		if ((decoded?.exp as number) < Date.now() / 1000) return true;
		return false;
	} catch (e) {
		return false;
	}
};
const isRefreshTokenExpired = (): boolean => {
	const refreshTokenExpiration = getRefreshTokenExpiration();
	if (isEmpty(refreshTokenExpiration)) return true;
	const refreshTokenExpirationDate = new Date(refreshTokenExpiration);
	return refreshTokenExpirationDate.getTime() < Date.now();
};

const getAccessToken = (): string =>
	localStorage.getItem(JWT_ACCESS_TOKEN) ?? '';
const setAccessToken = (token: string): void =>
	localStorage.setItem(JWT_ACCESS_TOKEN, token);
const removeAccessToken = (): void => localStorage.removeItem(JWT_ACCESS_TOKEN);
const getRefreshTokenExpiration = (): string =>
	localStorage.getItem(JWT_REFRESH_TOKEN_EXPIRATION) ?? '';
const setRefreshTokenExpiration = (expiration: string): void =>
	localStorage.setItem(JWT_REFRESH_TOKEN_EXPIRATION, expiration);
const removeRefreshTokenExpiration = (): void =>
	localStorage.removeItem(JWT_REFRESH_TOKEN_EXPIRATION);

const isAdmin = (): boolean => isAdminRole(getAccessToken());
const isAuthenticated = (): boolean => {
	const accessToken = getAccessToken();
	if (!!accessToken && !isAccessTokenExpired(accessToken)) {
		return true;
	}
	if (isAccessTokenExpired(accessToken) && !isRefreshTokenExpired()) {
		return true;
	}
	return false;
};

export {
	getAccessToken,
	setAccessToken,
	removeAccessToken,
	setRefreshTokenExpiration,
	removeRefreshTokenExpiration,
	isAdmin,
	isAuthenticated,
};
