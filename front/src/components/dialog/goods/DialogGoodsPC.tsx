import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { toastMessage } from '@store/index';
import Api from '@api/index';
import { GoodsData, CategoryData } from '@api/types';
import useCategoryInfo from '@hooks/category/useCategoryInfo';
import useGoodsSearchPageList from '@hooks/goods/useGoodsSearchPageList';
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
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { BannerGoodsDetailValues } from '@pages/admin/types';
import { not, intersect, intersectBy, union } from '@utils/set';
import { some, indexOf, includes } from 'lodash';

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
	const [keyword, setKeyword] = useState('');
	const [goodsName, setGoodsName] = useState<string>('');
	const [largeCategoryCode, setLargeCategoryCode] = useState<string>('');
	const [mediumCategoryCode, setMediumCategoryCode] = useState<string>('');
	const [smallCategoryCode, setSmallCategoryCode] = useState<string>('');
	const largeCategoryData = useCategoryInfo({ category, categoryLevel: 1 });
	const mediumCategoryData = useCategoryInfo({
		category,
		categoryLevel: 2,
		categoryInfo: largeCategoryCode,
	});
	const smallCategoryData = useCategoryInfo({
		category,
		categoryLevel: 3,
		categoryInfo: mediumCategoryCode,
	});
	const [goodsData, setPage] = useGoodsSearchPageList({
		goods,
		goodsName,
		largeCategoryCode,
		mediumCategoryCode,
		smallCategoryCode,
	});
	const [left, setLeft] = useState<readonly GoodsData[]>(
		goodsData.content ?? []
	);
	const [right, setRight] = useState<readonly GoodsData[]>([]);
	const [checked, setChecked] = useState<readonly GoodsData[]>([]);

	const leftChecked = intersect(checked, left);
	const rightChecked = intersect(checked, right);

	useEffect(() => {
		setLeft(goodsData.content ?? []);
		setRight(
			goodsSaveData
				? union(
						right,
						goodsSaveData.map((item: BannerGoodsDetailValues) => ({
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

	useEffect(() => {
		if (
			!some(
				mediumCategoryData,
				(data: CategoryData) => data.categoryCode === mediumCategoryCode
			)
		) {
			setMediumCategoryCode(
				mediumCategoryData.length > 0 ? mediumCategoryData[0].categoryCode : ''
			);
		}
		if (
			!some(
				smallCategoryData,
				(data: CategoryData) => data.categoryCode === smallCategoryCode
			)
		) {
			setSmallCategoryCode(
				smallCategoryData.length > 0 ? smallCategoryData[0].categoryCode : ''
			);
		}
	}, [
		mediumCategoryData,
		mediumCategoryCode,
		smallCategoryData,
		smallCategoryCode,
	]);

	const handleLargeCategoryChange = (event: SelectChangeEvent) => {
		setLargeCategoryCode(event.target.value as string);
	};
	const handleMiddleCategoryChange = (event: SelectChangeEvent) => {
		setMediumCategoryCode(event.target.value as string);
	};
	const handleSmallCategoryChange = (event: SelectChangeEvent) => {
		setSmallCategoryCode(event.target.value as string);
	};

	const searchClick = (goodsName: string) => {
		setGoodsName(goodsName);
	};
	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.currentTarget.value as string);
	};

	const handleToggle = (value: GoodsData) => () => {
		const currentIndex = indexOf(checked, value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};
	const handleAllRight = () => {
		setRight(union(right, left, 'goodsCode'));
		setLeft([]);
	};
	const handleCheckedRight = () => {
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
	const handleCheckedLeft = () => {
		setLeft(union(left, rightChecked, 'goodsCode'));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};
	const handleAllLeft = () => {
		setLeft(union(left, right, 'goodsCode'));
		setRight([]);
	};

	const handleSelect = () => {
		replaceField(right);
		handleClose();
	};

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
							onClick={handleToggle(value)}
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
			handleSelect={handleSelect}
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
							onChange={handleLargeCategoryChange}
							sx={selectInput}
						>
							{largeCategoryData.map((data: CategoryData, i: number) => (
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
							onChange={handleMiddleCategoryChange}
							sx={selectInput}
							disabled={mediumCategoryData.length === 0}
						>
							{mediumCategoryData.map((data: CategoryData, i: number) => (
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
							onChange={handleSmallCategoryChange}
							sx={selectInput}
							disabled={smallCategoryData.length === 0}
						>
							{smallCategoryData.map((data: CategoryData, i: number) => (
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
							onClick={handleAllRight}
							disabled={left.length === 0}
						>
							≫
						</ButtonDialog>
						<ButtonDialog
							buttonType="moveselected"
							device="pc"
							variant="outlined"
							size="small"
							onClick={handleCheckedRight}
							disabled={leftChecked.length === 0}
						>
							&gt;
						</ButtonDialog>
						<ButtonDialog
							buttonType="moveselected"
							device="pc"
							variant="outlined"
							size="small"
							onClick={handleCheckedLeft}
							disabled={rightChecked.length === 0}
						>
							&lt;
						</ButtonDialog>
						<ButtonDialog
							buttonType="moveall"
							device="pc"
							variant="outlined"
							size="small"
							onClick={handleAllLeft}
							disabled={right.length === 0}
						>
							≪
						</ButtonDialog>
					</Grid>
				</Grid>
				<Grid item>{customList(right)}</Grid>
			</Grid>
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				{goodsData.totalPages && (
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
