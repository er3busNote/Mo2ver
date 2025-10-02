import { Dispatch, SetStateAction } from 'react';
import {
	useQuery,
	useMutation,
	QueryObserverResult,
	RefetchOptions,
} from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { NoticeRequestData, NoticeInfoData, CSRFData } from '@/types/api';
import { CreateResponse } from '@/types/handler';
import NoticeService from '@services/NoticeService';
import { isEmpty, get } from 'lodash';

interface NoticeDetailProps {
	notice: ActionCreatorsMapObject;
	noticeData: NoticeRequestData;
	setNoticeData: Dispatch<SetStateAction<NoticeRequestData>>;
	csrfData?: CSRFData;
}

interface NoticeDetailResultProps {
	data?: NoticeInfoData;
	isLoading: boolean;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<NoticeInfoData, Error>>;
	create: (noticeFormData: NoticeInfoData) => void;
	update: (noticeFormData: NoticeInfoData) => void;
}

const useNoticeDetail = ({
	notice,
	noticeData,
	setNoticeData,
	csrfData,
}: NoticeDetailProps): NoticeDetailResultProps => {
	const service = new NoticeService(notice);
	const query = useQuery<NoticeInfoData>({
		queryKey: ['noticeDetail', noticeData, csrfData?.csrfToken],
		queryFn: () => service.getNoticeDetail(noticeData, csrfData),
		enabled: !isEmpty(get(noticeData, 'noticeNo', '')),
		staleTime: 0,
		refetchOnMount: 'always',
	});

	const create = useMutation({
		mutationFn: (noticeFormData: NoticeInfoData) =>
			notice.create(noticeFormData, csrfData),
		onSuccess: (response: CreateResponse) => {
			const noticeNo = response?.createId;
			const noticeData: NoticeRequestData = { noticeNo: noticeNo };
			setNoticeData(noticeData);
			query.refetch();
		},
	});

	const update = useMutation({
		mutationFn: (noticeFormData: NoticeInfoData) =>
			notice.update(noticeFormData, csrfData),
		onSuccess: () => query.refetch(),
	});

	return {
		data: query.data,
		isLoading: query.isLoading,
		refetch: query.refetch,
		create: create.mutateAsync,
		update: update.mutateAsync,
	};
};

export default useNoticeDetail;
