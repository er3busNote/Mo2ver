import React, { FC } from 'react';
import UserSubHeader from './cmmn/UserSubHeader';
import { Box } from '@mui/material';

const CartListMobile: FC = (): JSX.Element => {
	return (
		<Box>
			<UserSubHeader title={'장바구니'} />
			<Box sx={{ mx: 3, my: 2 }}>ss</Box>
		</Box>
	);
};

export default CartListMobile;
