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
import { SubMenuInfo, MenuState } from '../../store/types';
import { changeTitle, changeDescription, menuActive } from '../../store/index';
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
import ClickAwayListener from '@mui/base/ClickAwayListener';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { CategoryData, CategoryDataGroup } from '../../services/types';
import { divideArray } from '../../utils/divide';

const menuFontSize = '15px';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

interface AppHeaderMenuProps {
	scrolled: boolean;
	categoryData: CategoryDataGroup;
	menus?: Array<SubMenuInfo>;
}

interface AppHeaderDetailProps {
	categoryData: CategoryDataGroup;
}

interface AppHeaderMenuItemProps {
	categoryCode: string;
	categoryName: string;
	setHover: Dispatch<SetStateAction<string>>;
	menuClick: (title: string, code: string, type: string) => void;
}

const MenuDivider: FC = (): JSX.Element => {
	return (
		<Box sx={{ lineHeight: '40px' }}>
			<Divider
				orientation="vertical"
				variant="middle"
				sx={{
					mt: '22px',
					mb: 0,
					height: '0.8rem',
					display: 'inline-flex',
					borderColor: '#CCCCCC',
				}}
			/>
		</Box>
	);
};

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
	categoryData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const largeCategoyData = categoryData.largeCategoyData;
	const middleCategoyData = categoryData.middleCategoyData;
	const smallCategoyData = categoryData.smallCategoyData;
	const [hover, setHover] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	// 중 카테고리 → 3등분
	let divideData = new Array([
		new Array<CategoryData>(),
		new Array<CategoryData>(),
		new Array<CategoryData>(),
	]);
	if (
		hover !== '' &&
		middleCategoyData &&
		Object.keys(middleCategoyData).includes(hover)
	) {
		divideData = divideArray(middleCategoyData[hover]);
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

	const menuClick = (title: string, code: string, type: string) => {
		dispatch(changeDescription(title));
		dispatch(changeTitle(title));
		dispatch(menuActive(`/goods/${type}/${code}`));
		navigate(`/goods/${type}/${code}`);
	};

	const menuWidthSize = '630px';
	const submenuWidthSize = '210px';

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
			(middleCategoyData && !Object.keys(middleCategoyData).includes(hover))
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
									{largeCategoyData.map((data: any, index: number) => (
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
								{divideData.map((divide: any, k: number) => (
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
												{smallCategoyData &&
													Object.keys(smallCategoyData).includes(
														mdata.categoryCode
													) &&
													smallCategoyData[mdata.categoryCode].map(
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
	categoryData,
	menus,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	// (Diff) focus는 focusing하는 boolean값 ↔ open은 list를 출력하는 boolean값
	const showAnchorEl = (event: ChangeEvent<HTMLInputElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};
	const closeAnchorEl = () => {
		setAnchorEl(null);
		setOpen(false);
	};

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		if (text === '') {
			setFocus(false);
			closeAnchorEl(); // → Popper Close
		} else {
			// fetchData(0, text); // 초기화
			setFocus(true);
			showAnchorEl(event); // Popper Open
		}
		setKeyword(text);
	};
	const searchOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			closeAnchorEl(); // → Popper Close
			event.preventDefault();
		}
	};
	const searchClick = (text: string) => {
		setKeyword(text);
		closeAnchorEl(); // → Popper Close
	};

	const cancelClick = () => {
		setKeyword('');
		setFocus(false);
		closeAnchorEl(); // → Popper 닫기
	};

	const activeMenuClick = (
		title: string,
		description: string,
		path: string
	) => {
		dispatch(changeDescription(title));
		dispatch(changeTitle(description));
		dispatch(menuActive(path));
		navigate(path);
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
								<AppHeaderDetail categoryData={categoryData} />
							</Grid>
							{menus &&
								menus.map((menu: SubMenuInfo) => (
									<Grid item key={menu.index}>
										<Grid container spacing={1}>
											<Grid item>
												<Box sx={{ px: '20px', py: '10px' }}>
													<IconButton
														onClick={() =>
															activeMenuClick(
																menu.title,
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
										value={keyword}
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
