import React, { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LogoutIcon from '@mui/icons-material/Logout';
import { isAuthenticated } from '@utils/jwttoken';
import Title from '@components/Title';

interface AppHeaderProps {
	description: string;
	member: ActionCreatorsMapObject;
}

const AppHeaderBar: FC<AppHeaderProps> = ({
	member,
	description,
}): JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();

	const isHome = (): boolean => {
		if (location.pathname === '/') return false;
		else return true;
	};

	const prevClick = () => {
		navigate(-1); // 뒤로가기
	};

	const logoutClick = () => {
		member.logout();
		navigate('/');
	};
	return (
		<Box sx={{ width: '100%' }}>
			{description !== '' && (
				<AppBar position="static" sx={{ color: '#000', bgcolor: '#fff' }}>
					<Toolbar sx={{ minHeight: '44px' }}>
						<Box sx={{ ml: 1, left: 0, position: 'absolute' }}>
							{isHome() && (
								<IconButton size="large" onClick={prevClick}>
									<ArrowBackIosIcon fontSize="small" />
								</IconButton>
							)}
						</Box>
						<Box sx={{ width: '100%' }}>
							<Title>{description}</Title>
						</Box>
						<Box sx={{ mr: 1, right: 0, position: 'absolute' }}>
							{isAuthenticated() && (
								<IconButton size="large" onClick={logoutClick}>
									<LogoutIcon fontSize="small" />
								</IconButton>
							)}
						</Box>
					</Toolbar>
				</AppBar>
			)}
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(null, mapDispatchToProps)(AppHeaderBar);
