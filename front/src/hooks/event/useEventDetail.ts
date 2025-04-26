import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { EventRequestData, EventDetailData, CSRFData } from '@api/types';

interface EventDetailProps {
	event: ActionCreatorsMapObject;
	eventData: EventRequestData;
	csrfData: CSRFData;
}

const useEventDetail = ({
	event,
	eventData,
	csrfData,
}: EventDetailProps): EventDetailData | undefined => {
	const [data, setData] = useState<EventDetailData>();

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
