import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPageData } from '@/types/api';
import GoodsService from '@services/GoodsService';

interface GoodsListProps {
	categoryCode: string;
	categoryType: string;
	goods: ActionCreatorsMapObject;
}

interface GoodsListResultProps {
	data: GoodsPageData | undefined;
	setPage: Dispatch<SetStateAction<number>>;
}

const useGoodsPageList = ({
	categoryCode,
	categoryType,
	goods,
}: GoodsListProps): GoodsListResultProps => {
	const [page, setPage] = useState<number>(0);

	const service = new GoodsService(goods);
	const { data } = useQuery<GoodsPageData>({
		queryKey: ['goodsPageList', categoryCode, categoryType, page],
		queryFn: () => service.getGoodsPageList(page, categoryCode, categoryType),
		staleTime: 5 * 60 * 1000,
	});

	return { data, setPage };
};

export default useGoodsPageList;
