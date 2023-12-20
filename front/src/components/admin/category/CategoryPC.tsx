import React, { FC, useState, useEffect, BaseSyntheticEvent } from 'react';
import { Box, Paper, SvgIcon, Collapse, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import CategoryForm from '../../../components/form/admin/CategoryForm';
import { CategoryData } from '../../../services/types';
import { CategoryFormValues } from '../../../components/form/admin/types';

interface CategoryProps {
	onSubmit: (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
	categoryData: Array<CategoryData>;
}

interface CategoryDataInfo {
	[key: string]: Array<CategoryData>;
}

interface StyledTreeItemProps extends TreeItemProps {
	labelText: string;
}

const MinusSquare: FC<SvgIconProps> = (props: any) => {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
		</SvgIcon>
	);
};

const PlusSquare: FC<SvgIconProps> = (props: any) => {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
		</SvgIcon>
	);
};

const CloseSquare: FC<SvgIconProps> = (props: any) => {
	return (
		<SvgIcon
			className="close"
			fontSize="inherit"
			style={{ width: 14, height: 14 }}
			{...props}
		>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
		</SvgIcon>
	);
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
	[`& .${treeItemClasses.iconContainer}`]: {
		'& .close': {
			opacity: 0.3,
		},
	},
	[`& .${treeItemClasses.group}`]: {
		marginLeft: 15,
		paddingLeft: 18,
		borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
	},
}));

const StyledTreeItem: FC<StyledTreeItemProps> = ({
	labelText,
	...other
}): JSX.Element => {
	return (
		<StyledTreeItemRoot
			label={
				<Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
					<Typography
						variant="body2"
						sx={{
							pl: 2,
							fontWeight: 'inherit',
							flexGrow: 1,
							textAlign: 'left',
						}}
					>
						{labelText}
					</Typography>
				</Box>
			}
			TransitionComponent={Collapse}
			{...other}
		/>
	);
};

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
		const largeCategoyData = categoryData.filter(
			(data) => data.categoryLevel === 1 && data.useYesNo === 'Y'
		);
		setLargeCategoyData(largeCategoyData);
		// 중/소 카테고리
		const middleCategoyData = new Object() as CategoryDataInfo;
		const smallCategoyData = new Object() as CategoryDataInfo;
		categoryData.forEach((data) => {
			if (data.categoryLevel === 2) {
				if (!Object.keys(middleCategoyData).includes(data.upperCategoryCode)) {
					middleCategoyData[data.upperCategoryCode] = new Array<CategoryData>();
				}
				middleCategoyData[data.upperCategoryCode].push(data);
			} else if (data.categoryLevel === 3) {
				if (!Object.keys(smallCategoyData).includes(data.upperCategoryCode)) {
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
											Object.keys(middleCategoyData).includes(
												ldata.categoryCode
											) &&
											middleCategoyData[ldata.categoryCode].map(
												(mdata: CategoryData, m: number) => (
													<StyledTreeItem
														key={m}
														nodeId={mdata.categoryCode}
														labelText={mdata.categoryName}
													>
														{smallCategoyData &&
															Object.keys(smallCategoyData).includes(
																mdata.categoryCode
															) &&
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
