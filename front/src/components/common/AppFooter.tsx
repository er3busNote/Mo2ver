import React, { FC } from 'react';
import Copyright from '../Copyright';
import { Paper, Container, Box } from '@mui/material';

const AppFooter: FC = (): JSX.Element => {
	return (
		<Paper
			sx={{
				bottom: 0,
				width: '100%',
				position: 'absolute',
				bgcolor: '#383838',
			}}
			component="footer"
			square
			variant="outlined"
		>
			<Box>
				<Copyright sx={{ pt: 4 }} />
			</Box>
		</Paper>
	);
};

export default AppFooter;
