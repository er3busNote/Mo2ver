import { Dispatch, SetStateAction } from 'react';
import { AxiosResponse } from 'axios';
import {
	useQuery,
	useMutation,
	QueryObserverResult,
	RefetchOptions,
} from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { BannerRequestData, BannerImageInfoData, CSRFData } from '@/types/api';
import BannerService from '@services/BannerService';

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
		staleTime: 0,
		refetchOnMount: 'always',
	});
	const create = useMutation({
		mutationFn: (bannerFormData: BannerImageInfoData) =>
			banner.imagesCreate(bannerFormData, csrfData),
		onSuccess: (response: AxiosResponse) => {
			const bannerNo = response?.headers.location.replace('/create/', '');
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
