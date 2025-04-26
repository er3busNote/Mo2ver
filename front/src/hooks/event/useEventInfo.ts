import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { EventData } from '@api/types';

interface GoodsProps {
	code: string;
	event: ActionCreatorsMapObject;
}

const useEventInfo = ({ event, code }: GoodsProps): EventData => {
	const [data, setData] = useState<EventData>({
		eventManageNo: 0,
		subject: '',
		eventStartDate: 0,
		eventEndDate: 0,
		eventYesNo: '',
		register: '',
		registerDate: 0,
		imageList: [],
	});

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
