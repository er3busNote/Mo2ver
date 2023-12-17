import React, { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const Title: FC<TypographyProps> = ({ children }): JSX.Element => {
	return (
		<Typography
			component="h1"
			variant="h5"
			color="inherit"
			sx={{
				fontWeight: 'bold',
				fontSize: { xs: '16px', sm: '18px', lg: '20px' },
			}}
		>
			{children}
		</Typography>
	);
};

export default Title;
