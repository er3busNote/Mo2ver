import { useState, useEffect } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData, CategoryData } from '@/types/api';
import useCategoryInfo from '@hooks/category/query/useCategoryInfo';
import useGoodsSearchPageList from '@hooks/goods/query/useGoodsSearchPageList';
import { BannerGoodsDetailValues } from '@/types/admin/form';
import { intersect, union } from '@utils/set';
import { get, some } from 'lodash';

interface DialogGoodsSelectionProps {
	goods: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
	goodsSaveData?: BannerGoodsDetailValues[];
}

const useDialogGoodsSelection = ({
	category,
	goods,
	goodsSaveData,
}: DialogGoodsSelectionProps) => {
	const [keyword, setKeyword] = useState<string>('');
	const [goodsName, setGoodsName] = useState<string>('');
	const [largeCategoryCode, setLargeCategoryCode] = useState<string>('');
	const [mediumCategoryCode, setMediumCategoryCode] = useState<string>('');
	const [smallCategoryCode, setSmallCategoryCode] = useState<string>('');

	// 카테고리 단계별 데이터
	const { data: largeCategoryData } = useCategoryInfo({
		category,
		categoryLevel: 1,
	});
	const { data: mediumCategoryData } = useCategoryInfo({
		category,
		categoryLevel: 2,
		categoryInfo: largeCategoryCode,
	});
	const { data: smallCategoryData } = useCategoryInfo({
		category,
		categoryLevel: 3,
		categoryInfo: mediumCategoryCode,
	});

	// 상품 데이터
	const { data: goodsData, setPage } = useGoodsSearchPageList({
		goods,
		goodsName,
		largeCategoryCode,
		mediumCategoryCode,
		smallCategoryCode,
	});

	// 좌우 선택 상태
	const [left, setLeft] = useState<readonly GoodsData[]>(
		goodsData?.content ?? []
	);
	const [right, setRight] = useState<readonly GoodsData[]>([]);
	const [checked, setChecked] = useState<readonly GoodsData[]>([]);

	// 체크된 아이템 교집합
	const leftChecked = intersect(checked, left);
	const rightChecked = intersect(checked, right);

	// goodsData / goodsSaveData 변경 시 리스트 동기화
	useEffect(() => {
		setLeft(goodsData?.content ?? []);
		setRight(
			goodsSaveData
				? union(
						right,
						goodsSaveData.map((item) => ({
							goodsCode: item.goodsCode,
							goodsName: item.goodsName,
							goodsBrand: '',
							goodsGender: '',
							goodsYear: '',
							supplyPrice: 0,
							salePrice: item.salePrice,
							imageList: [],
							keywordList: [],
						})),
						'goodsCode'
				  )
				: []
		);
	}, [goodsData, goodsSaveData]);

	// medium/small 카테고리 값이 없으면 기본값 세팅
	useEffect(() => {
		if (
			!some(
				mediumCategoryData,
				(data: CategoryData) => data.categoryCode === mediumCategoryCode
			)
		) {
			setMediumCategoryCode(get(mediumCategoryData, '[0].categoryCode', ''));
		}
		if (
			!some(
				smallCategoryData,
				(data: CategoryData) => data.categoryCode === smallCategoryCode
			)
		) {
			setSmallCategoryCode(get(smallCategoryData, '[0].categoryCode', ''));
		}
	}, [
		mediumCategoryData,
		mediumCategoryCode,
		smallCategoryData,
		smallCategoryCode,
	]);

	return {
		// 검색/입력 값
		keyword,
		setKeyword,
		setGoodsName,

		// 카테고리 값
		largeCategoryCode,
		setLargeCategoryCode,
		mediumCategoryCode,
		setMediumCategoryCode,
		smallCategoryCode,
		setSmallCategoryCode,

		// 카테고리 데이터
		largeCategoryData,
		mediumCategoryData,
		smallCategoryData,

		// 상품 데이터
		goodsData,
		setPage,

		// 선택 리스트 & 체크
		left,
		right,
		checked,
		setLeft,
		setRight,
		setChecked,
		leftChecked,
		rightChecked,
	};
};

export default useDialogGoodsSelection;
