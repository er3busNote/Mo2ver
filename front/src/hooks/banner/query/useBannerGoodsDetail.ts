import { Dispatch, SetStateAction } from 'react';
import {
	useQuery,
	useMutation,
	QueryObserverResult,
	RefetchOptions,
} from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { BannerRequestData, BannerGoodsInfoData, CSRFData } from '@/types/api';
import { CreateResponse } from '@/types/handler';
import BannerService from '@services/BannerService';
import { isEmpty, has } from 'lodash';

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
		enabled:
			!isEmpty(bannerData) &&
			has(bannerData, 'bannerNo') &&
			has(bannerData, 'displayTemplateCode'),
		staleTime: 0,
		refetchOnMount: 'always',
	});
	const create = useMutation({
		mutationFn: (bannerFormData: BannerGoodsInfoData) =>
			banner.goodsCreate(bannerFormData, csrfData),
		onSuccess: (response: CreateResponse) => {
			const bannerNo = response?.createId;
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
