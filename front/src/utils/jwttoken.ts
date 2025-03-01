import jwtDecode, { JwtPayload } from 'jwt-decode';
import { getSessionStorage, clearSessionStorage } from './storage';

// [Case - 2] : access token + refresh token way
const JWT_USERNAME = 'username';
const JWT_ACCESS_TOKEN = 'access_token';
const JWT_REFRESH_TOKEN = 'refresh_token';

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

const isTokenExpired = (token: string): boolean => {
	try {
		const decoded: CustomJwtPayload = jwtDecode(token);
		if ((decoded?.exp as number) < Date.now() / 1000) return true;
		return false;
	} catch (e) {
		return false;
	}
};

const getAccessToken = (): string | null => getSessionStorage(JWT_ACCESS_TOKEN);
const getRefreshToken = (): string | null =>
	getSessionStorage(JWT_REFRESH_TOKEN);

const isAdmin = (): boolean => isAdminRole(getAccessToken() as string);

const isAuthenticated = (): boolean => {
	if (!!getAccessToken() && !isTokenExpired(getAccessToken() as string)) {
		return true;
	}
	if (
		isTokenExpired(getAccessToken() as string) &&
		!isTokenExpired(getRefreshToken() as string)
	) {
		return true;
	}
	clearAuthenticated();
	return false;
};

const clearAuthenticated = (): void => {
	clearSessionStorage(JWT_USERNAME);
	clearSessionStorage(JWT_ACCESS_TOKEN);
	clearSessionStorage(JWT_REFRESH_TOKEN);
};

export {
	JWT_USERNAME,
	JWT_ACCESS_TOKEN,
	JWT_REFRESH_TOKEN,
	isAdmin,
	getAccessToken,
	isAuthenticated,
	clearAuthenticated,
};
