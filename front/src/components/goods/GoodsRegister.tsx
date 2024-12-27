import React, { FC, BaseSyntheticEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import AppSubStepHeader from '../common/AppSubStepHeader';
import RegisterForm from '../form/RegisterForm';
import { Box } from '@mui/material';
import { RegisterFormValues } from '../form/types';

interface GoodsRegisterProps {
	description: string;
	steps: string[];
	slidesPerView: number;
	spaceBetween: number;
	category: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
	onSubmit: (
		data: RegisterFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

const GoodsRegister: FC<GoodsRegisterProps> = ({
	description,
	steps,
	slidesPerView,
	spaceBetween,
	category,
	image,
	onSubmit,
}): JSX.Element => {
	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<RegisterForm
				slidesPerView={slidesPerView}
				spaceBetween={spaceBetween}
				category={category}
				image={image}
				onSubmit={onSubmit}
			/>
		</Box>
	);
};

export default GoodsRegister;
