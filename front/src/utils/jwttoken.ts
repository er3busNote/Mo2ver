import jwtDecode, { JwtPayload } from 'jwt-decode';
import { getCookie } from './cookie';
import { isEmpty } from './validation';

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
	const refreshTokenExpiration = getCookie(JWT_REFRESH_TOKEN_EXPIRATION);
	if (isEmpty(refreshTokenExpiration)) return true;
	const refreshTokenExpirationDate = new Date(refreshTokenExpiration);
	return refreshTokenExpirationDate.getTime() < Date.now();
};

const getAccessToken = (): string =>
	localStorage.getItem(JWT_ACCESS_TOKEN) ?? '';
const setAccessToken = (token: string): void => {
	localStorage.setItem(JWT_ACCESS_TOKEN, token);
};

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

export { getAccessToken, setAccessToken, isAdmin, isAuthenticated };
