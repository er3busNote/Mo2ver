import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { BannerRequestData, BannerGoodsInfoData, CSRFData } from '@/types/api';
import BannerService from '@services/BannerService';

interface BannerDetailProps {
	banner: ActionCreatorsMapObject;
	bannerData: BannerRequestData;
	csrfData?: CSRFData;
}

const useBannerGoodsDetail = ({
	banner,
	bannerData,
	csrfData,
}: BannerDetailProps) => {
	const service = new BannerService(banner);
	const query = useQuery<BannerGoodsInfoData>({
		queryKey: ['bannerGoodsDetail', bannerData, csrfData?.csrfToken],
		queryFn: () => service.getBannerGoodsDetail(bannerData, csrfData),
		enabled: !!bannerData,
		staleTime: 5 * 60 * 1000,
	});

	return query;
};

export default useBannerGoodsDetail;
