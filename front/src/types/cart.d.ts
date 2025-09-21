import { Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CartData, CartPageData } from '@/types/api';

interface CartProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	setPage: Dispatch<SetStateAction<number>>;
	cartPageData?: CartPageData;
	onCartUpdate: (cartData: CartData) => void;
	onCartDelete: (goodsCode: string) => void;
	onOrder: (isCheck: boolean) => void;
}

interface CartDataProps {
	title: string;
	description: string;
	cartData?: Array<CartData>;
	file: ActionCreatorsMapObject;
	onCartUpdate: (cartData: CartData) => void;
	onCartDelete: (goodsCode: string) => void;
}

interface CartTotalProps {
	totalSalePrice: number; // 총 상품가격 (할인된 가격)
	totalSupplyPrice: number; // 총 공급가격
	deliveryPrice: number; // 배송비
	totalCount: number; // 총 주문 상풍수
	totalOptionCount: number; // 총 주문 옵션 상품수
	//totalCalcPrice: number; // 총 결제 예상 금액
	productMileage: number; // 상품 마일리지
	membershipMileage: number; // 멤버십 마일리지
	//totalCalcMileage: number; // 총 적립 마일리지
}

interface CartListProps {
	title: string;
	description: string;
	steps: string[];
	setPage: Dispatch<SetStateAction<number>>;
	cartPageData?: CartPageData;
	file: ActionCreatorsMapObject;
	onCartUpdate: (cartData: CartData) => void;
	onCartDelete: (goodsCode: string) => void;
	onOrder: (isCheck: boolean) => void;
}

export type { CartProps, CartDataProps, CartTotalProps, CartListProps };
