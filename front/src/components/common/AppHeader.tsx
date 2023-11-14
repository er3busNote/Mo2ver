import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Box, Grid, Paper, Typography } from '@mui/material';

const headerFontSize = '12px';

const AppHeader: FC = (): JSX.Element => {
	return (
		<Paper
			sx={{ width: '100%', bgcolor: '#F0F0F0' }}
			component="header"
			square
			variant="outlined"
		>
			<Box
				sx={{
					width: '950px',
					display: 'inline-flex',
					justifyContent: 'flex-end',
				}}
			>
				<Grid container spacing={1} sx={{ width: 250 }}>
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
					<Grid item>
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
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default AppHeader;
