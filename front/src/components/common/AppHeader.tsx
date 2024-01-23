import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import { changeTitle, changeDescription, menuActive } from '../../store/index';
import { connect } from 'react-redux';
import Api from '../../services/api';
import {
	Box,
	Paper,
	Stack,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import { isAuthenticated, isAdmin } from '../../utils/jwttoken';

const headerFontSize = '12px';

interface AppHeaderProps {
	width: string;
	member: ActionCreatorsMapObject;
}

const AppHeader: FC<AppHeaderProps> = ({ width, member }): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cartClick = () => {
		dispatch(changeTitle('Cart'));
		dispatch(changeDescription('장바구니'));
		dispatch(menuActive('/cart'));
		navigate('/cart');
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
							<IconButton component={Link} to="/auth/login" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: headerFontSize }}
								>
									로그인
								</Typography>
							</IconButton>
						)}
						{!isAuthenticated() && (
							<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: headerFontSize }}
								>
									회원가입
								</Typography>
							</IconButton>
						)}
						{isAuthenticated() && (
							<IconButton component={Link} to="/profile" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: headerFontSize }}
								>
									My 프로파일
								</Typography>
							</IconButton>
						)}
						{isAuthenticated() && (
							<IconButton onClick={cartClick} sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: headerFontSize }}
								>
									장바구니
								</Typography>
							</IconButton>
						)}
						{isAuthenticated() && (
							<IconButton onClick={logoutClick} sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: headerFontSize }}
								>
									로그아웃
								</Typography>
							</IconButton>
						)}
						{isAdmin() && (
							<IconButton component={Link} to="/admin" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: headerFontSize }}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(null, mapDispatchToProps)(AppHeader);
