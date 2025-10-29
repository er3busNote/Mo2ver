import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import Api from '@api/index';
import { GoodsData, CategoryData } from '@/types/api';
import useDialogGoodsSelection from '@hooks/useDialogGoodsSelection';
import SearchInput from '@components/input/SearchInput';
import ButtonDialog from '@components/button/ButtonDialog';
import PageNavigator from '@components/pagination/PageNavigator';
import DialogPC from '../cmmn/DialogPC';
import {
	Box,
	Grid,
	Paper,
	Checkbox,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import {
	handleCategoryChange,
	handleSearchClick,
	handleSearchOnChange,
	handleToggle,
	handleAllRight,
	handleCheckedRight,
	handleCheckedLeft,
	handleAllLeft,
	handleSelect,
} from '@handler/dialog';
import { BannerGoodsDetailValues } from '@/types/admin/form';
import { includes } from 'lodash';

interface DialogProps {
	open: boolean;
	goods: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
	replaceField: (productData: readonly GoodsData[]) => void;
	handleClose: () => void;
	goodsSaveData: Array<BannerGoodsDetailValues>;
}

const DialogGoodsPC: FC<DialogProps> = ({
	open,
	goods,
	category,
	replaceField,
	handleClose,
	goodsSaveData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const {
		keyword,
		setKeyword,
		setGoodsName,
		largeCategoryCode,
		setLargeCategoryCode,
		mediumCategoryCode,
		setMediumCategoryCode,
		smallCategoryCode,
		setSmallCategoryCode,
		largeCategoryData,
		mediumCategoryData,
		smallCategoryData,
		goodsData,
		setPage,
		left,
		right,
		checked,
		setLeft,
		setRight,
		setChecked,
		leftChecked,
		rightChecked,
	} = useDialogGoodsSelection({ category, goods, goodsSaveData });

	const onLargeCategoryChange = handleCategoryChange(setLargeCategoryCode);
	const onMiddleCategoryChange = handleCategoryChange(setMediumCategoryCode);
	const onSmallCategoryChange = handleCategoryChange(setSmallCategoryCode);

	const searchClick = handleSearchClick(setGoodsName);
	const searchOnChange = handleSearchOnChange(setKeyword);

	const onToggle = handleToggle(checked, setChecked);
	const onAllRight = handleAllRight(right, left, setRight, setLeft);
	const onCheckedRight = handleCheckedRight(
		right,
		left,
		checked,
		leftChecked,
		setRight,
		setLeft,
		setChecked,
		dispatch
	);
	const onCheckedLeft = handleCheckedLeft(
		left,
		right,
		checked,
		rightChecked,
		setLeft,
		setRight,
		setChecked
	);
	const onAllLeft = handleAllLeft(left, right, setLeft, setRight);

	const onSelect = handleSelect(right, replaceField, handleClose);

	const selectForm: SxProps<Theme> = {
		width: 120,
		'.MuiInputLabel-shrink': {
			ml: 1,
			mt: 0.5,
		},
	};
	const selectLabel: SxProps<Theme> = {
		mt: -1,
		ml: 1,
		fontSize: { sm: '13px', lg: '14px' },
	};
	const selectInput: SxProps<Theme> = {
		'.MuiSelect-select': {
			py: 1.5,
			fontSize: { sm: '13px', lg: '14px' },
		},
	};
	const menuText: SxProps<Theme> = {
		fontSize: { sm: '13px', lg: '14px' },
	};

	const customList = (items: readonly GoodsData[]) => (
		<Paper sx={{ width: 250, height: 230, overflow: 'auto' }}>
			<List dense component="div" role="list">
				{items.map((value: GoodsData, index: number) => {
					const labelId = `transfer-list-item-${value.goodsCode}-label`;

					return (
						<ListItemButton
							key={index}
							role="listitem"
							onClick={onToggle(value)}
							sx={{ py: 0 }}
						>
							<ListItemIcon>
								<Checkbox
									checked={includes(checked, value)}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value.goodsCode} />
							<ListItemText
								id={labelId}
								primaryTypographyProps={{
									style: {
										width: '45px',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflowX: 'hidden',
									},
								}}
								primary={value.goodsName}
							/>
						</ListItemButton>
					);
				})}
			</List>
		</Paper>
	);
	return (
		<DialogPC
			title={'상품찾기'}
			open={open}
			handleSelect={onSelect}
			handleClose={handleClose}
		>
			<Box sx={{ pt: 1, pb: 0.5, display: 'flex', justifyContent: 'center' }}>
				<Box sx={{ px: 1 }}>
					<FormControl sx={selectForm}>
						<InputLabel sx={selectLabel}>대분류</InputLabel>
						<Select
							label="대분류"
							defaultValue=""
							value={largeCategoryCode}
							onChange={onLargeCategoryChange}
							sx={selectInput}
						>
							{largeCategoryData?.map((data: CategoryData, i: number) => (
								<MenuItem key={i} sx={menuText} value={data.categoryCode}>
									{data.categoryName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ px: 1 }}>
					<FormControl sx={selectForm}>
						<InputLabel sx={selectLabel}>중분류</InputLabel>
						<Select
							label="중분류"
							defaultValue=""
							value={mediumCategoryCode}
							onChange={onMiddleCategoryChange}
							sx={selectInput}
							disabled={(mediumCategoryData ?? []).length === 0}
						>
							{mediumCategoryData?.map((data: CategoryData, i: number) => (
								<MenuItem key={i} sx={menuText} value={data.categoryCode}>
									{data.categoryName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ px: 1 }}>
					<FormControl sx={selectForm}>
						<InputLabel sx={selectLabel}>소분류</InputLabel>
						<Select
							label="소분류"
							defaultValue=""
							value={smallCategoryCode}
							onChange={onSmallCategoryChange}
							sx={selectInput}
							disabled={(smallCategoryData ?? []).length === 0}
						>
							{smallCategoryData?.map((data: CategoryData, i: number) => (
								<MenuItem key={i} sx={menuText} value={data.categoryCode}>
									{data.categoryName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</Box>
			<Box sx={{ pt: 0.5, pb: 1, display: 'flex', justifyContent: 'center' }}>
				<SearchInput
					placeholder="상품명을 검색할 수 있어요!"
					onChange={searchOnChange}
				/>
				<ButtonDialog
					buttonType="search"
					device="pc"
					variant="outlined"
					onClick={() => searchClick(keyword)}
				>
					검색
				</ButtonDialog>
			</Box>
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				<Grid item>{customList(left)}</Grid>
				<Grid item>
					<Grid container direction="column" alignItems="center">
						<ButtonDialog
							buttonType="moveall"
							device="pc"
							variant="outlined"
							size="small"
							onClick={onAllRight}
							disabled={left.length === 0}
						>
							≫
						</ButtonDialog>
						<ButtonDialog
							buttonType="moveselected"
							device="pc"
							variant="outlined"
							size="small"
							onClick={onCheckedRight}
							disabled={leftChecked.length === 0}
						>
							&gt;
						</ButtonDialog>
						<ButtonDialog
							buttonType="moveselected"
							device="pc"
							variant="outlined"
							size="small"
							onClick={onCheckedLeft}
							disabled={rightChecked.length === 0}
						>
							&lt;
						</ButtonDialog>
						<ButtonDialog
							buttonType="moveall"
							device="pc"
							variant="outlined"
							size="small"
							onClick={onAllLeft}
							disabled={right.length === 0}
						>
							≪
						</ButtonDialog>
					</Grid>
				</Grid>
				<Grid item>{customList(right)}</Grid>
			</Grid>
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				{goodsData?.totalPages && (
					<PageNavigator count={goodsData.totalPages} setPage={setPage} />
				)}
			</Box>
		</DialogPC>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	goods: bindActionCreators(Api.goods, dispatch),
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(null, mapDispatchToProps)(DialogGoodsPC);
