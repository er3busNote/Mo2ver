import React, { FC, useState, MouseEvent, TouchEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { MenuState, SubMenuInfo } from '@/types/api';
import AppMenu from './AppMenu';
import {
	Box,
	Grid,
	List,
	Paper,
	Popper,
	Collapse,
	MenuList,
	MenuItem,
	IconButton,
	Typography,
	ListItemText,
} from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import {
	Menu as MenuIcon,
	ExpandLess as ExpandLess,
	ExpandMore as ExpandMore,
} from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material/styles';
import { CategoryData, CategoryDataGroup } from '@/types/api';
import goToGoodsCategory from '@navigate/goods/goToGoodsCategory';
import { useIsDesktop } from '@providers/MobileProvider';
import { has } from 'lodash';

interface AppMenuProps {
	title: string;
	description: string;
	categoryData: CategoryDataGroup;
	menus?: Array<SubMenuInfo>;
}

interface AppMenuItemProps {
	largeCategory: CategoryData;
	middleCategoyData?: CategoryDataInfo;
	menuClick: (title: string, code: string, type: string) => void;
}

interface CategoryDataInfo {
	[key: string]: Array<CategoryData>;
}

const AppMenuItem: FC<AppMenuItemProps> = ({
	largeCategory,
	middleCategoyData,
	menuClick,
}): JSX.Element => {
	const isDesktop = useIsDesktop();
	const [open, setOpen] = useState<boolean>(false);

	const targetData =
		middleCategoyData &&
		has(middleCategoyData, largeCategory.categoryCode) &&
		middleCategoyData[largeCategory.categoryCode];

	const handleClick = (
		event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
	) => {
		if (!targetData)
			menuClick(largeCategory.categoryName, largeCategory.categoryCode, 'L');
		setOpen(!open);
		if (isDesktop) event.stopPropagation(); // 새로고침 방지
		else event.nativeEvent.stopPropagation();
	};

	const handleTouchStart = (
		touch: boolean,
		event: TouchEvent<HTMLLIElement>
	) => {
		if (!targetData)
			menuClick(largeCategory.categoryName, largeCategory.categoryCode, 'L');
		if (isDesktop) event.preventDefault(); // 터치 이벤트의 기본 동작 막기
		else event.nativeEvent.stopPropagation();
		setOpen(touch);
	};

	const handleTouchEnd = (event: TouchEvent<HTMLLIElement>) => {
		event.nativeEvent.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	};
	return (
		<>
			<MenuItem
				sx={{ px: { xs: 3, sm: 4 }, py: { xs: 0, sm: 2 } }}
				onClick={(event) => handleClick(event)}
				onTouchStart={(event) => handleTouchStart(open, event)}
				onTouchEnd={(event) => handleTouchEnd(event)}
			>
				<ListItemText
					primaryTypographyProps={{
						style: { fontSize: 12, fontWeight: 'bold' },
					}}
					primary={largeCategory.categoryName}
				/>
				{targetData && <>{open ? <ExpandLess /> : <ExpandMore />}</>}
			</MenuItem>
			{targetData && (
				<Collapse in={open} timeout="auto">
					<List component="div" disablePadding>
						<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
							{targetData.map((data: CategoryData, index: number) => (
								<MenuItem
									key={index}
									dense
									onClick={() =>
										menuClick(data.categoryName, data.categoryCode, 'M')
									}
									onTouchStart={() =>
										menuClick(data.categoryName, data.categoryCode, 'M')
									}
									sx={{ px: 4, py: 2 }}
								>
									<ListItemText
										primaryTypographyProps={{
											style: { fontSize: 12, fontWeight: 'bold' },
										}}
										primary={data.categoryName}
									/>
								</MenuItem>
							))}
						</MenuList>
					</List>
				</Collapse>
			)}
		</>
	);
};

const AppDetail: FC<AppMenuProps> = ({
	title,
	description,
	categoryData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const largeCategoryData = categoryData.largeCategoryData;
	const middleCategoryData = categoryData.middleCategoryData;
	const [open, setOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const showClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(open ? null : event.currentTarget);
		setOpen(!open);
	};

	const closeAnchorEl = () => {
		setAnchorEl(null);
		setOpen(false);
	};

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

	const tooltip: SxProps<Theme> = {
		zIndex: 1,
	};
	const menu: SxProps<Theme> = {
		top: '10px',
		position: 'relative',
		mt: { xs: '-3px', sm: '1px' },
		mb: '10px',
		width: '250px',
		display: 'inline-flex',
		justifyContent: 'flex-start',
	};

	return (
		<Box
			sx={{
				px: { xs: '28px', sm: '40px' },
				pt: { xs: '8px', sm: '12px' },
				pb: { xs: '4px', sm: '8px' },
				bgcolor: '#EBEBEB',
			}}
		>
			<ClickAwayListener onClickAway={closeAnchorEl}>
				<IconButton
					onClick={showClick}
					sx={{ p: 0, mt: -1, ml: { xs: -1, sm: 0 }, color: 'secondary.main' }}
				>
					<MenuIcon />
					<Typography
						color="#000"
						align="center"
						sx={{
							pl: { xs: '6px', sm: '10px' },
							fontSize: { xs: '13px', sm: '14px' },
							fontWeight: 'bold',
						}}
					>
						전체
					</Typography>
				</IconButton>
			</ClickAwayListener>
			<Popper
				id={'main-menu'}
				open={open}
				anchorEl={anchorEl}
				sx={tooltip}
				placement="bottom-start"
				modifiers={[
					{
						name: 'offset',
						options: {
							offset: [-40, 2],
						},
					},
				]}
			>
				<Box sx={menu}>
					<List
						sx={{
							p: 0,
							width: '100%',
							color: '#fff',
							bgcolor: '#333333',
							borderRadius: 0,
							opacity: 0.9,
						}}
						component="nav"
					>
						<MenuList sx={{ pl: { xs: 0, sm: 0 }, py: 0.2 }}>
							{largeCategoryData.map((data: CategoryData, index: number) => (
								<AppMenuItem
									key={index}
									largeCategory={data}
									middleCategoyData={middleCategoryData}
									menuClick={menuClick}
								/>
							))}
						</MenuList>
					</List>
				</Box>
			</Popper>
		</Box>
	);
};

const AppMenuMobile: FC<AppMenuProps> = ({
	title,
	description,
	categoryData,
	menus,
}): JSX.Element => {
	return (
		<Paper sx={{ width: '100%' }} component="div" square variant="outlined">
			<Box>
				<Grid container spacing={1}>
					<Grid item>
						<AppDetail
							title={title}
							description={description}
							categoryData={categoryData}
						/>
					</Grid>
					{menus && (
						<AppMenu title={title} description={description} menus={menus} />
					)}
				</Grid>
			</Box>
		</Paper>
	);
};

const mapStateToProps = (state: any) => ({
	menus: (state.menu as MenuState).menus,
});

export default connect(mapStateToProps, null)(AppMenuMobile);
