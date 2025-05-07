import React, { FC } from 'react';
import { Box, Divider } from '@mui/material';

const MenuDivider: FC = (): JSX.Element => {
	return (
		<Box sx={{ lineHeight: { xs: '34px', sm: '40px' } }}>
			<Divider
				orientation="vertical"
				variant="middle"
				sx={{
					mt: { xs: '18px', sm: '22px' },
					mb: 0,
					height: '0.8rem',
					display: 'inline-flex',
					borderColor: '#CCCCCC',
				}}
			/>
		</Box>
	);
};

export default MenuDivider;
