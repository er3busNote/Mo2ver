import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { BannerDetailData, GoodsDisplayData, CSRFData } from '../../api/types';

interface BannerDetailProps {
	banner: ActionCreatorsMapObject;
	bannerData: BannerDetailData;
	csrfData: CSRFData;
}

const useBannerGoodsDetail = ({
	banner,
	bannerData,
	csrfData,
}: BannerDetailProps): GoodsDisplayData | undefined => {
	const [data, setData] = useState<GoodsDisplayData>();

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
