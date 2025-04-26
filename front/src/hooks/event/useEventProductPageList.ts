import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { PageData, EventProductPageData } from '@api/types';

interface EventProductListProps {
	code: string;
	event: ActionCreatorsMapObject;
}

const useEventProductPageList = ({
	event,
	code,
}: EventProductListProps): [
	EventProductPageData,
	Dispatch<SetStateAction<number>>
] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<EventProductPageData>(
		new Object() as EventProductPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const pageData: PageData = {
			page: page,
			size: 12,
		};
		const data = await event.product(code, pageData);
		setData(data);
	}, [page]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage];
};

export default useEventProductPageList;
