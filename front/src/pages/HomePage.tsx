import React, { FC } from 'react';
import { Paper, Box } from '@mui/material';
import Banner from '../components/banner/Banner';
import Popular from '../components/banner/Popular';

const HomePage: FC = (): JSX.Element => {
	return (
		<Paper sx={{ height: 1000 }} component="div" square variant="outlined">
			<Banner />
			<Box
				sx={{
					p: 2,
					width: '930px',
					display: 'inline-flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					height: 450,
				}}
			>
				<Popular />
			</Box>
		</Paper>
	);
};

export default HomePage;
