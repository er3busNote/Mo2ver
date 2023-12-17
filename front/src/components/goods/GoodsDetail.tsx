import React, { FC } from 'react';
import AppSubHeader from '../common/AppSubHeader';
import { Box } from '@mui/material';

const GoodsDetail: FC = (): JSX.Element => {
	return (
		<Box>
			<AppSubHeader />
			<Box sx={{ my: 2 }}> Page is Goods Detail </Box>
		</Box>
	);
};

export default GoodsDetail;
