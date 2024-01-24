import React, { FC } from 'react';
import AppSubStepHeader from '../common/AppSubStepHeader';
import { Box } from '@mui/material';

interface CartListProps {
	description: string;
	steps: string[];
}

const CartListMobile: FC<CartListProps> = ({
	description,
	steps,
}): JSX.Element => {
	return (
		<Box>
			<AppSubStepHeader description={description} steps={steps} />
			<Box sx={{ mx: 3, my: 2 }}>ss</Box>
		</Box>
	);
};

export default CartListMobile;
