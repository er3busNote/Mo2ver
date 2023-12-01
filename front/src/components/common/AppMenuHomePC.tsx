import React, {
	FC,
	useState,
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

const menuFontSize = '15px';

const menuDatas = [
	{ id: 1, category: '상의/아우터/원피스' },
	{ id: 2, category: '바지/스커트' },
	{ id: 3, category: '스니커즈/신발' },
	{ id: 4, category: '가방/여성 가방' },
	{ id: 5, category: '스포츠/용품' },
	{ id: 6, category: '모자' },
	{ id: 7, category: '양말/레그웨어' },
	{ id: 8, category: '속옷' },
	{ id: 9, category: '선글라스/안경테' },
	{ id: 10, category: '액세서리/시계/주얼리' },
	{ id: 11, category: '뷰티' },
];

const searchDatas = [
	{ id: 1, keyword: '삼성전자' },
	{ id: 2, keyword: '모니터' },
	{ id: 3, keyword: '3060' },
	{ id: 4, keyword: 'b660m' },
	{ id: 5, keyword: '노트북' },
	{ id: 6, keyword: '애플' },
	{ id: 7, keyword: 'b550' },
	{ id: 8, keyword: 'cpu' },
	{ id: 9, keyword: 'ddr5-4800' },
	{ id: 10, keyword: 'h610m' },
];

const darkTheme = createTheme({ palette: { mode: 'dark' } });

interface AppMenuItemProps {
	index: number;
	category: string;
	setHover: Dispatch<SetStateAction<number>>;
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
	index,
	category,
	setHover,
}): JSX.Element => {
	const [isHover, setIsHover] = useState(false);

	const onMouseEnter = () => {
		setHover(index);
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
					primary={category}
				/>
			</MenuItem>
		</Paper>
	);
};

const AppDetail: FC = (): JSX.Element => {
	const [hover, setHover] = useState(-1);

	const onMouseLeave = () => {
		setHover(-1);
	};

	const menu: SxProps<Theme> = {
		mt: '7px',
		ml: '-41px',
		position: 'absolute',
		zIndex: 1,
	};
	const submenu: SxProps<Theme> = {
		display: hover == -1 ? 'none' : 'inline-flex',
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
			<Box id={'main-menu'} sx={menu}>
				<Box
					sx={{
						mt: '1px',
						display: 'inline-flex',
						justifyContent: 'flex-start',
					}}
				>
					<Box sx={{ width: '210px' }} onMouseLeave={onMouseLeave}>
						<ThemeProvider theme={darkTheme}>
							<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
								{menuDatas.map((data: any, index: number) => (
									<AppMenuItem
										key={index}
										index={index}
										setHover={setHover}
										category={data.category}
									/>
								))}
							</MenuList>
						</ThemeProvider>
					</Box>
					<Box sx={{ width: '630px', ...submenu }}>
						<Paper
							id={'sub-menu'}
							elevation={1}
							sx={{ width: '210px', textAlign: 'start', borderRadius: 0 }}
						>
							<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
								<MenuItem dense sx={{ px: '24px', py: '11px' }}>
									<ListItemText
										primaryTypographyProps={{
											style: { fontSize: 14, fontWeight: 'bold' },
										}}
										primary={'브랜드'}
									/>
								</MenuItem>
								{searchDatas.map((data: any, index: number) => (
									<MenuItem
										key={index}
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
											primary={data.keyword}
										/>
									</MenuItem>
								))}
							</MenuList>
						</Paper>
						<Paper
							id={'sub-menu'}
							elevation={1}
							sx={{ width: '210px', textAlign: 'start', borderRadius: 0 }}
						>
							<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
								<MenuItem dense sx={{ px: '24px', py: '11px' }}>
									<ListItemText
										primaryTypographyProps={{
											style: { fontSize: 14, fontWeight: 'bold' },
										}}
										primary={'브랜드'}
									/>
								</MenuItem>
								{searchDatas.map((data: any) => (
									<MenuItem
										key={data.id}
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
											primary={data.keyword}
										/>
									</MenuItem>
								))}
							</MenuList>
						</Paper>
						<Paper
							id={'sub-menu'}
							elevation={1}
							sx={{ width: '210px', textAlign: 'start', borderRadius: 0 }}
						>
							<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
								<MenuItem dense sx={{ px: '24px', py: '11px' }}>
									<ListItemText
										primaryTypographyProps={{
											style: { fontSize: 14, fontWeight: 'bold' },
										}}
										primary={'브랜드'}
									/>
								</MenuItem>
								{searchDatas.map((data: any) => (
									<MenuItem
										key={data.id}
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
											primary={data.keyword}
										/>
									</MenuItem>
								))}
							</MenuList>
						</Paper>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const AppMenuHomePC: FC = (): JSX.Element => {
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
						<AppDetail />
					</Grid>
					<Grid item>
						<Box sx={{ px: '20px', py: '10px' }}>
							<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: menuFontSize, fontWeight: 'bold' }}
								>
									이벤트/기획전
								</Typography>
							</IconButton>
						</Box>
					</Grid>
					<MenuDivider />
					<Grid item>
						<Box sx={{ px: '20px', py: '10px' }}>
							<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: menuFontSize, fontWeight: 'bold' }}
								>
									견적문의
								</Typography>
							</IconButton>
						</Box>
					</Grid>
					<MenuDivider />
					<Grid item>
						<Box sx={{ px: '20px', py: '10px' }}>
							<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: menuFontSize, fontWeight: 'bold' }}
								>
									쿠폰존
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
