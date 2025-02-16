import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { BannerDetailData, BannerImageData, CSRFData } from '../../api/types';

interface BannerDetailProps {
	banner: ActionCreatorsMapObject;
	bannerData: BannerDetailData;
	csrfData: CSRFData;
}

const useBannerImagesDetail = ({
	banner,
	bannerData,
	csrfData,
}: BannerDetailProps): BannerImageData | undefined => {
	const [data, setData] = useState<BannerImageData>();

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
