import React, { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import AppFooterMenu from './AppFooterMenu';
import AppSearchItemsMobile from './AppSearchItemsMobile';
import {
	Box,
	Paper,
	BottomNavigation,
	BottomNavigationAction,
} from '@mui/material';
import Copyright from '@components/Copyright';
import {
	GridViewOutlined as GridViewOutlinedIcon,
	SearchOutlined as SearchOutlinedIcon,
	HomeOutlined as HomeOutlinedIcon,
	AccountCircleOutlined as AccountCircleOutlinedIcon,
	Restore as RestoreIcon,
} from '@mui/icons-material';
import { GoodsData, CategoryDataGroup } from '@api/types';
import goToMenu from '@navigate/menu/goToMenu';
import { isAdmin } from '@utils/jwttoken';
import { useIsMobile } from '@context/MobileContext';

interface AppFooterProps {
	width: number;
	title: string;
	description: string;
	search: ActionCreatorsMapObject;
	recommend: ActionCreatorsMapObject;
	goodsRankData: Array<GoodsData>;
	categoryData: CategoryDataGroup;
}

const AppFooter: FC<AppFooterProps> = ({
	width,
	title,
	description,
	search,
	recommend,
	goodsRankData,
	categoryData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const [value, setValue] = useState('home');
	const [openMenu, setMenuOpen] = useState<boolean>(false);
	const [openSearch, setSearchOpen] = useState<boolean>(false);

	const handleChange = (event: SyntheticEvent, newValue: string) => {
		setValue(newValue);
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

	const toggleMenu = () => {
		setMenuOpen(!openMenu);
	};

	const toggleSearch = () => {
		setSearchOpen(!openSearch);
	};

	return (
		<Box
			component="footer"
			sx={{
				bottom: 0,
				position: 'fixed',
				width: '100%',
				boxShadow: isMobile ? '0 0 3px rgba(0, 0, 0, 0.3)' : 'none',
				zIndex: 1,
			}}
		>
			{isMobile ? (
				<Paper square>
					<AppFooterMenu
						open={openMenu}
						setOpen={setMenuOpen}
						width={width}
						title={title}
						description={description}
						categoryData={categoryData}
					/>
					<AppSearchItemsMobile
						search={search}
						recommend={recommend}
						openSearch={openSearch}
						setSearchOpen={setSearchOpen}
						goodsRankData={goodsRankData}
					/>
					<BottomNavigation value={value} onChange={handleChange}>
						<BottomNavigationAction
							label="카테고리"
							value="category"
							onClick={() => toggleMenu()}
							sx={{
								px: 0,
								minWidth: '10px',
								fontSize: '10px',
								'.Mui-selected': { fontSize: '10px !important' },
							}}
							icon={<GridViewOutlinedIcon />}
						/>
						<BottomNavigationAction
							label="검색"
							value="search"
							onClick={() => toggleSearch()}
							sx={{
								px: 0,
								minWidth: '10px',
								fontSize: '10px',
								'.Mui-selected': { fontSize: '10px !important' },
							}}
							icon={<SearchOutlinedIcon />}
						/>
						<BottomNavigationAction
							label="HOME"
							value="home"
							onClick={() => activeMenuClick('홈', '메인', '/')}
							sx={{
								px: 0,
								minWidth: '10px',
								fontSize: '10px',
								'.Mui-selected': { fontSize: '10px !important' },
							}}
							icon={<HomeOutlinedIcon />}
						/>
						<BottomNavigationAction
							label="유저"
							value="user"
							onClick={() =>
								activeMenuClick(
									isAdmin() ? '관리자' : '유저',
									isAdmin() ? '어드민페이지' : 'My 프로파일',
									isAdmin() ? '/admin' : '/profile'
								)
							}
							sx={{
								px: 0,
								minWidth: '10px',
								fontSize: '10px',
								'.Mui-selected': { fontSize: '10px !important' },
							}}
							icon={<AccountCircleOutlinedIcon />}
						/>
						<BottomNavigationAction
							label="최근본상품"
							onClick={() => activeMenuClick('카트', '장바구니', '/cart')}
							value="recent"
							sx={{
								px: 0,
								minWidth: '10px',
								fontSize: '10px',
								'.Mui-selected': { fontSize: '10px !important' },
							}}
							icon={<RestoreIcon />}
						/>
					</BottomNavigation>
				</Paper>
			) : (
				<Paper
					sx={{
						bgcolor: '#383838',
					}}
					square
					variant="outlined"
				>
					<Box>
						<Copyright title={title} description={description} color="#fff" />
					</Box>
				</Paper>
			)}
		</Box>
	);
};

export default AppFooter;
