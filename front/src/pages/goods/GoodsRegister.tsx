import React, { FC, BaseSyntheticEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import AppSubStepHeader from '@layouts/AppSubStepHeader';
import RegisterForm from './form/RegisterForm';
import { Box } from '@mui/material';
import { RegisterFormValues } from '@pages/types';

interface GoodsRegisterProps {
	description: string;
	steps: string[];
	slidesPerView: number;
	spaceBetween: number;
	category: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
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
	file,
	onSubmit,
}): JSX.Element => {
	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<RegisterForm
				slidesPerView={slidesPerView}
				spaceBetween={spaceBetween}
				category={category}
				file={file}
				onSubmit={onSubmit}
			/>
		</Box>
	);
};

export default GoodsRegister;
