import { Dispatch, SetStateAction } from 'react';
import { Dispatch as DispatchAction, AnyAction } from '@reduxjs/toolkit';
import { ChangeEvent } from 'react';
import { toastMessage } from '@store/index';
import { GoodsData } from '@/types/api';
import { SelectChangeEvent } from '@mui/material/Select';
import { not, intersectBy, union } from '@utils/set';
import { indexOf } from 'lodash';

const handleCategoryChange =
	(setCategoryCode: Dispatch<SetStateAction<string>>) =>
	(event: SelectChangeEvent) => {
		setCategoryCode(event.target.value as string);
	};

const handleSearchClick =
	(setGoodsName: Dispatch<SetStateAction<string>>) => (goodsName: string) => {
		setGoodsName(goodsName);
	};

const handleSearchOnChange =
	(setKeyword: Dispatch<SetStateAction<string>>) =>
	(event: ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.currentTarget.value as string);
	};

const handleToggle =
	(
		checked: readonly GoodsData[],
		setChecked: Dispatch<SetStateAction<readonly GoodsData[]>>
	) =>
	(value: GoodsData) =>
	() => {
		const currentIndex = indexOf(checked, value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

const handleAllRight =
	(
		right: readonly GoodsData[],
		left: readonly GoodsData[],
		setRight: Dispatch<SetStateAction<readonly GoodsData[]>>,
		setLeft: Dispatch<SetStateAction<readonly GoodsData[]>>
	) =>
	() => {
		setRight(union(right, left, 'goodsCode'));
		setLeft([]);
	};

const handleCheckedRight =
	(
		right: readonly GoodsData[],
		left: readonly GoodsData[],
		checked: readonly GoodsData[],
		leftChecked: readonly GoodsData[],
		setRight: Dispatch<SetStateAction<readonly GoodsData[]>>,
		setLeft: Dispatch<SetStateAction<readonly GoodsData[]>>,
		setChecked: Dispatch<SetStateAction<readonly GoodsData[]>>,
		dispatch: DispatchAction<AnyAction>
	) =>
	() => {
		const duplicates = intersectBy(right, leftChecked, 'goodsCode');
		if (duplicates.length > 0) {
			dispatch(
				toastMessage({
					message: '중복된 값이 존재합니다',
					type: 'info',
				})
			);
		}
		setRight(union(right, leftChecked, 'goodsCode'));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

const handleCheckedLeft =
	(
		left: readonly GoodsData[],
		right: readonly GoodsData[],
		checked: readonly GoodsData[],
		rightChecked: readonly GoodsData[],
		setLeft: Dispatch<SetStateAction<readonly GoodsData[]>>,
		setRight: Dispatch<SetStateAction<readonly GoodsData[]>>,
		setChecked: Dispatch<SetStateAction<readonly GoodsData[]>>
	) =>
	() => {
		setLeft(union(left, rightChecked, 'goodsCode'));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

const handleAllLeft =
	(
		left: readonly GoodsData[],
		right: readonly GoodsData[],
		setLeft: Dispatch<SetStateAction<readonly GoodsData[]>>,
		setRight: Dispatch<SetStateAction<readonly GoodsData[]>>
	) =>
	() => {
		setLeft(union(left, right, 'goodsCode'));
		setRight([]);
	};

const handleSelect =
	(
		right: readonly GoodsData[],
		replaceField: (productData: readonly GoodsData[]) => void,
		handleClose: () => void
	) =>
	() => {
		replaceField(right);
		handleClose();
	};

export {
	handleCategoryChange,
	handleSearchClick,
	handleSearchOnChange,
	handleToggle,
	handleAllRight,
	handleCheckedRight,
	handleCheckedLeft,
	handleAllLeft,
	handleSelect,
};
