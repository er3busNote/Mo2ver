import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { EventRequestData, EventInfoData, CSRFData } from '@/types/api';
import EventService from '@services/EventService';

interface EventDetailProps {
	event: ActionCreatorsMapObject;
	eventData: EventRequestData;
	csrfData?: CSRFData;
}

const useEventDetail = ({ event, eventData, csrfData }: EventDetailProps) => {
	const service = new EventService(event);
	return useQuery<EventInfoData>({
		queryKey: ['eventDetail', eventData, csrfData?.csrfToken],
		queryFn: () => service.getEventDetail(eventData, csrfData),
		enabled: !!eventData,
	});
};

export default useEventDetail;
