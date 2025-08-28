import { Dispatch, SetStateAction } from 'react';
import { NoticeData, NoticePageData } from '@/types/api';

interface NoticeProps {
	title: string;
	description: string;
	noticeData: NoticePageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface NoticeDetailProps {
	title: string;
	description: string;
	noticeData: NoticeData;
	onDonwloadFile: (attachFile: string, filename: string) => void;
}

export type { NoticeProps, NoticeDetailProps };
