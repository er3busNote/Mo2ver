import React, {
	FC,
	useState,
	MouseEvent,
	Dispatch,
	ChangeEvent,
	KeyboardEvent,
	SetStateAction,
	CSSProperties,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import { MenuState, SubMenuInfo } from '@store/types';
import { CategoryData, CategoryDataGroup } from '@api/types';
import useSearchGoodsList from '@hooks/search/useSearchGoodsDebounceList';
import {
	Box,
	Grid,
	Slide,
	Paper,
	Popper,
	Divider,
	MenuList,
	MenuItem,
	Collapse,
	InputBase,
	IconButton,
	Typography,
	ListItemText,
} from '@mui/material';
import {
	SxProps,
	Theme,
	createTheme,
	ThemeProvider,
} from '@mui/material/styles';
import { ClickAwayListener } from '@mui/base';
import {
	Menu as MenuIcon,
	Search as SearchIcon,
	Clear as ClearIcon,
} from '@mui/icons-material';
import goToMenu from '@navigate/menu/goToMenu';
import goToGoodsSearch from '@navigate/goods/goToGoodsSearch';
import goToGoodsCategory from '@navigate/goods/goToGoodsCategory';
import MenuDivider from '@components/divider/MenuDivider';
import { divideArray } from '@utils/divide';
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

interface AppHeaderMenuItemProps {
	categoryCode: string;
	categoryName: string;
	setHover: Dispatch<SetStateAction<string>>;
	menuClick: (title: string, code: string, type: string) => void;
}

const AppHeaderMenuItem: FC<AppHeaderMenuItemProps> = ({
	categoryCode,
	categoryName,
	setHover,
	menuClick,
}): JSX.Element => {
	const onMouseEnter = () => {
		setHover(categoryCode);
	};

	const item: SxProps<Theme> = {
		px: '24px',
		py: '11px',
	};
	const font: CSSProperties = {
		fontSize: 13,
		fontWeight: 'bold',
	};
	return (
		<Paper elevation={0} onMouseEnter={onMouseEnter}>
			<MenuItem
				dense
				onClick={() => menuClick(categoryName, categoryCode, 'L')}
				sx={item}
			>
				<ListItemText
					primaryTypographyProps={{
						style: font,
					}}
					primary={categoryName}
				/>
			</MenuItem>
		</Paper>
	);
};

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

	const menuWidthSize = '630px';
	const submenuWidthSize = '198px';

	const tooltip: SxProps<Theme> = {
		//ml: '-41px !important',
		zIndex: 2,
	};
	const menu: SxProps<Theme> = {
		mt: '7px',
		position: 'relative',
	};
	const submenu: SxProps<Theme> = {
		display:
			hover === '' || // → 처음 랜더링 시, 깜빡이는 현상 방지
			(middleCategoryData && !has(middleCategoryData, hover))
				? 'none'
				: 'inline-flex',
	};
	const overflowParent: SxProps<Theme> = {
		overflow: 'hidden',
	};
	const overflowChildren: SxProps<Theme> = {
		overflowY: 'auto',
		position: 'relative',
	};
	const overflowTable: SxProps<Theme> = {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		//gap: 2,
		height: '100%',
		position: 'absolute',
	};
	const overflowContents: SxProps<Theme> = {
		textAlign: 'start',
		borderRadius: 0,
		paddingBottom: 2,
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
										<AppHeaderMenuItem
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
						<Box sx={{ width: menuWidthSize, ...submenu, ...overflowChildren }}>
							<Paper sx={overflowTable}>
								{divideData.map((divide: Array<CategoryData>, k: number) => (
									<Paper
										key={k}
										id={'sub-menu'}
										sx={{ width: submenuWidthSize, ...overflowContents }}
									>
										{divide.map((mdata: CategoryData, i: number) => (
											<MenuList key={i} sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
												<MenuItem
													dense
													onClick={() =>
														menuClick(
															mdata.categoryName,
															mdata.categoryCode,
															'M'
														)
													}
													sx={{ px: '24px', py: '11px' }}
												>
													<ListItemText
														primaryTypographyProps={{
															style: { fontSize: 14, fontWeight: 'bold' },
														}}
														primary={mdata.categoryName}
													/>
												</MenuItem>
												{smallCategoryData &&
													has(smallCategoryData, mdata.categoryCode) &&
													smallCategoryData[mdata.categoryCode].map(
														(sdata: CategoryData, j: number) => (
															<MenuItem
																key={j}
																dense
																onClick={() =>
																	menuClick(
																		sdata.categoryName,
																		sdata.categoryCode,
																		'S'
																	)
																}
																sx={{
																	px: '24px',
																	py: 0,
																	minHeight: 5,
																}}
															>
																<ListItemText
																	primaryTypographyProps={{
																		style: { fontSize: 13 },
																	}}
																	primary={sdata.categoryName}
																/>
															</MenuItem>
														)
													)}
											</MenuList>
										))}
									</Paper>
								))}
							</Paper>
						</Box>
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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [focus, setFocus] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [userInput, setUserInput] = useState('');
	const { setKeywordData } = useSearchGoodsList({
		search,
		keyword,
		setKeyword,
	});

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		if (text === '') {
			setFocus(false);
		} else {
			setFocus(true);
		}
		setUserInput(text);
		setKeywordData(text);
	};
	const searchOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			event.preventDefault();
			goToGoodsSearch({
				keyword: userInput,
				title: '검색',
				description: '검색',
				prevTitle: title,
				prevDescription: description,
				dispatch,
				navigate,
			});
		}
	};

	const cancelClick = () => {
		setUserInput('');
		setKeywordData('');
		setFocus(false);
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
			path,
			dispatch,
			navigate,
		});
	};

	const icon: SxProps<Theme> = {
		fontSize: '1.6rem',
		color: '#72BAF5',
	};
	const inputBase: SxProps<Theme> = {
		ml: 1,
		pt: 0.5,
		flex: 1,
		fontSize: '0.8rem',
		height: '2rem',
		'& input::placeholder': {
			fontSize: '15px',
		},
	};

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
							{menus &&
								menus.map((menu: SubMenuInfo, index: number) => (
									<Grid item key={index}>
										<Grid container spacing={1}>
											<Grid item>
												<Box sx={{ px: '20px', py: '10px' }}>
													<IconButton
														disableRipple
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
																fontSize: menuFontSize,
																fontWeight: 'bold',
															}}
														>
															{menu.description}
														</Typography>
													</IconButton>
												</Box>
											</Grid>
											<MenuDivider />
										</Grid>
									</Grid>
								))}
						</Grid>
						<Box sx={{ mr: 2, mt: '5px' }}>
							<Collapse orientation="horizontal" in={focus} collapsedSize={270}>
								<Paper
									component="form"
									elevation={0}
									sx={{
										px: '10px',
										display: 'flex',
										alignItems: 'center',
										borderRadius: 5,
										bgcolor: '#F1F1F1',
										height: '35px',
										width: '250px',
									}}
								>
									<InputBase
										sx={inputBase}
										placeholder="오늘 뭐 괜찮은 옷 있을까?"
										value={userInput}
										onChange={searchOnChange}
										onKeyPress={searchOnKeyPress}
									/>
									{focus ? (
										<IconButton onClick={cancelClick} sx={{ p: 0, mr: 1 }}>
											<ClearIcon sx={icon} />
										</IconButton>
									) : (
										<SearchIcon sx={icon} />
									)}
								</Paper>
							</Collapse>
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
