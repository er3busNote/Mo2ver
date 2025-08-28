import { Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { EventData, EventPageData, EventProductPageData } from '@/types/api';

interface EventProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	eventData: EventPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface EventDetailProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	eventData: EventData;
	eventProductData: EventProductPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface EventDispatchProps {
	title: string;
	description: string;
	event: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

export type { EventProps, EventDetailProps, EventDispatchProps };
