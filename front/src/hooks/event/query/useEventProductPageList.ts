import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { EventProductPageData } from '@/types/api';
import EventService from '@services/EventService';

interface EventProductListProps {
	code: string;
	event: ActionCreatorsMapObject;
}

interface EventProductListResultProps {
	data: EventProductPageData | undefined;
	setPage: Dispatch<SetStateAction<number>>;
}

const useEventProductPageList = ({
	event,
	code,
}: EventProductListProps): EventProductListResultProps => {
	const [page, setPage] = useState<number>(0);

	const service = new EventService(event);
	const { data } = useQuery<EventProductPageData>({
		queryKey: ['eventProductPageList', code, page],
		queryFn: () => service.getEventProductPageList(code, page),
		placeholderData: keepPreviousData,
	});

	return { data, setPage };
};

export default useEventProductPageList;
