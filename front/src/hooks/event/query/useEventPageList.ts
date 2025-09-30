import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { EventPageData } from '@/types/api';
import EventService from '@services/EventService';

interface EventListProps {
	event: ActionCreatorsMapObject;
}

interface EventListResultProps {
	data?: EventPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

const useEventPageList = ({ event }: EventListProps): EventListResultProps => {
	const [page, setPage] = useState<number>(0);

	const service = new EventService(event);
	const { data } = useQuery<EventPageData>({
		queryKey: ['eventPageList', page],
		queryFn: () => service.getEventPageList(page),
		placeholderData: keepPreviousData,
	});

	return { data, setPage };
};

export default useEventPageList;
