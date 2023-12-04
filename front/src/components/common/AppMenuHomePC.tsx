import React, {
	FC,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	CSSProperties,
} from 'react';
import { Link } from 'react-router-dom';
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
	useEffect(treeCategoryData, []); // 처음 랜더링 될 때, 한번만 실행..!

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
					</Box>
					<Box sx={{ width: menuWidthSize, ...submenu, ...overflowChildren }}>
						<Paper sx={overflowTable}>
							{divideData.map((divide: any, k: number) => (
								<Paper
									key={k}
									id={'sub-menu'}
									sx={{ width: submenuWidthSize, ...overflowContents }}
								>
									{divide.map((mdata: any, i: number) => (
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
													(sdata: any, j: number) => (
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
		</Box>
	);
};

const AppMenuHomePC: FC<AppMenuProps> = ({ categoryData }): JSX.Element => {
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

export default AppMenuHomePC;
