import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { NoticeData } from '@/types/api';

interface NoticeProps {
	code: string;
	notice: ActionCreatorsMapObject;
}

const useNoticeInfo = ({ notice, code }: NoticeProps): NoticeData => {
	const [data, setData] = useState<NoticeData>(new Object() as NoticeData);

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
