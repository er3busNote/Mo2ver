import axios from 'axios';
import { setInterceptors } from './common/interceptors';
import code from './code';
import menu from './menu';
import member from './member';
import goods from './goods';
import category from './category';
import banner from './banner';
import event from './event';
import cart from './cart';
import search from './search';
import image from './image';

// 인스턴스 API 생성
const createInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_API_URL, // [Server] CORS Origin
		withCredentials: true, // [Client] CORS 요청 시 쿠키 포함 여부 설정
	});

	return setInterceptors(instance);
};
const instance = createInstance();

const api = {
	code: code(instance),
	menu: menu(instance),
	member: member(instance),
	goods: goods(instance),
	category: category(instance),
	banner: banner(instance),
	event: event(instance),
	cart: cart(instance),
	search: search(instance),
	image: image(instance),
};

export default { ...api };
