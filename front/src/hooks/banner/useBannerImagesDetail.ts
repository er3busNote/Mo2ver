import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { BannerRequestData, BannerImageInfoData, CSRFData } from '@api/types';

interface BannerDetailProps {
	banner: ActionCreatorsMapObject;
	bannerData: BannerRequestData;
	csrfData: CSRFData;
}

const useBannerImagesDetail = ({
	banner,
	bannerData,
	csrfData,
}: BannerDetailProps): BannerImageInfoData | undefined => {
	const [data, setData] = useState<BannerImageInfoData>();

	const fetchAndSetData = useCallback(async () => {
		const data = await banner.imagesDetail(bannerData, csrfData);
		setData(data);
	}, [csrfData.csrfToken]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useBannerImagesDetail;
