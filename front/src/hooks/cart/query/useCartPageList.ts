import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { CartPageData } from '@/types/api';
import CartService from '@services/CartService';

interface CartListProps {
	cart: ActionCreatorsMapObject;
}

interface CartListResultProps {
	data?: CartPageData;
	setPage: Dispatch<SetStateAction<number>>;
	setTotalPrice: Dispatch<SetStateAction<number>>;
}

const useCartPageList = ({ cart }: CartListProps): CartListResultProps => {
	const [page, setPage] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	const service = new CartService(cart);
	const { data } = useQuery<CartPageData>({
		queryKey: ['cartPageList', page, totalPrice],
		queryFn: () => service.getCartPageList(),
		placeholderData: keepPreviousData,
	});

	return { data, setPage, setTotalPrice };
};

export default useCartPageList;
