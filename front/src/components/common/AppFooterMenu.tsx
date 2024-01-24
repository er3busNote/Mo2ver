import React, {
	FC,
	useState,
	Dispatch,
	SetStateAction,
	SyntheticEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	changeTitle,
	changeDescription,
	changePrevDescription,
	changeNext,
	menuActive,
} from '../../store/index';
import {
	Box,
	Drawer,
	Toolbar,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import { CategoryData, CategoryDataGroup } from '../../services/types';
import { styled } from '@mui/material/styles';
import { TreeView } from '@mui/x-tree-view/TreeView';
import {
	TreeItem,
	TreeItemProps,
	treeItemClasses,
} from '@mui/x-tree-view/TreeItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

declare module 'react' {
	interface CSSProperties {
		'--tree-view-color'?: string;
		'--tree-view-bg-color'?: string;
	}
}

interface AppFooterMenuProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	width: number;
	description: string;
	categoryData: CategoryDataGroup;
}

interface StyledTreeItemProps extends TreeItemProps {
	bgColor?: string;
	color?: string;
	labelInfo?: string;
	labelText: string;
}

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
	color: theme.palette.text.secondary,
	[`& .${treeItemClasses.content}`]: {
		color: theme.palette.text.secondary,
		borderTopRightRadius: theme.spacing(2),
		borderBottomRightRadius: theme.spacing(2),
		paddingRight: theme.spacing(2), // 메인/서브 메뉴 Padding Left 간격 조정
		fontWeight: theme.typography.fontWeightMedium,
		'&.Mui-expanded': {
			fontWeight: theme.typography.fontWeightRegular,
		},
		'&:hover': {
			backgroundColor: theme.palette.action.hover,
		},
		'&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
			backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
			color: 'var(--tree-view-color)',
		},
		[`& .${treeItemClasses.label}`]: {
			fontWeight: 'inherit',
			color: 'inherit',
		},
	},
	[`& .${treeItemClasses.group}`]: {
		marginLeft: 0,
		[`& .${treeItemClasses.content}`]: {
			paddingLeft: theme.spacing(4), // 서브 메뉴 Padding Left 간격 조정
		},
	},
}));

const StyledTreeItem: FC<StyledTreeItemProps> = ({
	bgColor,
	color,
	labelInfo,
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
					<Typography variant="caption" color="inherit">
						{labelInfo}
					</Typography>
				</Box>
			}
			style={{
				'--tree-view-color': color,
				'--tree-view-bg-color': bgColor,
			}}
			{...other}
		/>
	);
};

const AppFooterMenu: FC<AppFooterMenuProps> = ({
	open,
	setOpen,
	width,
	description,
	categoryData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const largeCategoyData = categoryData.largeCategoyData;
	const middleCategoyData = categoryData.middleCategoyData;
	const smallCategoyData = categoryData.smallCategoyData;

	const [expanded, setExpanded] = useState<string[]>([]);
	const [selected, setSelected] = useState<string>('');

	const handleToggle = (event: SyntheticEvent, nodeIds: string[]) => {
		setExpanded(nodeIds);
	};

	const handleSelect = (event: SyntheticEvent, nodeIds: string) => {
		setSelected(nodeIds);
	};

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const activeMenuClick = (
		title: string,
		code: string,
		type: string,
		check: boolean | undefined
	) => {
		if (!check) {
			dispatch(changeTitle(title));
			dispatch(changeDescription(title));
			dispatch(changePrevDescription(description));
			dispatch(changeNext());
			dispatch(menuActive(`/goods/${type}/${code}`));
			navigate(`/goods/${type}/${code}`);
		}
	};

	return (
		<Drawer
			variant="temporary"
			open={open}
			onClose={toggleDrawer}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
			sx={{
				'& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
			}}
		>
			<Toolbar
				sx={{
					position: 'fixed',
					alignItems: 'center',
					transform: `translateX(${width - 22}px)`,
					transition: 'transform .2s ease-in-out',
				}}
			>
				<IconButton
					sx={{
						bgcolor: '#363658',
						borderRadius: 'inherit',
						width: '18px',
						'&:hover': {
							bgcolor: '#757595',
						},
					}}
					onClick={toggleDrawer}
				>
					<ChevronLeftIcon color="disabled" />
				</IconButton>
			</Toolbar>
			<Box sx={{ mt: 2, mb: 1 }}>
				<Box>
					<Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
						카테고리
					</Typography>
				</Box>
			</Box>
			<Divider
				variant="middle"
				sx={{ mb: 2, height: '2px', borderColor: 'primary.main' }}
			/>
			<Box>
				<TreeView
					aria-label="menu"
					defaultExpanded={['1']}
					defaultCollapseIcon={<ArrowDropDownIcon />}
					defaultExpandIcon={<ArrowRightIcon />}
					defaultEndIcon={<div style={{ width: 24 }} />}
					sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
					expanded={expanded}
					selected={selected}
					onNodeToggle={handleToggle}
					onNodeSelect={handleSelect}
				>
					{largeCategoyData.map((ldata: CategoryData, index: number) => {
						return (
							<StyledTreeItem
								key={index}
								nodeId={ldata.categoryCode}
								labelText={ldata.categoryName}
								bgColor={'#fafafa'}
								onClick={() =>
									activeMenuClick(
										ldata.categoryName,
										ldata.categoryCode,
										'L',
										middleCategoyData &&
											Object.keys(middleCategoyData).includes(
												ldata.categoryCode
											)
									)
								}
							>
								{middleCategoyData &&
									Object.keys(middleCategoyData).includes(ldata.categoryCode) &&
									middleCategoyData[ldata.categoryCode].map(
										(mdata: CategoryData, i: number) => {
											return (
												<StyledTreeItem
													key={i}
													nodeId={mdata.categoryCode}
													labelText={mdata.categoryName}
													bgColor={'#fafafa'}
													onClick={() =>
														activeMenuClick(
															mdata.categoryName,
															mdata.categoryCode,
															'M',
															smallCategoyData &&
																Object.keys(smallCategoyData).includes(
																	mdata.categoryCode
																)
														)
													}
												>
													{smallCategoyData &&
														Object.keys(smallCategoyData).includes(
															mdata.categoryCode
														) &&
														smallCategoyData[mdata.categoryCode].map(
															(sdata: CategoryData, j: number) => {
																return (
																	<StyledTreeItem
																		key={j}
																		nodeId={sdata.categoryCode}
																		labelText={sdata.categoryName}
																		bgColor={'#fafafa'}
																		onClick={() =>
																			activeMenuClick(
																				sdata.categoryName,
																				sdata.categoryCode,
																				'S',
																				false
																			)
																		}
																	/>
																);
															}
														)}
												</StyledTreeItem>
											);
										}
									)}
							</StyledTreeItem>
						);
					})}
				</TreeView>
			</Box>
		</Drawer>
	);
};

export default AppFooterMenu;
