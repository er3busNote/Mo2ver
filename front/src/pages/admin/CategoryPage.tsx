import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import useCSRFToken from '../../hooks/useCSRFToken';
import { Box, Paper, SvgIcon, Collapse, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import CategoryForm from '../../components/form/admin/CategoryForm';
import { CategoryFormValues } from '../../components/form/admin/types';

interface CategoryDispatchProps {
	auth: ActionCreatorsMapObject;
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

const CategoryPage: FC<CategoryDispatchProps> = ({ auth }): JSX.Element => {
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	const submitForm = (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		fetchCSRFTokenData();
		const categoryData = {
			category: data.category,
			useyn: data.useyn,
			level: data.level,
		};
		console.log(categoryData);
		console.log(csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
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
							<StyledTreeItem nodeId="1" labelText="모든 카테고리">
								<StyledTreeItem nodeId="2" labelText="Hello" />
								<StyledTreeItem nodeId="3" labelText="Subtree with children">
									<StyledTreeItem nodeId="6" labelText="Hello" />
									<StyledTreeItem
										nodeId="7"
										labelText="Sub-subtree with children"
									>
										<StyledTreeItem nodeId="9" labelText="Child 1" />
										<StyledTreeItem nodeId="10" labelText="Child 2" />
										<StyledTreeItem nodeId="11" labelText="Child 3" />
									</StyledTreeItem>
									<StyledTreeItem nodeId="8" labelText="Hello" />
								</StyledTreeItem>
								<StyledTreeItem nodeId="4" labelText="World" />
								<StyledTreeItem nodeId="5" labelText="Something something" />
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
						<CategoryForm onSubmit={submitForm} />
					</Box>
				</Paper>
			</Box>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	auth: bindActionCreators(Api.auth, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoryPage);
