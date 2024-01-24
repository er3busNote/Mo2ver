import React, { FC } from 'react';
import AppSubStepHeader from '../common/AppSubStepHeader';
import RegisterForm from '../form/RegisterForm';
import { Box } from '@mui/material';

interface GoodsRegisterProps {
	description: string;
	steps: string[];
}

const GoodsRegister: FC<GoodsRegisterProps> = ({
	description,
	steps,
}): JSX.Element => {
	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<RegisterForm />
		</Box>
	);
};

export default GoodsRegister;
