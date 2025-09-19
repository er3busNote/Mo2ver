import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import BannerService from '@services/BannerService';

interface BannerProps {
	banner: ActionCreatorsMapObject;
}

const useBannerDisplayList = ({ banner }: BannerProps) => {
	const service = new BannerService(banner);
	return useQuery<Record<string, Record<string, Array<object>>>>({
		queryKey: ['bannerDiaplayList'],
		queryFn: () => service.getBannerDisplay(),
		staleTime: 1000 * 60,
	});
};

export default useBannerDisplayList;
