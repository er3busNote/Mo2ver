import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { BannerRequestData, BannerImageInfoData, CSRFData } from '@/types/api';
import BannerService from '@services/BannerService';

interface BannerDetailProps {
	banner: ActionCreatorsMapObject;
	bannerData: BannerRequestData;
	csrfData?: CSRFData;
}

const useBannerImagesDetail = ({
	banner,
	bannerData,
	csrfData,
}: BannerDetailProps) => {
	const service = new BannerService(banner);
	return useQuery<BannerImageInfoData>({
		queryKey: ['bannerImagesDetail', bannerData, csrfData?.csrfToken],
		queryFn: () => service.getBannerImagesDetail(bannerData, csrfData),
		enabled: !!bannerData,
		staleTime: 5 * 60 * 1000,
	});
};

export default useBannerImagesDetail;
