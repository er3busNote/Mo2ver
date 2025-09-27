import { Dispatch, SetStateAction } from 'react';
import {
	useQuery,
	useMutation,
	QueryObserverResult,
	RefetchOptions,
} from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { BannerRequestData, BannerImageInfoData, CSRFData } from '@/types/api';
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
	data: BannerImageInfoData | undefined;
	isLoading: boolean;
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<BannerImageInfoData, Error>>;
	create: (bannerFormData: BannerImageInfoData) => void;
	update: (bannerFormData: BannerImageInfoData) => void;
}

const useBannerImagesDetail = ({
	banner,
	bannerData,
	setBannerData,
	csrfData,
}: BannerDetailProps): BannerDetailResultProps => {
	const service = new BannerService(banner);
	const query = useQuery<BannerImageInfoData>({
		queryKey: ['bannerImagesDetail', bannerData, csrfData?.csrfToken],
		queryFn: () => service.getBannerImagesDetail(bannerData, csrfData),
		enabled:
			!isEmpty(bannerData) &&
			has(bannerData, 'bannerNo') &&
			has(bannerData, 'displayTemplateCode'),
		refetchOnMount: 'always',
	});
	const create = useMutation({
		mutationFn: (bannerFormData: BannerImageInfoData) =>
			banner.imagesCreate(bannerFormData, csrfData),
		onSuccess: (response: CreateResponse) => {
			const bannerNo = response?.createId;
			const bannerData: BannerRequestData = {
				bannerNo: bannerNo,
				displayTemplateCode: 'BN',
			};
			setBannerData(bannerData);
			query.refetch();
		},
	});
	const update = useMutation({
		mutationFn: (bannerFormData: BannerImageInfoData) =>
			banner.imagesUpdate(bannerFormData, csrfData),
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

export default useBannerImagesDetail;
