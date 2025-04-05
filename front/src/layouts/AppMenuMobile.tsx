import React, { FC, useState, MouseEvent, TouchEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { TitleInfo, MenuState, SubMenuInfo } from '@store/types';
import { changeNext, menuActive } from '@store/index';
import {
	Box,
	Grid,
	List,
	Paper,
	Popper,
	Divider,
	Collapse,
	MenuList,
	MenuItem,
	IconButton,
	Typography,
	ListItemText,
} from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { SxProps, Theme } from '@mui/material/styles';
import { CategoryData, CategoryDataGroup } from '@api/types';
import { isDesktop } from 'react-device-detect';

interface AppMenuProps {
	title: string;
	description: string;
	categoryData: CategoryDataGroup;
	menus?: Array<SubMenuInfo>;
}

interface AppMenuDetailProps {
	largeCategory: CategoryData;
	middleCategoyData?: CategoryDataInfo;
	menuClick: (title: string, code: string, type: string) => void;
}

interface CategoryDataInfo {
	[key: string]: Array<CategoryData>;
}

const MenuDivider: FC = (): JSX.Element => {
	return (
		<Box sx={{ lineHeight: { xs: '34px', sm: '40px' } }}>
			<Divider
				orientation="vertical"
				variant="middle"
				sx={{
					mt: { xs: '18px', sm: '22px' },
					mb: 0,
					height: '0.8rem',
					display: 'inline-flex',
					borderColor: '#CCCCCC',
				}}
			/>
		</Box>
	);
};

const AppMenu: FC<AppMenuDetailProps> = ({
	largeCategory,
	middleCategoyData,
	menuClick,
}): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);

	const targetData =
		middleCategoyData &&
		Object.keys(middleCategoyData).includes(largeCategory.categoryCode) &&
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
		const titleData: TitleInfo = {
			title: nextTitle,
			description: nextTitle,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive(`/goods/${type}/${code}`));
		navigate(`/goods/${type}/${code}`);
	};

	const tooltip: SxProps<Theme> = {
		//ml: { xs: '-23px !important', sm: '-41px !important' },
		// transform: isMobile
		// 	? 'translate(0px, 152px) !important'
		// 	: {
		// 			xs: 'translate(0px, 217px) !important',
		// 			sm: 'translate(0px, 220px) !important',
		// 	  },
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
								<AppMenu
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
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
		dispatch(menuActive(path));
		navigate(path);
	};

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
					{menus &&
						menus.map((menu: SubMenuInfo, index: number) => (
							<Grid item key={index}>
								<Grid container spacing={1}>
									<Grid item>
										<Box
											sx={{
												px: { xs: '12px', sm: '20px' },
												py: { xs: '6px', sm: '10px' },
											}}
										>
											<IconButton
												onClick={() =>
													activeMenuClick(
														menu.name,
														menu.description,
														menu.path
													)
												}
												sx={{ p: 0 }}
											>
												<Typography
													color="#000"
													align="center"
													sx={{
														fontSize: { xs: '13px', sm: '14px' },
														fontWeight: 'bold',
													}}
												>
													{menu.name}
												</Typography>
											</IconButton>
										</Box>
									</Grid>
									<MenuDivider />
								</Grid>
							</Grid>
						))}
				</Grid>
			</Box>
		</Paper>
	);
};

const mapStateToProps = (state: any) => ({
	menus: (state.menu as MenuState).menus,
});

export default connect(mapStateToProps, null)(AppMenuMobile);
