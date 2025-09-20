import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Paper, MenuList, MenuItem, ListItemText } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { CategoryData, CategoryDataInfo } from '@/types/api';
import goToGoodsCategory from '@navigate/goods/goToGoodsCategory';
import { menuWidthSize, submenuWidthSize } from '@utils/style';
import { has } from 'lodash';

interface AppMenuSubItemProps {
	title: string;
	description: string;
	divideData: Array<Array<CategoryData>>;
	middleCategoryData?: CategoryDataInfo;
	smallCategoryData?: CategoryDataInfo;
	hover: string;
}

const AppMenuSubItem: FC<AppMenuSubItemProps> = ({
	title,
	description,
	divideData,
	middleCategoryData,
	smallCategoryData,
	hover,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const menuClick = (nextTitle: string, code: string, type: string) => {
		goToGoodsCategory({
			code,
			type,
			title: nextTitle,
			description: nextTitle,
			prevTitle: title,
			prevDescription: description,
			dispatch,
			navigate,
		});
	};

	const submenu: SxProps<Theme> = {
		display:
			hover === '' || // → 처음 랜더링 시, 깜빡이는 현상 방지
			(middleCategoryData && !has(middleCategoryData, hover))
				? 'none'
				: 'inline-flex',
	};
	const overflowChildren: SxProps<Theme> = {
		overflowY: 'auto',
		position: 'relative',
	};
	const overflowTable: SxProps<Theme> = {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		//gap: 2,
		height: '100%',
		position: 'absolute',
	};
	const overflowContents: SxProps<Theme> = {
		textAlign: 'start',
		borderRadius: 0,
		paddingBottom: 2,
	};
	return (
		<Box sx={{ width: menuWidthSize, ...submenu, ...overflowChildren }}>
			<Paper sx={overflowTable}>
				{divideData.map((divide: Array<CategoryData>, k: number) => (
					<Paper
						key={k}
						id={'sub-menu'}
						sx={{ width: submenuWidthSize, ...overflowContents }}
					>
						{divide.map((mdata: CategoryData, i: number) => (
							<MenuList key={i} sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
								<MenuItem
									dense
									onClick={() =>
										menuClick(mdata.categoryName, mdata.categoryCode, 'M')
									}
									sx={{ px: '24px', py: '11px' }}
								>
									<ListItemText
										primaryTypographyProps={{
											style: { fontSize: 14, fontWeight: 'bold' },
										}}
										primary={mdata.categoryName}
									/>
								</MenuItem>
								{smallCategoryData &&
									has(smallCategoryData, mdata.categoryCode) &&
									smallCategoryData[mdata.categoryCode].map(
										(sdata: CategoryData, j: number) => (
											<MenuItem
												key={j}
												dense
												onClick={() =>
													menuClick(sdata.categoryName, sdata.categoryCode, 'S')
												}
												sx={{
													px: '24px',
													py: 0,
													minHeight: 5,
												}}
											>
												<ListItemText
													primaryTypographyProps={{
														style: { fontSize: 13 },
													}}
													primary={sdata.categoryName}
												/>
											</MenuItem>
										)
									)}
							</MenuList>
						))}
					</Paper>
				))}
			</Paper>
		</Box>
	);
};

export default AppMenuSubItem;
