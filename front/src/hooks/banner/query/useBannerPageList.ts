import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { BannerPageData } from '@/types/api';
import BannerService from '@services/BannerService';

interface BannerListProps {
	banner: ActionCreatorsMapObject;
}

interface BannerListResultProps {
	data?: BannerPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

const useBannerPageList = ({
	banner,
}: BannerListProps): BannerListResultProps => {
	const [page, setPage] = useState<number>(0);

	const service = new BannerService(banner);
	const { data } = useQuery<BannerPageData>({
		queryKey: ['bannerPageList', page],
		queryFn: () => service.getBannerPageList(page),
		placeholderData: keepPreviousData,
	});

	return { data, setPage };
};

export default useBannerPageList;
