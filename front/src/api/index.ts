import axios from 'axios';
import { setInterceptors } from './common/interceptors';
import code from './code';
import menu from './menu';
import member from './member';
import address from './address';
import goods from './goods';
import category from './category';
import review from './review';
import banner from './banner';
import event from './event';
import notice from './notice';
import cart from './cart';
import order from './order';
import payment from './payment';
import search from './search';
import recommend from './recommend';
import file from './file';

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
	address: address(instance),
	goods: goods(instance),
	category: category(instance),
	review: review(instance),
	banner: banner(instance),
	event: event(instance),
	notice: notice(instance),
	cart: cart(instance),
	order: order(instance),
	payment: payment(instance),
	search: search(instance),
	recommend: recommend(instance),
	file: file(instance),
};

export default { ...api };
