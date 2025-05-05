import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { NoticeRequestData, NoticeDetailData, CSRFData } from '@api/types';

interface NoticeDetailProps {
	notice: ActionCreatorsMapObject;
	noticeData: NoticeRequestData;
	csrfData: CSRFData;
}

const useNoticeDetail = ({
	notice,
	noticeData,
	csrfData,
}: NoticeDetailProps): NoticeDetailData | undefined => {
	const [data, setData] = useState<NoticeDetailData>();

	const fetchAndSetData = useCallback(async () => {
		const data = await notice.detail(noticeData, csrfData);
		setData(data);
	}, [csrfData.csrfToken]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useNoticeDetail;
