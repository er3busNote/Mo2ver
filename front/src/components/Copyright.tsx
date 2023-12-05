import React, { FC } from 'react';
import { Link, Typography, TypographyProps } from '@mui/material';

const Copyright: FC<TypographyProps> = (props: any): JSX.Element => {
	return (
		<Typography variant="body2" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="/">
				Er3busNote
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

export default Copyright;
