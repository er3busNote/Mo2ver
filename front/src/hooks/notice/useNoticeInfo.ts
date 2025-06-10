import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { NoticeData } from '@api/types';

interface NoticeProps {
	code: string;
	notice: ActionCreatorsMapObject;
}

const useNoticeInfo = ({ notice, code }: NoticeProps): NoticeData => {
	const [data, setData] = useState<NoticeData>({
		noticeManageNo: 0,
		subject: '',
		contents: '',
		noticeYesNo: '',
		memberName: '',
		registerDate: '',
		noticeFileList: [],
	});

	const fetchAndSetData = useCallback(async () => {
		const data = await notice.info(code);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useNoticeInfo;
