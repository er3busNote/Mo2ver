import React, { FC } from 'react';
import { Box, Paper } from '@mui/material';
import Copyright from '../Copyright';

const AppFooter: FC = (): JSX.Element => {
	return (
		<Paper
			sx={{
				bottom: 0,
				width: '100%',
				position: 'fixed',
				bgcolor: '#383838',
			}}
			component="footer"
			square
			variant="outlined"
		>
			<Box>
				<Copyright color="#fff" />
			</Box>
		</Paper>
	);
};

export default AppFooter;
