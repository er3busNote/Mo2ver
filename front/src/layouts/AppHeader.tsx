import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import {
	Box,
	Paper,
	Stack,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import goToMenu from '@navigate/menu/goToMenu';
import { isAuthenticated, isAdmin } from '@utils/jwttoken';
import { fontSize_sm } from '@utils/style';

interface AppHeaderProps {
	width: string;
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
}

const AppHeader: FC<AppHeaderProps> = ({
	width,
	title,
	description,
	member,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	const logoutClick = () => {
		member.logout();
		navigate('/');
	};
	return (
		<Paper sx={{ width: '100%' }}>
			<Paper sx={{ bgcolor: '#F0F0F0' }} square variant="outlined">
				<Box
					sx={{
						pr: 2,
						width: width,
						display: 'inline-flex',
						justifyContent: 'end',
					}}
				>
					<Stack
						direction="row"
						divider={<Divider orientation="vertical" flexItem />}
						spacing={1}
					>
						{!isAuthenticated() && (
							<IconButton
								disableRipple
								component={Link}
								to="/auth/login"
								sx={{ p: 0 }}
							>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: fontSize_sm }}
								>
									로그인
								</Typography>
							</IconButton>
						)}
						{!isAuthenticated() && (
							<IconButton
								disableRipple
								component={Link}
								to="/auth/signup"
								sx={{ p: 0 }}
							>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: fontSize_sm }}
								>
									회원가입
								</Typography>
							</IconButton>
						)}
						{isAuthenticated() && (
							<IconButton
								disableRipple
								onClick={() =>
									activeMenuClick('유저', 'My 프로파일', '/profile')
								}
								sx={{ p: 0 }}
							>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: fontSize_sm }}
								>
									My 프로파일
								</Typography>
							</IconButton>
						)}
						{isAuthenticated() && (
							<IconButton
								disableRipple
								onClick={() => activeMenuClick('카트', '장바구니', '/cart')}
								sx={{ p: 0 }}
							>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: fontSize_sm }}
								>
									장바구니
								</Typography>
							</IconButton>
						)}
						{isAuthenticated() && (
							<IconButton disableRipple onClick={logoutClick} sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: fontSize_sm }}
								>
									로그아웃
								</Typography>
							</IconButton>
						)}
						{isAuthenticated() && isAdmin() && (
							<IconButton
								disableRipple
								onClick={() =>
									activeMenuClick('관리자', '어드민페이지', '/admin')
								}
								sx={{ p: 0 }}
							>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: fontSize_sm }}
								>
									관리자 페이지
								</Typography>
							</IconButton>
						)}
					</Stack>
				</Box>
			</Paper>
		</Paper>
	);
};

export default AppHeader;
