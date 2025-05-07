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
import { menuActive } from '@store/index';
import { TitleState, SubMenuInfo, MenuState } from '@store/types';
import {
	Box,
	Grow,
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
import {
	ArrowDropDown as ArrowDropDownIcon,
	ArrowRight as ArrowRightIcon,
	ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import goToMenu from '@navigate/menu/goToMenu';
import goToMenuNone from '@navigate/menu/goToMenuNone';
import { AdminIcon, AdminColor, AdminBgColor } from '@utils/init';

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
			goToMenuNone({
				title: '대시보드',
				description: '',
				prevTitle: '대시보드',
				prevDescription: '',
				dispatch,
			});
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

	const openMenuClick = (path: string, code: string) => {
		dispatch(menuActive(path));
		setExpanded([code]);
		setSelected(code);
		setOpen(!open);
	};

	const activeMenuClick = (
		nextTitle: string,
		nextDescription: string,
		path: string
	) => {
		goToMenu({
			title: nextTitle,
			description: nextDescription,
			prevTitle: title,
			prevDescription: description,
			path: '/admin' + path,
			dispatch,
			navigate,
		});
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
					menus.map((menu: SubMenuInfo, index: number) => {
						const IconComponent = AdminIcon[index];
						return (
							<Grow key={index} in={!open} timeout={(index + 1) * 300}>
								<ListItemButton
									selected={menu.isActive}
									onClick={() => openMenuClick(menu.path, menu.code)}
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
						menus.map((menu: SubMenuInfo, i: number) => {
							return (
								<StyledTreeItem
									key={i}
									nodeId={menu.code}
									labelText={menu.name}
									labelIcon={AdminIcon[i]}
								>
									{menu.subMenu &&
										menu.subMenu.map((submenu: SubMenuInfo, j: number) => {
											return (
												<StyledTreeItem
													key={j}
													nodeId={submenu.code}
													labelText={submenu.name}
													labelIcon={AdminIcon[i + j + 3]}
													// labelInfo={String(submenu.count).replace(
													// 	/(.)(?=(\d{3})+$)/g,
													// 	'$1,'
													// )}
													color={AdminColor[i + j]}
													bgColor={AdminBgColor[i + j]}
													onClick={() =>
														activeMenuClick(menu.name, submenu.name, menu.path)
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
