import React, { FC, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Grid,
	Paper,
	Divider,
	IconButton,
	Typography,
	Popper,
	MenuList,
	MenuItem,
	ListItemText,
} from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import MenuIcon from '@mui/icons-material/Menu';

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

const AppDetail: FC = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const showClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(open ? null : event.currentTarget);
		setOpen(!open);
	};

	const closeAnchorEl = () => {
		setAnchorEl(null);
		setOpen(false);
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
				id={'main-menu'}
				open={open}
				anchorEl={anchorEl}
				placement="bottom-start"
			>
				<Box
					sx={{
						mt: '1px',
						width: '1050px',
						display: 'inline-flex',
						justifyContent: 'flex-start',
					}}
				>
					<Paper
						elevation={0}
						sx={{
							width: '210px',
							color: '#fff',
							bgcolor: '#333333',
							borderRadius: 0,
						}}
					>
						<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
							{menuDatas.map((data: any) => (
								<MenuItem key={data.id} dense sx={{ px: '24px', py: '11px' }}>
									<ListItemText
										primaryTypographyProps={{
											style: { fontSize: 13, fontWeight: 'bold' },
										}}
										primary={data.category}
									/>
								</MenuItem>
							))}
						</MenuList>
					</Paper>
					<Paper
						id={'sub-menu'}
						elevation={1}
						sx={{ width: '210px', borderRadius: 0 }}
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
						sx={{ width: '210px', borderRadius: 0 }}
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
						sx={{ width: '210px', borderRadius: 0 }}
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
						sx={{ width: '210px', borderRadius: 0 }}
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
			</Popper>
		</Box>
	);
};

const AppMenu: FC = (): JSX.Element => {
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

export default AppMenu;
