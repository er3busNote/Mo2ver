import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import { IconButton, Box, Grid, Paper, Typography } from '@mui/material';
import { isAuthenticated, isAdmin } from '../../utils/jwttoken';

const headerFontSize = '12px';

interface AppHeaderProps {
	member: ActionCreatorsMapObject;
}

const AppHeader: FC<AppHeaderProps> = ({ member }): JSX.Element => {
	const navigate = useNavigate();
	const logoutClick = () => {
		member.logout();
		navigate('/');
	};
	return (
		<Paper sx={{ width: '100%' }}>
			<Paper sx={{ bgcolor: '#F0F0F0' }} square variant="outlined">
				<Box
					sx={{
						width: '100%',
						display: 'inline-flex',
						justifyContent: 'flex-end',
					}}
				>
					<Grid container spacing={1} sx={{ width: 250 }}>
						{!isAuthenticated() && (
							<Grid item>
								<IconButton component={Link} to="/auth/login" sx={{ p: 0 }}>
									<Typography
										color="#000"
										align="center"
										sx={{ fontSize: headerFontSize }}
									>
										로그인
									</Typography>
								</IconButton>
							</Grid>
						)}
						{!isAuthenticated() && (
							<Grid item>
								<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
									<Typography
										color="#000"
										align="center"
										sx={{ fontSize: headerFontSize }}
									>
										회원가입
									</Typography>
								</IconButton>
							</Grid>
						)}
						{isAuthenticated() && (
							<Grid item>
								<IconButton onClick={logoutClick} sx={{ p: 0 }}>
									<Typography
										color="#000"
										align="center"
										sx={{ fontSize: headerFontSize }}
									>
										로그아웃
									</Typography>
								</IconButton>
							</Grid>
						)}
						{isAdmin() && (
							<Grid item>
								<IconButton component={Link} to="/admin" sx={{ p: 0 }}>
									<Typography
										color="#000"
										align="center"
										sx={{ fontSize: headerFontSize }}
									>
										관리자 페이지
									</Typography>
								</IconButton>
							</Grid>
						)}
						{/*<Grid item>
							<IconButton component={Link} to="/auth/login" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: headerFontSize }}
								>
									장바구니
								</Typography>
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton component={Link} to="/auth/login" sx={{ p: 0 }}>
								<Typography
									color="#000"
									align="center"
									sx={{ fontSize: headerFontSize }}
								>
									주문/배송
								</Typography>
							</IconButton>
						</Grid>*/}
					</Grid>
				</Box>
			</Paper>
		</Paper>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(null, mapDispatchToProps)(AppHeader);
