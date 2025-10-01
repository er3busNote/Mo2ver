import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { NoticeRequestData, NoticeInfoData, CSRFData } from '@/types/api';
import NoticeService from '@services/NoticeService';
import { isEmpty, get } from 'lodash';

interface NoticeDetailProps {
	notice: ActionCreatorsMapObject;
	noticeData: NoticeRequestData;
	csrfData?: CSRFData;
}

const useNoticeDetail = ({
	notice,
	noticeData,
	csrfData,
}: NoticeDetailProps) => {
	const service = new NoticeService(notice);
	return useQuery<NoticeInfoData>({
		queryKey: ['noticeDetail', noticeData, csrfData?.csrfToken],
		queryFn: () => service.getNoticeDetail(noticeData, csrfData),
		enabled: !isEmpty(get(noticeData, 'noticeNo', '')),
		staleTime: 0,
	});
};

export default useNoticeDetail;
