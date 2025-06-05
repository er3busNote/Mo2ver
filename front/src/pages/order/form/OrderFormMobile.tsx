import React, { FC, BaseSyntheticEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import AppSubStepHeader from '@layouts/AppSubStepHeader';
import { Box } from '@mui/material';
import { OrderFormValues } from '@pages/types';

interface OrderProps {
	title: string;
	description: string;
	steps: string[];
	onSubmit: (
		data: OrderFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

const OrderFormMobile: FC<OrderProps> = ({
	title,
	description,
	steps,
	onSubmit,
}): JSX.Element => {
	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
		setValue,
		watch,
	} = useFormContext<OrderFormValues>();

	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<Box sx={{ mx: 2, my: 2 }}></Box>
		</Box>
	);
};

export default OrderFormMobile;
