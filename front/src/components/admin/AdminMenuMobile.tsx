import React, {
	FC,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	SyntheticEvent,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { SubMenuInfo, MenuState, TitleState } from '../../store/types';
import {
	changeTitle,
	changeDescription,
	changePrevTitle,
	changePrevDescription,
	changeNext,
	menuActive,
} from '../../store/index';
import {
	Box,
	Grow, // Transitions
	Drawer,
	Toolbar,
	Divider,
	IconButton,
	Typography,
	ListItemButton,
	ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { TreeView } from '@mui/x-tree-view/TreeView';
import {
	TreeItem,
	TreeItemProps,
	treeItemClasses,
} from '@mui/x-tree-view/TreeItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CategoryIcon from '@mui/icons-material/Category';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';

const AdminIcon = [
	MenuOpenIcon,
	ViewCarouselIcon,
	CategoryIcon,
	ViewInArIcon,
	InfoIcon,
	ForumIcon,
];

declare module 'react' {
	interface CSSProperties {
		'--tree-view-color'?: string;
		'--tree-view-bg-color'?: string;
	}
}

interface AdminMenuProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	width: number;
	menus?: Array<SubMenuInfo>;
	title: string;
	description: string;
}

interface StyledTreeItemProps extends TreeItemProps {
	bgColor?: string;
	color?: string;
	labelIcon: React.ElementType<SvgIconProps>;
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
	labelIcon: LabelIcon,
	labelInfo,
	labelText,
	...other
}): JSX.Element => {
	return (
		<StyledTreeItemRoot
			label={
				<Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
					<Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
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

const AdminMenuMobile: FC<AdminMenuProps> = ({
	open,
	setOpen,
	width,
	menus,
	title,
	description,
}): JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [expanded, setExpanded] = useState<string[]>([]);
	const [selected, setSelected] = useState<string>('');

	useEffect(() => {
		if (location.pathname === '/admin') {
			dispatch(changeTitle('대시보드'));
			dispatch(changeDescription(''));
		}
	}, [location.pathname]);

	const handleToggle = (event: SyntheticEvent, nodeIds: string[]) => {
		setExpanded(nodeIds);
	};

	const handleSelect = (event: SyntheticEvent, nodeIds: string) => {
		setSelected(nodeIds);
	};

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const openMenuClick = (path: string, index: number) => {
		dispatch(menuActive(path)); // 1. close → open : 해당 Root 메뉴를 Active(활성화)
		setExpanded([String(index)]);
		setSelected(String(index));
		setOpen(!open);
	};

	const activeMenuClick = (
		nextTitle: string,
		nextDescription: string,
		path: string
	) => {
		dispatch(changeTitle(nextTitle));
		dispatch(changeDescription(nextDescription));
		dispatch(changePrevTitle(title));
		dispatch(changePrevDescription(description));
		dispatch(changeNext());
		dispatch(menuActive(path)); // 2. open → close : 해당 Root 메뉴를 Active(활성화)
		navigate('/admin' + path);
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
						관리 메뉴
					</Typography>
				</Box>
			</Box>
			<Divider
				variant="middle"
				sx={{ mb: 2, height: '2px', borderColor: 'primary.main' }}
			/>
			<Box sx={{ display: 'none' }}>
				{menus &&
					menus.map((menu: SubMenuInfo) => {
						const IconComponent = AdminIcon[menu.index - 1];
						return (
							<Grow
								key={menu.index}
								in={!open && menu.isShow}
								appear={menu.isShow}
								timeout={menu.index * 300}
							>
								<ListItemButton
									selected={menu.isActive}
									onClick={() => openMenuClick(menu.path, menu.index)}
								>
									<ListItemIcon>
										<IconComponent fontSize="small" color="disabled" />
									</ListItemIcon>
								</ListItemButton>
							</Grow>
						);
					})}
			</Box>
			<Box sx={{ display: 'block' }}>
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
					{menus &&
						menus.map((menu: SubMenuInfo) => {
							return (
								<StyledTreeItem
									key={menu.index}
									nodeId={String(menu.index)}
									labelText={menu.description}
									labelIcon={AdminIcon[menu.index - 1]}
								>
									{menu.subMenu &&
										menu.subMenu.map((submenu: SubMenuInfo) => {
											return (
												<StyledTreeItem
													key={submenu.index}
													nodeId={String(submenu.index)}
													labelText={submenu.description}
													labelIcon={AdminIcon[submenu.index - 1]}
													// labelInfo={String(submenu.count).replace(
													// 	/(.)(?=(\d{3})+$)/g,
													// 	'$1,'
													// )}
													color={submenu.color}
													bgColor={submenu.bgColor}
													onClick={() =>
														activeMenuClick(
															menu.description,
															submenu.description,
															menu.path
														)
													}
												/>
											);
										})}
								</StyledTreeItem>
							);
						})}
				</TreeView>
			</Box>
		</Drawer>
	);
};

const mapStateToProps = (state: any) => ({
	menus: (state.menu as MenuState).menus,
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(AdminMenuMobile);
