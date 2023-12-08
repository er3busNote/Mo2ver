import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { BannerPageData } from '../services/types';

interface BannerListProps {
	banner: ActionCreatorsMapObject;
}

const useBannerPageList = ({ banner }: BannerListProps): BannerPageData => {
	const [data, setData] = useState<BannerPageData>(
		new Object() as BannerPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const data = await banner.list();
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useBannerPageList;
