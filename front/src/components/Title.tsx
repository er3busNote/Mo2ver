import React, { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const Title: FC<TypographyProps> = ({ children }): JSX.Element => {
	return (
		<Typography
			component="h1"
			variant="h5"
			color="inherit"
			sx={{ fontWeight: 'bold' }}
		>
			{children}
		</Typography>
	);
};

export default Title;
