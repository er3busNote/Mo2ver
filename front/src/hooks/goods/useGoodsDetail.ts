import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsDetailData } from '@api/types';

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
		supplyPrice: 0,
		salePrice: 0,
		imageList: [],
		keywordList: [],
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
