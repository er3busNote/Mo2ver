import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { BannerRequestData, BannerGoodsInfoData, CSRFData } from '@api/types';

interface BannerDetailProps {
	banner: ActionCreatorsMapObject;
	bannerData: BannerRequestData;
	csrfData: CSRFData;
}

const useBannerGoodsDetail = ({
	banner,
	bannerData,
	csrfData,
}: BannerDetailProps): BannerGoodsInfoData | undefined => {
	const [data, setData] = useState<BannerGoodsInfoData>();

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
