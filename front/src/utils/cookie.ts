import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const setCookie = (name: string, value: string, options?: any) =>
	cookies.set(name, value, { ...options });

const getCookie = (name: string) => cookies.get(name);

const removeCookie = (name: string) => cookies.remove(name);

export { setCookie, getCookie, removeCookie };
