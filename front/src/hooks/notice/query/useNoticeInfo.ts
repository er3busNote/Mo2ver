import { ActionCreatorsMapObject } from 'redux';
import { NoticeData } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import NoticeService from '@services/NoticeService';
import { isEmpty } from 'lodash';

interface NoticeProps {
	code: string;
	notice: ActionCreatorsMapObject;
}

const useNoticeInfo = ({ notice, code }: NoticeProps) => {
	const service = new NoticeService(notice);
	return useQuery<NoticeData>({
		queryKey: ['noticeInfo', code],
		queryFn: () => service.getNoticeInfo(code),
		enabled: !isEmpty(code),
		staleTime: 5 * 60 * 1000,
	});
};

export default useNoticeInfo;
