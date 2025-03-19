import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { PageData, EventPageData } from '@api/types';

interface EventListProps {
	event: ActionCreatorsMapObject;
}

const useEventPageList = ({
	event,
}: EventListProps): [EventPageData, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<EventPageData>(
		new Object() as EventPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const pageData: PageData = {
			page: page,
			size: 12,
		};
		const data = await event.list(pageData);
		setData(data);
	}, [page]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage];
};

export default useEventPageList;
