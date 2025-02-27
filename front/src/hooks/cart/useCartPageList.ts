import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CartPageData, CSRFData } from '../../api/types';

interface CartListProps {
	cart: ActionCreatorsMapObject;
	csrfData: CSRFData;
}

const useCartPageList = ({
	cart,
	csrfData,
}: CartListProps): [
	CartPageData,
	Dispatch<SetStateAction<number>>,
	Dispatch<SetStateAction<number>>
] => {
	const [page, setPage] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [data, setData] = useState<CartPageData>(new Object() as CartPageData);

	const fetchAndSetData = useCallback(async () => {
		const data = await cart.list(csrfData);
		setData(data);
	}, [csrfData.csrfToken, page, totalPrice]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage, setTotalPrice];
};

export default useCartPageList;
