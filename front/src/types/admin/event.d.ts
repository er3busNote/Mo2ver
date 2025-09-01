import { Dispatch, SetStateAction, BaseSyntheticEvent } from 'react';
import { EventPageData } from '@/types/api';
import { EventFormValues } from '@/types/admin/form';

interface EventProp {
	title: string;
	description: string;
	onSubmit: (
		data: EventFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

interface EventProps {
	title: string;
	description: string;
	setPage: Dispatch<SetStateAction<number>>;
	eventPageData: EventPageData;
}

export type { EventProp, EventProps };
