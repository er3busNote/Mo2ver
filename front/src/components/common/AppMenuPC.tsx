import React, {
	FC,
	useState,
	MouseEvent,
	Dispatch,
	SetStateAction,
	CSSProperties,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { changeNext, menuActive } from '../../store/index';
import { TitleInfo, SubMenuInfo, MenuState } from '../../store/types';
import {
	Box,
	Grid,
	Paper,
	Popper,
	Divider,
	MenuList,
	MenuItem,
	IconButton,
	Typography,
	ListItemText,
} from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import MenuIcon from '@mui/icons-material/Menu';
import {
	SxProps,
	Theme,
	createTheme,
	ThemeProvider,
} from '@mui/material/styles';
import { CategoryData, CategoryDataGroup } from '../../api/types';
import { divideArray } from '../../utils/divide';

const menuFontSize = '15px';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

interface AppMenuProps {
	title: string;
	description: string;
	categoryData: CategoryDataGroup;
	menus?: Array<SubMenuInfo>;
}

interface AppMenuItemProps {
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

const AppMenuItem: FC<AppMenuItemProps> = ({
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

const AppDetail: FC<AppMenuProps> = ({
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
	let divideData = new Array([
		new Array<CategoryData>(),
		new Array<CategoryData>(),
		new Array<CategoryData>(),
	]);
	if (
		hover !== '' &&
		middleCategoryData &&
		Object.keys(middleCategoryData).includes(hover)
	) {
		divideData = divideArray(middleCategoryData[hover]);
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
			(middleCategoryData && !Object.keys(middleCategoryData).includes(hover))
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
									{largeCategoryData.map(
										(data: CategoryData, index: number) => (
											<AppMenuItem
												key={index}
												setHover={setHover}
												menuClick={menuClick}
												categoryCode={data.categoryCode}
												categoryName={data.categoryName}
											/>
										)
									)}
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
												{smallCategoryData &&
													Object.keys(smallCategoryData).includes(
														mdata.categoryCode
													) &&
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

const AppMenuPC: FC<AppMenuProps> = ({
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
			<Box
				sx={{
					width: '950px',
					display: 'inline-flex',
					justifyContent: 'flex-start',
				}}
			>
				<Grid container spacing={1}>
					<Grid item>
						<AppDetail
							title={title}
							description={description}
							categoryData={categoryData}
						/>
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
													sx={{ fontSize: menuFontSize, fontWeight: 'bold' }}
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
			</Box>
		</Paper>
	);
};

const mapStateToProps = (state: any) => ({
	menus: (state.menu as MenuState).menus,
});

export default connect(mapStateToProps, null)(AppMenuPC);
