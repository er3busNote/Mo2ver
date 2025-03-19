import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { PageData, BannerPageData } from '@api/types';

interface BannerListProps {
	banner: ActionCreatorsMapObject;
}

const useBannerPageList = ({
	banner,
}: BannerListProps): [BannerPageData, Dispatch<SetStateAction<number>>] => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<BannerPageData>(
		new Object() as BannerPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const pageData: PageData = {
			page: page,
			size: 12,
		};
		const data = await banner.list(pageData);
		setData(data);
	}, [page]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage];
};

export default useBannerPageList;
