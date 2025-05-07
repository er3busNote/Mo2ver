import React, { FC } from 'react';
import { Box, Divider } from '@mui/material';

const SearchDivider: FC = (): JSX.Element => {
	return (
		<Box sx={{ lineHeight: '20px' }}>
			<Divider
				orientation="vertical"
				variant="middle"
				sx={{
					ml: '5px',
					mb: '1px',
					height: '0.6rem',
					borderColor: '#E1E3E3',
				}}
			/>
		</Box>
	);
};

export default SearchDivider;
