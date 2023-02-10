import React, { FC } from 'react';
import { Paper, Typography, Link, Box } from '@mui/material';

const AdminFooter: FC = (): JSX.Element => {
	return (
		<Paper
			sx={{
				bottom: 0,
				width: '100%',
				zIndex: 1200,
				position: 'fixed',
				bgcolor: '#F3F3F3',
			}}
			component="footer"
			square
			variant="outlined"
		>
			<Box>
				<Typography sx={{ fontWeight: 'bold' }} variant="body2" align="center">
					{'Copyright © '}
					<Link color="inherit" href="http://localhost:3000/admin">
						Er3busNote
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Box>
		</Paper>
	);
};

export default AdminFooter;
