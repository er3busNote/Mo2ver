import React from 'react';
import { Link, Typography } from '@mui/material';

const Copyright = (props: any): JSX.Element => {
	return (
		<Typography variant="body2" color="#fff" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="http://localhost:3000">
				Er3busNote
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

export default Copyright;
