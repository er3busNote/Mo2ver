import { Dispatch, SetStateAction, BaseSyntheticEvent } from 'react';
import { NoticePageData } from '@/types/api';
import { NoticeFormValues } from '@/types/admin/form';

interface NoticeProp {
	title: string;
	description: string;
	onSubmit: (
		data: NoticeFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

interface NoticeProps {
	title: string;
	description: string;
	setPage: Dispatch<SetStateAction<number>>;
	noticePageData: NoticePageData;
}

export type { NoticeProp, NoticeProps };
