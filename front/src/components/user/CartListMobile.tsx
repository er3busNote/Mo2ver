import React, { FC } from 'react';
import CartSubHeader from './cmmn/CartSubHeader';
import { Box } from '@mui/material';

const CartListMobile: FC = (): JSX.Element => {
	return (
		<Box>
			<CartSubHeader title={'장바구니'} />
			<Box sx={{ mx: 3, my: 2 }}>ss</Box>
		</Box>
	);
};

export default CartListMobile;
