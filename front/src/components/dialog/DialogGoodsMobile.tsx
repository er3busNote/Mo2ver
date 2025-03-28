import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { GoodsData, CategoryData } from '@api/types';
import useCategoryInfo from '@hooks/category/useCategoryInfo';
import useGoodsSearchPageList from '@hooks/goods/useGoodsSearchPageList';
import SearchInput from '../input/SearchInput';
import ButtonDialog from '../button/ButtonDialog';
import {
	Box,
	Grid,
	Paper,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	InputLabel,
	FormControl,
	Pagination,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { isMobile } from 'react-device-detect';

interface DialogProps {
	open: boolean;
	goods: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
	replaceField: (productData: readonly GoodsData[]) => void;
	handleClose: () => void;
	header: SxProps<Theme>;
	base: SxProps<Theme>;
}

const DialogGooodsMobile: FC<DialogProps> = ({
	open,
	goods,
	category,
	replaceField,
	handleClose,
	header,
	base,
}): JSX.Element => {
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

	useEffect(() => {
		setLeft(goodsData.content ?? []);
		setRight([]);
	}, [goodsData]);

	useEffect(() => {
		if (
			!mediumCategoryData
				.map((data: CategoryData) => data.categoryCode)
				.includes(mediumCategoryCode)
		) {
			setMediumCategoryCode(
				mediumCategoryData.length > 0 ? mediumCategoryData[0].categoryCode : ''
			);
		}
		if (
			!smallCategoryData
				.map((data: CategoryData) => data.categoryCode)
				.includes(smallCategoryCode)
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
	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	const not = (a: readonly GoodsData[], b: readonly GoodsData[]) => {
		return a.filter((value) => b.indexOf(value) === -1);
	};
	const intersection = (a: readonly GoodsData[], b: readonly GoodsData[]) => {
		return a.filter((value) => b.indexOf(value) !== -1);
	};

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value: GoodsData) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};
	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};
	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};
	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};
	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	const handleSelect = () => {
		replaceField(right);
		handleClose();
	};

	const checkBox: SxProps<Theme> = {
		minWidth: '42px',
		'& .MuiSvgIcon-root': {
			fontSize: 18,
		},
	};
	const selectForm: SxProps<Theme> = {
		width: 90,
		'.MuiInputLabel-shrink': {
			ml: 1,
			mt: 0.5,
		},
		overflowX: 'visible',
	};
	const selectLabel: SxProps<Theme> = {
		mt: -1,
		ml: 1,
		fontSize: { xs: '11px', sm: '12px' },
	};
	const selectInput: SxProps<Theme> = {
		'.MuiSelect-select': {
			py: 1,
			fontSize: { xs: '11px', sm: '12px' },
		},
	};
	const menuText: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '13px' },
		minHeight: '30px',
	};

	const customList = (items: readonly GoodsData[]) => (
		<Paper sx={{ width: 210, height: 180, overflow: 'auto' }}>
			<List dense component="div" role="list">
				{items.map((value: GoodsData, index: number) => {
					const labelId = `transfer-list-item-${value.goodsCode}-label`;

					return (
						<ListItemButton
							key={index}
							role="listitem"
							onClick={handleToggle(value)}
							sx={{ px: 0.5, py: 0 }}
						>
							<ListItemIcon sx={{ minWidth: '42px' }}>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									sx={checkBox}
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText
								id={labelId}
								primaryTypographyProps={{
									style: { fontSize: 14 },
								}}
								primary={value.goodsCode}
							/>
							<ListItemText
								id={labelId}
								primaryTypographyProps={{
									style: {
										width: '45px',
										fontSize: 14,
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
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle sx={header}>상품찾기</DialogTitle>
			<DialogContent sx={{ pb: 0 }}>
				<Box sx={base}>
					<Box sx={{ pb: 0.5, display: 'flex', justifyContent: 'center' }}>
						<Box sx={{ pt: 1, px: 0.5 }}>
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
						<Box sx={{ pt: 1, px: 0.5 }}>
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
						<Box sx={{ pt: 1, px: 0.5 }}>
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
					<Box
						sx={{ pt: 0.5, pb: 1, display: 'flex', justifyContent: 'center' }}
					>
						<SearchInput
							placeholder="상품명을 검색할 수 있어요!"
							onChange={searchOnChange}
						/>
						<ButtonDialog
							buttonType="search"
							device="mobile"
							variant="outlined"
							onClick={() => searchClick(keyword)}
						>
							검색
						</ButtonDialog>
					</Box>
					<Grid
						container
						spacing={2}
						justifyContent="center"
						alignItems="center"
						sx={{
							display: isMobile ? 'grid' : 'flex',
							width: isMobile ? '100%' : '316px',
						}}
					>
						<Grid item>{customList(left)}</Grid>
						<Grid item sx={{ pl: isMobile ? '4px !important' : '12px' }}>
							<Grid
								container
								direction={isMobile ? 'row-reverse' : 'column'}
								alignItems="center"
								justifyContent="center"
							>
								<ButtonDialog
									buttonType="moveall"
									device="mobile"
									variant="outlined"
									size="small"
									onClick={handleAllRight}
									disabled={left.length === 0}
								>
									≫
								</ButtonDialog>
								<ButtonDialog
									buttonType="moveselected"
									device="mobile"
									variant="outlined"
									size="small"
									onClick={handleCheckedRight}
									disabled={leftChecked.length === 0}
								>
									&gt;
								</ButtonDialog>
								<ButtonDialog
									buttonType="moveselected"
									device="mobile"
									variant="outlined"
									size="small"
									onClick={handleCheckedLeft}
									disabled={rightChecked.length === 0}
								>
									&lt;
								</ButtonDialog>
								<ButtonDialog
									buttonType="moveall"
									device="mobile"
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
							<Pagination
								count={goodsData.totalPages - 1}
								variant="outlined"
								color="primary"
								siblingCount={2}
								boundaryCount={2}
								hidePrevButton
								hideNextButton
								onChange={pageChange}
								size="small"
							/>
						)}
					</Box>
				</Box>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<ButtonDialog
					buttonType="select"
					device="mobile"
					variant="outlined"
					onClick={handleSelect}
				>
					선택
				</ButtonDialog>
				<ButtonDialog
					buttonType="cancel"
					device="mobile"
					variant="outlined"
					onClick={handleClose}
				>
					취소
				</ButtonDialog>
			</DialogActions>
		</Dialog>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	goods: bindActionCreators(Api.goods, dispatch),
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(null, mapDispatchToProps)(DialogGooodsMobile);
