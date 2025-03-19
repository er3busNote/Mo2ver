import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { PageData, EventDetailPageData } from '@api/types';

interface EventListProps {
	code: string;
	event: ActionCreatorsMapObject;
}

const useEventDetailPageList = ({
	event,
	code,
}: EventListProps): [EventDetailPageData, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<EventDetailPageData>(
		new Object() as EventDetailPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const pageData: PageData = {
			page: page,
			size: 12,
		};
		const data = await event.info(code, pageData);
		setData(data);
	}, [page]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage];
};

export default useEventDetailPageList;
