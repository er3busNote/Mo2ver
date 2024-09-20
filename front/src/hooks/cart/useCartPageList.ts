import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CartPageData } from '../../api/types';

interface CartListProps {
	cart: ActionCreatorsMapObject;
}

const useCartPageList = ({
	cart,
}: CartListProps): [CartPageData, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<CartPageData>(new Object() as CartPageData);

	const fetchAndSetData = useCallback(async () => {
		const data = await cart.list();
		setData(data);
	}, [page]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage];
};

export default useCartPageList;
