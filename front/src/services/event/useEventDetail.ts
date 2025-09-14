import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { EventRequestData, EventInfoData, CSRFData } from '@/types/api';

interface EventDetailProps {
	event: ActionCreatorsMapObject;
	eventData: EventRequestData;
	csrfData: CSRFData;
}

const useEventDetail = ({
	event,
	eventData,
	csrfData,
}: EventDetailProps): EventInfoData | undefined => {
	const [data, setData] = useState<EventInfoData>();

	const fetchAndSetData = useCallback(async () => {
		const data = await event.detail(eventData, csrfData);
		setData(data);
	}, [csrfData.csrfToken]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useEventDetail;
