import React, { FC, useState, useEffect } from 'react';
import StyledTreeItem from '@components/tree/StyledTreeItem';
import { MinusSquare, PlusSquare, CloseSquare } from '@components/icon/SvgIcon';
import { Box, Paper } from '@mui/material';
import { TreeView } from '@mui/x-tree-view/TreeView';
import CategoryForm from './CategoryForm';
import { CategoryData } from '@/types/api';
import { CategoryProps } from '@/types/admin/category';
import { has, filter } from 'lodash';

interface CategoryDataInfo {
	[key: string]: Array<CategoryData>;
}

const CategoryPC: FC<CategoryProps> = ({
	onSubmit,
	categoryData,
}): JSX.Element => {
	const [largeCategoyData, setLargeCategoyData] = useState<Array<CategoryData>>(
		[]
	);
	const [middleCategoyData, setMiddleCategoyData] =
		useState<CategoryDataInfo>();
	const [smallCategoyData, setSmallCategoyData] = useState<CategoryDataInfo>();

	// → Transform Tree from DB Format to JSON Format in JAVASCRIPT
	const treeCategoryData = () => {
		// 대 카테고리
		const largeCategoyData = filter(categoryData, {
			categoryLevel: 1,
			useYesNo: 'Y',
		});
		setLargeCategoyData(largeCategoyData);
		// 중/소 카테고리
		const middleCategoyData = new Object() as CategoryDataInfo;
		const smallCategoyData = new Object() as CategoryDataInfo;
		categoryData.forEach((data) => {
			if (data.categoryLevel === 2) {
				if (!has(middleCategoyData, data.upperCategoryCode)) {
					middleCategoyData[data.upperCategoryCode] = new Array<CategoryData>();
				}
				middleCategoyData[data.upperCategoryCode].push(data);
			} else if (data.categoryLevel === 3) {
				if (!has(smallCategoyData, data.upperCategoryCode)) {
					smallCategoyData[data.upperCategoryCode] = new Array<CategoryData>();
				}
				smallCategoyData[data.upperCategoryCode].push(data);
			}
		});
		setMiddleCategoyData(middleCategoyData);
		setSmallCategoyData(smallCategoyData);
	};
	useEffect(treeCategoryData, [categoryData]); // categoryData가 변경될 때만 실행..!

	return (
		<Box sx={{ display: 'flex' }}>
			<Box sx={{ py: 2, pl: 4, pr: 2, width: '40%' }}>
				<Paper component="div" square variant="outlined">
					<Box
						sx={{
							py: 2,
							color: '#fff',
							bgcolor: '#737395',
							fontSize: '0.8rem',
							fontWeight: 'bold',
						}}
					>
						카테고리 선택
					</Box>
					<Box sx={{ p: 4 }}>
						<TreeView
							aria-label="customized"
							defaultExpanded={['1']}
							defaultCollapseIcon={<MinusSquare />}
							defaultExpandIcon={<PlusSquare />}
							defaultEndIcon={<CloseSquare />}
							sx={{
								height: 400,
								flexGrow: 1,
								maxWidth: 400,
								overflowY: 'auto',
							}}
						>
							<StyledTreeItem nodeId="ALL" labelText="모든 카테고리">
								{largeCategoyData.map((ldata: CategoryData, l: number) => (
									<StyledTreeItem
										key={l}
										nodeId={ldata.categoryCode}
										labelText={ldata.categoryName}
									>
										{middleCategoyData &&
											has(middleCategoyData, ldata.categoryCode) &&
											middleCategoyData[ldata.categoryCode].map(
												(mdata: CategoryData, m: number) => (
													<StyledTreeItem
														key={m}
														nodeId={mdata.categoryCode}
														labelText={mdata.categoryName}
													>
														{smallCategoyData &&
															has(smallCategoyData, mdata.categoryCode) &&
															smallCategoyData[mdata.categoryCode].map(
																(sdata: CategoryData, s: number) => (
																	<StyledTreeItem
																		key={s}
																		nodeId={sdata.categoryCode}
																		labelText={sdata.categoryName}
																	></StyledTreeItem>
																)
															)}
													</StyledTreeItem>
												)
											)}
									</StyledTreeItem>
								))}
							</StyledTreeItem>
						</TreeView>
					</Box>
				</Paper>
			</Box>
			<Box sx={{ py: 2, pl: 2, pr: 4, width: '60%' }}>
				<Paper component="div" square variant="outlined">
					<Box
						sx={{
							py: 2,
							color: '#fff',
							bgcolor: '#737395',
							fontSize: '0.8rem',
							fontWeight: 'bold',
						}}
					>
						카테고리 추가
					</Box>
					<Box sx={{ p: 4 }}>
						<CategoryForm onSubmit={onSubmit} />
					</Box>
				</Paper>
			</Box>
		</Box>
	);
};

export default CategoryPC;
