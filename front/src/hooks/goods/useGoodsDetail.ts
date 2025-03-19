import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@api/types';

interface GoodsProps {
	code: string;
	goods: ActionCreatorsMapObject;
}

const useGoodsDetail = ({ goods, code }: GoodsProps): GoodsData => {
	const [data, setData] = useState<GoodsData>({
		goodsCode: '',
		goodsName: '',
		goodsBrand: '',
		goodsGender: '',
		goodsYear: '',
		supplyPrice: 0,
		salePrice: 0,
		imageList: [],
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
