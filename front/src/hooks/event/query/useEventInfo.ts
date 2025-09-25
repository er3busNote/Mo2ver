import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { EventData } from '@/types/api';
import EventService from '@services/EventService';

interface EventProps {
	code: string;
	event: ActionCreatorsMapObject;
}

const useEventInfo = ({ event, code }: EventProps) => {
	const service = new EventService(event);
	return useQuery<EventData>({
		queryKey: ['eventInfo', code],
		queryFn: () => service.getEventInfo(code),
		enabled: Boolean(code), // code가 있을 때만 호출
	});
};

export default useEventInfo;
