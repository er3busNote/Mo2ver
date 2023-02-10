import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import {
	Box,
	Drawer as MuiDrawer,
	DrawerProps as MuiDrawerProps,
	Toolbar,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

declare module 'react' {
	interface CSSProperties {
		'--tree-view-color'?: string;
		'--tree-view-bg-color'?: string;
	}
}

interface DrawerProps extends MuiDrawerProps {
	open?: boolean;
	width: number;
}

interface AdminMenuProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	width: number;
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
		paddingRight: theme.spacing(1),
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
			paddingLeft: theme.spacing(2),
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
						sx={{ fontWeight: 'inherit', flexGrow: 1 }}
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

const AdminMenu: FC<AdminMenuProps> = ({
	open,
	setOpen,
	width,
}): JSX.Element => {
	const [branch, setBranch] = useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
		setBranch(true); // Init 설정
	};

	return (
		<Drawer variant="permanent" open={open} width={width}>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					p: [1.2], // Toolbar Icon 간격 조정
				}}
			>
				<IconButton onClick={toggleDrawer}>
					<ChevronLeftIcon color="disabled" />
				</IconButton>
			</Toolbar>
			<Divider
				variant="middle"
				sx={{ height: '2px', borderColor: 'primary.main' }}
			/>
			<TreeView
				aria-label="gmail"
				defaultExpanded={['3']}
				defaultCollapseIcon={<ArrowDropDownIcon />}
				defaultExpandIcon={<ArrowRightIcon />}
				defaultEndIcon={<div style={{ width: 24 }} />}
				sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
			>
				<StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
				<StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
				<StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
					<StyledTreeItem
						nodeId="5"
						labelText="Social"
						labelIcon={SupervisorAccountIcon}
						labelInfo="90"
						color="#1a73e8"
						bgColor="#e8f0fe"
					/>
					<StyledTreeItem
						nodeId="6"
						labelText="Updates"
						labelIcon={InfoIcon}
						labelInfo="2,294"
						color="#e3742f"
						bgColor="#fcefe3"
					/>
					<StyledTreeItem
						nodeId="7"
						labelText="Forums"
						labelIcon={ForumIcon}
						labelInfo="3,566"
						color="#a250f5"
						bgColor="#f3e8fd"
					/>
					<StyledTreeItem
						nodeId="8"
						labelText="Promotions"
						labelIcon={LocalOfferIcon}
						labelInfo="733"
						color="#3c8039"
						bgColor="#e6f4ea"
					/>
				</StyledTreeItem>
				<StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} />
			</TreeView>
		</Drawer>
	);
};

export default AdminMenu;
