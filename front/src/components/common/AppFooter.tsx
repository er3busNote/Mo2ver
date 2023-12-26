import React, { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeTitle, changeDescription, menuActive } from '../../store/index';
import {
	Box,
	Paper,
	BottomNavigation,
	BottomNavigationAction,
} from '@mui/material';
import AppFooterMenu from './AppFooterMenu';
import Copyright from '../Copyright';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import { CategoryData } from '../../services/types';
import { isAdmin } from '../../utils/jwttoken';
import { isMobile, BrowserView, MobileView } from 'react-device-detect';

interface AppFooterProps {
	width: number;
	categoryData: Array<CategoryData>;
}

const AppFooter: FC<AppFooterProps> = ({
	width,
	categoryData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState('home');

	const handleChange = (event: SyntheticEvent, newValue: string) => {
		setValue(newValue);
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

	const adminPageClick = (title: string, description: string, path: string) => {
		if (isAdmin()) {
			dispatch(changeDescription(title));
			dispatch(changeTitle(description));
			dispatch(menuActive(path));
			navigate(path);
		}
	};

	const toggleDrawer = () => {
		setOpen(!open);
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
			<MobileView>
				<Paper square>
					<AppFooterMenu
						open={open}
						setOpen={setOpen}
						width={width}
						categoryData={categoryData}
					/>
					<BottomNavigation value={value} onChange={handleChange}>
						<BottomNavigationAction
							label="카테고리"
							value="category"
							onClick={() => toggleDrawer()}
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
							onClick={() => adminPageClick('관리자', '어드민페이지', '/admin')}
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
			</MobileView>
			<BrowserView>
				<Paper
					sx={{
						bgcolor: '#383838',
					}}
					square
					variant="outlined"
				>
					<Box>
						<Copyright color="#fff" />
					</Box>
				</Paper>
			</BrowserView>
		</Box>
	);
};

export default AppFooter;
