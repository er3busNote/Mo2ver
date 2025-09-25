import { Dispatch, SetStateAction } from 'react';
import { AxiosResponse } from 'axios';
import {
	useQuery,
	useMutation,
	QueryObserverResult,
	RefetchOptions,
} from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { BannerRequestData, BannerGoodsInfoData, CSRFData } from '@/types/api';
import BannerService from '@services/BannerService';

interface BannerDetailProps {
	banner: ActionCreatorsMapObject;
	bannerData: BannerRequestData;
	setBannerData: Dispatch<SetStateAction<BannerRequestData>>;
	csrfData?: CSRFData;
}

interface BannerDetailResultProps {
	data: BannerGoodsInfoData | undefined;
	isLoading: boolean;
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<BannerGoodsInfoData, Error>>;
	create: (bannerFormData: BannerGoodsInfoData) => void;
	update: (bannerFormData: BannerGoodsInfoData) => void;
}

const useBannerGoodsDetail = ({
	banner,
	bannerData,
	setBannerData,
	csrfData,
}: BannerDetailProps): BannerDetailResultProps => {
	const service = new BannerService(banner);
	const query = useQuery<BannerGoodsInfoData>({
		queryKey: ['bannerGoodsDetail', bannerData, csrfData?.csrfToken],
		queryFn: () => service.getBannerGoodsDetail(bannerData, csrfData),
		staleTime: 0,
		refetchOnMount: 'always',
	});
	const create = useMutation({
		mutationFn: (bannerFormData: BannerGoodsInfoData) =>
			banner.goodsCreate(bannerFormData, csrfData),
		onSuccess: (response: AxiosResponse) => {
			const bannerNo = response?.headers.location.replace('/create/', '');
			const bannerData: BannerRequestData = {
				bannerNo: bannerNo,
				displayTemplateCode: 'GD',
			};
			setBannerData(bannerData);
			query.refetch();
		},
	});
	const update = useMutation({
		mutationFn: (bannerFormData: BannerGoodsInfoData) =>
			banner.goodsUpdate(bannerFormData, csrfData),
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

export default useBannerGoodsDetail;
