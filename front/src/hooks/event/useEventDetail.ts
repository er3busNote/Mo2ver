import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { EventRequestData, EventDisplayData, CSRFData } from '@api/types';

interface EventDetailProps {
	event: ActionCreatorsMapObject;
	eventData: EventRequestData;
	csrfData: CSRFData;
}

const useEventDetail = ({
	event,
	eventData,
	csrfData,
}: EventDetailProps): EventDisplayData | undefined => {
	const [data, setData] = useState<EventDisplayData>();

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
