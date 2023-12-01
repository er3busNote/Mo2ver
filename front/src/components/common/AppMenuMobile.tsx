import React, { FC, useState, MouseEvent, TouchEvent } from 'react';
import { Link } from 'react-router-dom';
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
import ClickAwayListener from '@mui/base/ClickAwayListener';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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
];

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

interface AppMenuProps {
	category: string;
}

const AppMenu: FC<AppMenuProps> = ({ category }): JSX.Element => {
	const [open, setOpen] = useState(false);

	const handleClick = (
		event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
	) => {
		setOpen(!open);
		event.stopPropagation(); // 새로고침 방지
		//event.nativeEvent.stopPropagation();
		//event.nativeEvent.stopImmediatePropagation();
	};

	const handleTouchStart = (
		touch: boolean,
		event: TouchEvent<HTMLLIElement>
	) => {
		event.preventDefault(); // 터치 이벤트의 기본 동작 막기
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
					primary={category}
				/>
				{open ? <ExpandLess /> : <ExpandMore />}
			</MenuItem>
			<Collapse in={open} timeout="auto">
				<List component="div" disablePadding>
					<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
						{searchDatas.map((data: any) => (
							<MenuItem key={data.id} dense sx={{ px: 4, py: 2 }}>
								<ListItemText
									primaryTypographyProps={{
										style: { fontSize: 12, fontWeight: 'bold' },
									}}
									primary={data.keyword}
								/>
							</MenuItem>
						))}
					</MenuList>
				</List>
			</Collapse>
		</>
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
				sx={{ zIndex: 1 }}
				id={'main-menu'}
				open={open}
				anchorEl={anchorEl}
				placement="bottom-start"
			>
				<Box
					sx={{
						mt: { xs: '-1px', sm: '1px' },
						width: '250px',
						display: 'inline-flex',
						justifyContent: 'flex-start',
					}}
				>
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
						<MenuList sx={{ pl: { xs: 3, sm: 0 }, py: 0.2 }}>
							{menuDatas.map((data: any) => (
								<AppMenu key={data.id} category={data.category} />
							))}
						</MenuList>
					</List>
				</Box>
			</Popper>
		</Box>
	);
};

const AppMenuMobile: FC = (): JSX.Element => {
	return (
		<Paper sx={{ width: '100%' }} component="div" square variant="outlined">
			<Box>
				<Grid container spacing={1}>
					<Grid item>
						<AppDetail />
					</Grid>
					<Grid item>
						<Box
							sx={{
								px: { xs: '12px', sm: '20px' },
								py: { xs: '6px', sm: '10px' },
							}}
						>
							<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{
										fontSize: { xs: '13px', sm: '14px' },
										fontWeight: 'bold',
									}}
								>
									이벤트/기획전
								</Typography>
							</IconButton>
						</Box>
					</Grid>
					<MenuDivider />
					<Grid item>
						<Box
							sx={{
								px: { xs: '12px', sm: '20px' },
								py: { xs: '6px', sm: '10px' },
							}}
						>
							<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{
										fontSize: { xs: '13px', sm: '14px' },
										fontWeight: 'bold',
									}}
								>
									견적문의
								</Typography>
							</IconButton>
						</Box>
					</Grid>
					<MenuDivider />
					<Grid item>
						<Box
							sx={{
								px: { xs: '12px', sm: '20px' },
								py: { xs: '6px', sm: '10px' },
							}}
						>
							<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{
										fontSize: { xs: '13px', sm: '14px' },
										fontWeight: 'bold',
									}}
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

export default AppMenuMobile;
