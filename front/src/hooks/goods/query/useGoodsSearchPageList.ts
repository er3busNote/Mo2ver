import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsPageData } from '@/types/api';
import GoodsService from '@services/GoodsService';

interface GoodsSearchProps {
	goodsName: string;
	largeCategoryCode: string;
	mediumCategoryCode: string;
	smallCategoryCode: string;
	goods: ActionCreatorsMapObject;
}

interface GoodsListResultProps {
	data: GoodsPageData | undefined;
	setPage: Dispatch<SetStateAction<number>>;
}

const useGoodsSearchPageList = ({
	goodsName,
	largeCategoryCode,
	mediumCategoryCode,
	smallCategoryCode,
	goods,
}: GoodsSearchProps): GoodsListResultProps => {
	const [page, setPage] = useState<number>(0);

	const service = new GoodsService(goods);
	const { data } = useQuery<GoodsPageData>({
		queryKey: [
			'goodsSearchPageList',
			page,
			goodsName,
			largeCategoryCode,
			mediumCategoryCode,
			smallCategoryCode,
		],
		queryFn: async () =>
			service.getGoodsSearchPageList(
				page,
				goodsName,
				largeCategoryCode,
				mediumCategoryCode,
				smallCategoryCode
			),
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	});

	return { data, setPage };
};

export default useGoodsSearchPageList;
