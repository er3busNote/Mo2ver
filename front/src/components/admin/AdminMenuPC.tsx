import React, {
	FC,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	ReactElement,
} from 'react';
import {
	useNavigate,
	useLocation,
	NavigationType,
	useNavigationType,
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { changeNext, menuActive } from '../../store/index';
import {
	TitleInfo,
	TitleState,
	SubMenuInfo,
	MenuState,
} from '../../store/types';
import {
	Box,
	Grow, // Transitions
	Slide, // Transitions
	Drawer as MuiDrawer,
	DrawerProps as MuiDrawerProps,
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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CategoryIcon from '@mui/icons-material/Category';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const AdminIcon = [
	MenuOpenIcon,
	ViewCarouselIcon,
	CategoryIcon,
	ViewInArIcon,
	InfoIcon,
	ForumIcon,
	ReceiptLongIcon,
];

declare module 'react' {
	interface CSSProperties {
		'--tree-view-color'?: string;
		'--tree-view-bg-color'?: string;
	}
}

interface DrawerProps extends MuiDrawerProps {
	open: boolean;
	width: number;
}

interface AdminMenuProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	width: number;
	menus?: Array<SubMenuInfo>;
	title: string;
	description: string;
}

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open, width }) => ({
	'& .MuiDrawer-paper': {
		paddingLeft: 5,
		paddingRight: 5,
		position: 'relative',
		whiteSpace: 'nowrap',
		width: width,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		...(!open && {
			paddingLeft: 0,
			paddingRight: 0,
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(9),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

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

interface SlideItemProps {
	branch: boolean;
	children?: ReactElement;
}

const SlideItem: FC<SlideItemProps> = ({ branch, children }): JSX.Element => {
	return (
		<Slide
			direction="right"
			in={branch}
			appear={branch}
			timeout={branch ? 200 : 0}
			mountOnEnter
			unmountOnExit
		>
			<Box>{children}</Box>
		</Slide>
	);
};

const AdminMenuPC: FC<AdminMenuProps> = ({
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
	const navType: NavigationType = useNavigationType();

	const [expanded, setExpanded] = useState<string[]>([]);
	const [selected, setSelected] = useState<string>('');

	useEffect(() => {
		if (location.pathname === '/admin' && navType !== 'POP') {
			const titleData: TitleInfo = {
				title: '대시보드',
				description: '',
				prevTitle: '대시보드',
				prevDescription: '',
			};
			dispatch(changeNext(titleData));
		}
	}, [location.pathname, navType]);

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
		const titleData: TitleInfo = {
			title: nextTitle,
			description: nextDescription,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive(path)); // 2. open → close : 해당 Root 메뉴를 Active(활성화)
		navigate('/admin' + path);
	};
	return (
		<Drawer variant="permanent" open={open} width={width}>
			<Toolbar
				sx={{
					position: 'fixed',
					alignItems: 'center',
					transform: `translateX(${open ? width - 24 : 35}px)`,
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
					{open ? (
						<ChevronLeftIcon color="disabled" />
					) : (
						<ChevronRightIcon color="disabled" />
					)}
				</IconButton>
			</Toolbar>
			<Box sx={{ mt: 2, mb: 1 }}>
				<SlideItem branch={!open}>
					<ManageAccountsIcon />
				</SlideItem>
				<SlideItem branch={open}>
					<Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
						관리 메뉴
					</Typography>
				</SlideItem>
			</Box>
			<Divider
				variant="middle"
				sx={{ mb: 2, height: '2px', borderColor: 'primary.main' }}
			/>
			<Box sx={{ display: open ? 'none' : 'block' }}>
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
			<Box sx={{ display: open ? 'block' : 'none' }}>
				<TreeView
					aria-label="menu"
					defaultExpanded={['1']}
					defaultCollapseIcon={<ArrowDropDownIcon />}
					defaultExpandIcon={<ArrowRightIcon />}
					defaultEndIcon={<div style={{ width: 24 }} />}
					sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
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

export default connect(mapStateToProps, null)(AdminMenuPC);
