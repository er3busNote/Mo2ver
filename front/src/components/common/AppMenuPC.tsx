import React, {
	FC,
	useState,
	useEffect,
	MouseEvent,
	Dispatch,
	SetStateAction,
	CSSProperties,
} from 'react';
import { Link } from 'react-router-dom';
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
import ClickAwayListener from '@mui/base/ClickAwayListener';
import MenuIcon from '@mui/icons-material/Menu';
import {
	SxProps,
	Theme,
	createTheme,
	ThemeProvider,
} from '@mui/material/styles';
import { CategoryData } from '../../services/types';
import { divideArray } from '../../utils/divide';

const menuFontSize = '15px';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

interface AppMenuProps {
	categoryData: Array<CategoryData>;
}

interface AppMenuItemProps {
	categoryCode: string;
	categoryName: string;
	setHover: Dispatch<SetStateAction<string>>;
}

interface CategoryDataInfo {
	[key: string]: Array<CategoryData>;
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
			<MenuItem dense sx={item}>
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

const AppDetail: FC<AppMenuProps> = ({ categoryData }): JSX.Element => {
	const [hover, setHover] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const [largeCategoyData, setLargeCategoyData] = useState<Array<CategoryData>>(
		[]
	);
	const [middleCategoyData, setMiddleCategoyData] =
		useState<CategoryDataInfo>();
	const [smallCategoyData, setSmallCategoyData] = useState<CategoryDataInfo>();

	// → Transform Tree from DB Format to JSON Format in JAVASCRIPT
	const treeCategoryData = () => {
		// 대 카테고리
		const largeCategoyData = categoryData.filter(
			(data) => data.categoryLevel === 1 && data.useYesNo === 'Y'
		);
		setLargeCategoyData(largeCategoyData);
		// 중/소 카테고리
		const middleCategoyData = new Object() as CategoryDataInfo;
		const smallCategoyData = new Object() as CategoryDataInfo;
		categoryData.forEach((data) => {
			if (data.categoryLevel === 2) {
				if (!Object.keys(middleCategoyData).includes(data.upperCategoryCode)) {
					middleCategoyData[data.upperCategoryCode] = new Array<CategoryData>();
				}
				middleCategoyData[data.upperCategoryCode].push(data);
			} else if (data.categoryLevel === 3) {
				if (!Object.keys(smallCategoyData).includes(data.upperCategoryCode)) {
					smallCategoyData[data.upperCategoryCode] = new Array<CategoryData>();
				}
				smallCategoyData[data.upperCategoryCode].push(data);
			}
		});
		setMiddleCategoyData(middleCategoyData);
		setSmallCategoyData(smallCategoyData);
	};
	useEffect(treeCategoryData, [categoryData]); // 처음 랜더링 될 때, 한번만 실행..!

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

	const menuWidthSize = '630px';
	const submenuWidthSize = '210px';

	const menu: SxProps<Theme> = {
		mt: '7px',
		ml: '-41px',
		position: 'absolute',
		zIndex: 1,
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
			<Popper open={open} anchorEl={anchorEl} placement="bottom-start">
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
										<AppMenuItem
											key={index}
											setHover={setHover}
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
												<MenuItem dense sx={{ px: '24px', py: '11px' }}>
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

const AppMenuPC: FC<AppMenuProps> = ({ categoryData }): JSX.Element => {
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
						<AppDetail categoryData={categoryData} />
					</Grid>
					<Grid item>
						<Box sx={{ px: '20px', py: '10px' }}>
							<IconButton component={Link} to="/event" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: menuFontSize, fontWeight: 'bold' }}
								>
									이벤트
								</Typography>
							</IconButton>
						</Box>
					</Grid>
					<MenuDivider />
					<Grid item>
						<Box sx={{ px: '20px', py: '10px' }}>
							<IconButton component={Link} to="/register" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: menuFontSize, fontWeight: 'bold' }}
								>
									상품등록
								</Typography>
							</IconButton>
						</Box>
					</Grid>
					<MenuDivider />
					<Grid item>
						<Box sx={{ px: '20px', py: '10px' }}>
							<IconButton component={Link} to="/discount" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: menuFontSize, fontWeight: 'bold' }}
								>
									특가할인
								</Typography>
							</IconButton>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default AppMenuPC;
