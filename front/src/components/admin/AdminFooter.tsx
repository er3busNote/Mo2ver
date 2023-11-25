import React, { FC } from 'react';
import { Box, Paper } from '@mui/material';
import Copyright from '../Copyright';

const AdminFooter: FC = (): JSX.Element => {
	return (
		<Paper
			sx={{
				bottom: 0,
				width: '100%',
				position: 'fixed',
				bgcolor: '#F3F3F3',
			}}
			component="footer"
			square
			variant="outlined"
		>
			<Box>
				<Copyright sx={{ fontWeight: 'bold' }} />
			</Box>
		</Paper>
	);
};

export default AdminFooter;
