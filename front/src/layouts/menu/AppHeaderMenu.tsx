import React, { FC, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import { MenuState, SubMenuInfo } from '@store/types';
import { CategoryData, CategoryDataGroup } from '@api/types';
import AppMenu from './AppMenu';
import AppMenuItem from './AppMenuItem';
import AppMenuSubItem from './AppMenuSubItem';
import {
	Box,
	Grid,
	Slide,
	Paper,
	Popper,
	MenuList,
	IconButton,
	Typography,
} from '@mui/material';
import {
	SxProps,
	Theme,
	createTheme,
	ThemeProvider,
} from '@mui/material/styles';
import { ClickAwayListener } from '@mui/base';
import { Menu as MenuIcon } from '@mui/icons-material';
import SearchCard from '@components/card/SearchCard';
import goToGoodsCategory from '@navigate/goods/goToGoodsCategory';
import { divideArray } from '@utils/divide';
import { submenuWidthSize } from '@utils/style';
import { has } from 'lodash';

const menuFontSize = '15px';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

interface AppHeaderMenuProps {
	scrolled: boolean;
	title: string;
	description: string;
	search: ActionCreatorsMapObject;
	categoryData: CategoryDataGroup;
	menus?: Array<SubMenuInfo>;
}

interface AppHeaderDetailProps {
	title: string;
	description: string;
	categoryData: CategoryDataGroup;
}

const AppHeaderDetail: FC<AppHeaderDetailProps> = ({
	title,
	description,
	categoryData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const largeCategoryData = categoryData.largeCategoryData;
	const middleCategoryData = categoryData.middleCategoryData;
	const smallCategoryData = categoryData.smallCategoryData;
	const [hover, setHover] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	// 중 카테고리 → 3등분
	let divideData: Array<Array<CategoryData>> = [[], [], []];
	if (hover !== '' && middleCategoryData && has(middleCategoryData, hover)) {
		divideData = divideArray(middleCategoryData[hover], 3);
	}

	const showClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(open ? null : event.currentTarget);
		setOpen(!open);
	};

	const closeAnchorEl = () => {
		setAnchorEl(null);
		setOpen(false);
	};

	const onMouseLeave = () => {
		setHover('');
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
		//ml: '-41px !important',
		zIndex: 2,
	};
	const menu: SxProps<Theme> = {
		mt: '7px',
		position: 'relative',
	};
	const overflowParent: SxProps<Theme> = {
		overflow: 'hidden',
	};
	return (
		<Box sx={{ px: '40px', pt: '12px', pb: '8px', bgcolor: '#EBEBEB' }}>
			<ClickAwayListener onClickAway={closeAnchorEl}>
				<IconButton
					disableRipple
					onClick={showClick}
					sx={{ p: 0, mt: -1, color: 'secondary.main' }}
				>
					<MenuIcon />
					<Typography
						color="#000"
						align="center"
						sx={{ pl: '10px', fontSize: menuFontSize, fontWeight: 'bold' }}
					>
						전체 카테고리
					</Typography>
				</IconButton>
			</ClickAwayListener>
			<Popper
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
				<Box id={'main-menu'} sx={menu} onMouseLeave={onMouseLeave}>
					<Box
						sx={{
							mt: '1px',
							width: '840px',
							display: 'inline-flex',
							justifyContent: 'flex-start',
							...overflowParent,
						}}
					>
						<Paper
							elevation={0}
							sx={{
								width: submenuWidthSize,
								color: '#fff',
								bgcolor: '#333333',
								borderRadius: 0,
								textAlign: 'center',
							}}
						>
							<ThemeProvider theme={darkTheme}>
								<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
									{largeCategoryData.map((data: any, index: number) => (
										<AppMenuItem
											key={index}
											setHover={setHover}
											menuClick={menuClick}
											categoryCode={data.categoryCode}
											categoryName={data.categoryName}
										/>
									))}
								</MenuList>
							</ThemeProvider>
						</Paper>
						<AppMenuSubItem
							title={title}
							description={description}
							divideData={divideData}
							middleCategoryData={middleCategoryData}
							smallCategoryData={smallCategoryData}
							hover={hover}
						/>
					</Box>
				</Box>
			</Popper>
		</Box>
	);
};

const AppHeaderMenu: FC<AppHeaderMenuProps> = ({
	scrolled,
	title,
	description,
	search,
	categoryData,
	menus,
}): JSX.Element => {
	return (
		<Box
			sx={{
				top: 0,
				left: 0,
				position: 'fixed',
				width: '100%',
				zIndex: 2,
			}}
		>
			<Slide direction="down" in={scrolled} mountOnEnter unmountOnExit>
				<Paper sx={{ width: '100%' }} component="div" square variant="outlined">
					<Box
						sx={{
							width: '950px',
							display: 'inline-flex',
							justifyContent: 'space-between',
						}}
					>
						<Grid container spacing={1}>
							<Grid item>
								<AppHeaderDetail
									title={title}
									description={description}
									categoryData={categoryData}
								/>
							</Grid>
							{menus && (
								<AppMenu
									title={title}
									description={description}
									menus={menus}
								/>
							)}
						</Grid>
						<Box sx={{ mr: 2, mt: '5px' }}>
							<SearchCard
								title={title}
								description={description}
								search={search}
								width="250px"
							/>
						</Box>
					</Box>
				</Paper>
			</Slide>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	menus: (state.menu as MenuState).menus,
});

export default connect(mapStateToProps, null)(AppHeaderMenu);
