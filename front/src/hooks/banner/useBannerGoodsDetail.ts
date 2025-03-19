import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { BannerRequestData, BannerGoodsData, CSRFData } from '@api/types';

interface BannerDetailProps {
	banner: ActionCreatorsMapObject;
	bannerData: BannerRequestData;
	csrfData: CSRFData;
}

const useBannerGoodsDetail = ({
	banner,
	bannerData,
	csrfData,
}: BannerDetailProps): BannerGoodsData | undefined => {
	const [data, setData] = useState<BannerGoodsData>();

	const fetchAndSetData = useCallback(async () => {
		const data = await banner.goodsDetail(bannerData, csrfData);
		setData(data);
	}, [csrfData.csrfToken]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useBannerGoodsDetail;
