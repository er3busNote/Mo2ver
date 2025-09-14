import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsDetailData } from '@/types/api';

interface GoodsProps {
	code: string;
	goods: ActionCreatorsMapObject;
}

const useGoodsDetail = ({ goods, code }: GoodsProps): GoodsDetailData => {
	const [data, setData] = useState<GoodsDetailData>({
		goodsCode: '',
		goodsName: '',
		goodsBrand: '',
		goodsGender: '',
		goodsYear: '',
		imageList: [],
		keywordList: [],
		goodsimageList: [],
		summaryInfo: '',
		largeCategoryCode: '',
		mediumCategoryCode: '',
		smallCategoryCode: '',
		buyLimitYesNo: '',
		salePeriodYesNo: '',
		saleStartDate: '',
		saleEndDate: '',
		maxBuyQuantity: 0,
		supplyPrice: 0,
		salePrice: 0,
		discountPrice: 0,
		discountStartDate: '',
		discountEndDate: '',
		averageRating: 0.0,
		reviewCount: 0,
	});

	const fetchAndSetData = useCallback(async () => {
		const data = await goods.info(code);
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useGoodsDetail;
