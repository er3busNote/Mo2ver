import React, { FC, Dispatch, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import {
	Box,
	Paper,
	Grid,
	Button,
	SvgIcon,
	IconButton,
	Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainIcon from '@assets/logo.svg?react';
import MenuIcon from '@mui/icons-material/Menu';

const headerFontSize = { xs: '11px', sm: '12px' };

interface AdminHeaderProps {
	member: ActionCreatorsMapObject;
	isMobile: boolean;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const AdminHeader: FC<AdminHeaderProps> = ({
	member,
	isMobile,
	open,
	setOpen,
}): JSX.Element => {
	const justifyContent = isMobile ? 'space-between' : 'flex-end';
	const navigate = useNavigate();
	const logoutClick = () => {
		member.logout();
		navigate('/');
	};

	const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<Paper sx={{ width: '100%' }}>
			<Paper
				sx={{ bgcolor: '#363658' }}
				component="header"
				square
				variant="outlined"
			>
				<Box
					sx={{
						pt: '4px',
						width: '100%',
						display: 'inline-flex',
						justifyContent: justifyContent,
					}}
				>
					{isMobile && (
						<IconButton
							sx={{ p: 0, pr: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 3 } }}
							onClick={toggleDrawer}
						>
							<MenuIcon color="disabled" />
						</IconButton>
					)}
					<Grid container spacing={1} sx={{ width: { xs: 327, sm: 400 } }}>
						<Grid item sx={{ display: 'flex', alignItems: 'center' }}>
							<AccountCircleIcon color="secondary" />
							<Typography
								color="#fff"
								align="center"
								sx={{ px: 1, fontSize: headerFontSize }}
							>
								안녕하세요 Admin 님은 슈퍼유저입니다.
							</Typography>
						</Grid>
						<Grid item>
							<Button
								sx={{
									px: { xs: 2, sm: 4 },
									fontSize: '11px',
									fontWeight: 'bold',
									bgcolor: '#757595',
									border: '1px solid #757595',
									borderRadius: 0,
									color: '#fff',
								}}
								variant="outlined"
								onClick={logoutClick}
							>
								로그아웃
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Paper>
			<Paper
				sx={{ bgcolor: '#F3F3F3' }}
				component="header"
				square
				variant="outlined"
			>
				<Box
					sx={{
						width: '95%',
						display: 'inline-flex',
						justifyContent: 'flex-start',
					}}
				>
					<IconButton component={Link} to="/admin" sx={{ p: 0 }}>
						<SvgIcon
							component={MainIcon}
							color="primary"
							sx={{ width: '5em', height: '3em' }}
							inheritViewBox
						/>
					</IconButton>
				</Box>
			</Paper>
		</Paper>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(null, mapDispatchToProps)(AdminHeader);
