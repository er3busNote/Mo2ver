import { Dispatch, SetStateAction } from 'react';
import { AxiosResponse } from 'axios';
import {
	useQuery,
	useMutation,
	QueryObserverResult,
	RefetchOptions,
} from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { EventRequestData, EventInfoData, CSRFData } from '@/types/api';
import EventService from '@services/EventService';

interface EventDetailProps {
	event: ActionCreatorsMapObject;
	eventData: EventRequestData;
	setEventData: Dispatch<SetStateAction<EventRequestData>>;
	csrfData?: CSRFData;
}

interface EventDetailResultProps {
	data: EventInfoData | undefined;
	isLoading: boolean;
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<EventInfoData, Error>>;
	create: (eventFormData: EventInfoData) => void;
	update: (eventFormData: EventInfoData) => void;
}

const useEventDetail = ({
	event,
	eventData,
	setEventData,
	csrfData,
}: EventDetailProps): EventDetailResultProps => {
	const service = new EventService(event);
	const query = useQuery<EventInfoData>({
		queryKey: ['eventDetail', eventData, csrfData?.csrfToken],
		queryFn: () => service.getEventDetail(eventData, csrfData),
		staleTime: 0,
		refetchOnMount: 'always',
	});
	const create = useMutation({
		mutationFn: (eventFormData: EventInfoData) =>
			event.create(eventFormData, csrfData),
		onSuccess: (response: AxiosResponse) => {
			const eventNo = response?.headers.location.replace('/create/', '');
			const eventData: EventRequestData = { eventNo: eventNo };
			setEventData(eventData);
			query.refetch();
		},
	});
	const update = useMutation({
		mutationFn: (eventFormData: EventInfoData) =>
			event.update(eventFormData, csrfData),
		onSuccess: () => query.refetch(),
	});
	return {
		data: query.data,
		isLoading: query.isLoading,
		refetch: query.refetch,
		create: create.mutateAsync,
		update: update.mutateAsync,
	};
};

export default useEventDetail;
