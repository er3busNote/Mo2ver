import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { NoticePageData } from '@/types/api';
import NoticeService from '@services/NoticeService';

interface NoticeListProps {
	notice: ActionCreatorsMapObject;
}

interface NoticeListResultProps {
	data?: NoticePageData;
	setPage: Dispatch<SetStateAction<number>>;
}

const useNoticePageList = ({
	notice,
}: NoticeListProps): NoticeListResultProps => {
	const [page, setPage] = useState<number>(0);

	const service = new NoticeService(notice);
	const { data } = useQuery<NoticePageData>({
		queryKey: ['noticeList', page],
		queryFn: () => service.getNoticePageList(page),
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	});

	return { data, setPage };
};

export default useNoticePageList;
