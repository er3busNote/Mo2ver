import React, { FC } from 'react';
import AppSubStepHeader from '@layouts/AppSubStepHeader';
import { Box } from '@mui/material';

interface OrderProps {
	title: string;
	description: string;
	steps: string[];
}

const OrderFormMobile: FC<OrderProps> = ({
	title,
	description,
	steps,
}): JSX.Element => {
	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<Box sx={{ mx: 2, my: 2 }}></Box>
		</Box>
	);
};

export default OrderFormMobile;
