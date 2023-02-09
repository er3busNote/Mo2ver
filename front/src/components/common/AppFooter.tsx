import React, { FC } from 'react';
import { Paper, Typography, Link, Box } from '@mui/material';

const AppFooter: FC = (): JSX.Element => {
	return (
		<Paper
			sx={{
				bottom: 0,
				width: '100%',
				position: 'relative',
				bgcolor: '#383838',
			}}
			component="footer"
			square
			variant="outlined"
		>
			<Box>
				<Typography variant="body2" color="#fff" align="center">
					{'Copyright © '}
					<Link color="inherit" href="http://localhost:3000">
						Er3busNote
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Box>
		</Paper>
	);
};

export default AppFooter;
