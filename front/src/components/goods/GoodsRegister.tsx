import React, { FC, Dispatch, SetStateAction, BaseSyntheticEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import AppSubStepHeader from '../common/AppSubStepHeader';
import RegisterForm from '../form/RegisterForm';
import { Box } from '@mui/material';
import { RegisterFormValues } from '../form/types';
import { FileData } from '../../api/types';

interface GoodsRegisterProps {
	description: string;
	steps: string[];
	image: ActionCreatorsMapObject;
	setFiles: Dispatch<SetStateAction<Array<FileData> | undefined>>;
	onSubmit: (
		data: RegisterFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

const GoodsRegister: FC<GoodsRegisterProps> = ({
	description,
	steps,
	image,
	setFiles,
	onSubmit,
}): JSX.Element => {
	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<RegisterForm image={image} setFiles={setFiles} onSubmit={onSubmit} />
		</Box>
	);
};

export default GoodsRegister;
