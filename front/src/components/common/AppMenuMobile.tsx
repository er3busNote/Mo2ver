import React, { FC, useState, useEffect, MouseEvent, TouchEvent } from 'react';
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
import { CategoryData } from '../../services/types';

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
	categoryData: Array<CategoryData>;
}

interface AppMenuDetailProps {
	largeCategory: CategoryData;
	middleCategoyData?: CategoryDataInfo;
}

interface CategoryDataInfo {
	[key: string]: Array<CategoryData>;
}

const AppMenu: FC<AppMenuDetailProps> = ({
	largeCategory,
	middleCategoyData,
}): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);

	const targetData =
		middleCategoyData &&
		Object.keys(middleCategoyData).includes(largeCategory.categoryCode) &&
		middleCategoyData[largeCategory.categoryCode];

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
					primary={largeCategory.categoryName}
				/>
				{targetData && <>{open ? <ExpandLess /> : <ExpandMore />}</>}
			</MenuItem>
			{targetData && (
				<Collapse in={open} timeout="auto">
					<List component="div" disablePadding>
						<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
							{targetData.map((data: CategoryData, index: number) => (
								<MenuItem key={index} dense sx={{ px: 4, py: 2 }}>
									<ListItemText
										primaryTypographyProps={{
											style: { fontSize: 12, fontWeight: 'bold' },
										}}
										primary={data.categoryName}
									/>
								</MenuItem>
							))}
						</MenuList>
					</List>
				</Collapse>
			)}
		</>
	);
};

const AppDetail: FC<AppMenuProps> = ({ categoryData }): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const [largeCategoyData, setLargeCategoyData] = useState<Array<CategoryData>>(
		[]
	);
	const [middleCategoyData, setMiddleCategoyData] =
		useState<CategoryDataInfo>();

	// → Transform Tree from DB Format to JSON Format in JAVASCRIPT
	const treeCategoryData = () => {
		// 대 카테고리
		const largeCategoyData = categoryData.filter(
			(data) => data.categoryLevel === 1 && data.useYesNo === 'Y'
		);
		setLargeCategoyData(largeCategoyData);
		// 중 카테고리
		const middleCategoyData = new Object() as CategoryDataInfo;
		categoryData.forEach((data) => {
			if (data.categoryLevel === 2) {
				if (!Object.keys(middleCategoyData).includes(data.upperCategoryCode)) {
					middleCategoyData[data.upperCategoryCode] = new Array<CategoryData>();
				}
				middleCategoyData[data.upperCategoryCode].push(data);
			}
		});
		setMiddleCategoyData(middleCategoyData);
	};
	useEffect(treeCategoryData, [categoryData]); // 처음 랜더링 될 때, 한번만 실행..!

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
							{largeCategoyData.map((data: any, index: number) => (
								<AppMenu
									key={index}
									largeCategory={data}
									middleCategoyData={middleCategoyData}
								/>
							))}
						</MenuList>
					</List>
				</Box>
			</Popper>
		</Box>
	);
};

const AppMenuMobile: FC<AppMenuProps> = ({ categoryData }): JSX.Element => {
	return (
		<Paper sx={{ width: '100%' }} component="div" square variant="outlined">
			<Box>
				<Grid container spacing={1}>
					<Grid item>
						<AppDetail categoryData={categoryData} />
					</Grid>
					<Grid item>
						<Box
							sx={{
								px: { xs: '12px', sm: '20px' },
								py: { xs: '6px', sm: '10px' },
							}}
						>
							<IconButton component={Link} to="/event" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{
										fontSize: { xs: '13px', sm: '14px' },
										fontWeight: 'bold',
									}}
								>
									이벤트
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
							<IconButton component={Link} to="/register" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{
										fontSize: { xs: '13px', sm: '14px' },
										fontWeight: 'bold',
									}}
								>
									상품등록
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
							<IconButton component={Link} to="/discount" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{
										fontSize: { xs: '13px', sm: '14px' },
										fontWeight: 'bold',
									}}
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

export default AppMenuMobile;
