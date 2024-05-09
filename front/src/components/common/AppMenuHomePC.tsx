import React, {
	FC,
	useState,
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
	Divider,
	MenuList,
	MenuItem,
	IconButton,
	Typography,
	ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
	SxProps,
	Theme,
	createTheme,
	ThemeProvider,
} from '@mui/material/styles';
import { CategoryData, CategoryDataGroup } from '../../services/types';
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
	const [isHover, setIsHover] = useState(false);

	const onMouseEnter = () => {
		setHover(categoryCode);
		setIsHover(true);
	};

	const onMouseLeave = () => {
		setIsHover(false);
	};

	const menu: SxProps<Theme> = {
		opacity: isHover ? 1 : 0.6,
		borderRadius: 0,
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
		<Paper
			elevation={0}
			sx={menu}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
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

	const menu: SxProps<Theme> = {
		mt: '7px',
		ml: '-41px',
		position: 'absolute',
		zIndex: 1,
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
		height: '100%',
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
			<IconButton sx={{ p: 0, mt: -1, color: 'secondary.main' }} disabled>
				<MenuIcon sx={{ color: '#86868A' }} />
				<Typography
					color="#000"
					align="center"
					sx={{ pl: '10px', fontSize: menuFontSize, fontWeight: 'bold' }}
				>
					전체 카테고리
				</Typography>
			</IconButton>
			<Box id={'main-menu'} sx={menu} onMouseLeave={onMouseLeave}>
				<Box
					sx={{
						mt: '1px',
						display: 'inline-flex',
						justifyContent: 'flex-start',
						...overflowParent,
					}}
				>
					<Box sx={{ width: submenuWidthSize }}>
						<ThemeProvider theme={darkTheme}>
							<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
								{largeCategoryData.map((data: CategoryData, index: number) => (
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
					</Box>
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
													menuClick(mdata.categoryName, mdata.categoryCode, 'M')
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
		</Box>
	);
};

const AppMenuHomePC: FC<AppMenuProps> = ({
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

export default connect(mapStateToProps, null)(AppMenuHomePC);
