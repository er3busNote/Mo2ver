import React, { FC } from 'react';
import AppSubStepHeader from '../common/AppSubStepHeader';
import RegisterForm from '../form/RegisterForm';
import { Box } from '@mui/material';

interface GoodsRegisterProps {
	steps: string[];
}

const GoodsRegister: FC<GoodsRegisterProps> = ({ steps }): JSX.Element => {
	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader steps={steps} />
			<RegisterForm />
		</Box>
	);
};

export default GoodsRegister;
