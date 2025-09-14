import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { EventData } from '@/types/api';

interface EventProps {
	code: string;
	event: ActionCreatorsMapObject;
}

const useEventInfo = ({ event, code }: EventProps): EventData => {
	const [data, setData] = useState<EventData>(new Object() as EventData);

	const fetchAndSetData = useCallback(async () => {
		const data = await event.info(code);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useEventInfo;
