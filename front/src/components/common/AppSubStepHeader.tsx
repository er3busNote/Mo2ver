import React, { FC, useState } from 'react';
import { Box, Step, Stepper, StepLabel } from '@mui/material';
import Title from '../Title';

interface CartSubHeaderProps {
	description: string;
	steps: string[];
}

const AppSubStepHeader: FC<CartSubHeaderProps> = ({
	description,
	steps,
}): JSX.Element => {
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState<{
		[k: number]: boolean;
	}>({});

	return (
		<Box
			sx={{
				px: { xs: 4, sm: 10 },
				pt: 2,
				pb: 1,
				display: 'flex',
				justifyContent: 'space-between',
				borderBottom: '2px #F0F0F0 solid',
			}}
		>
			<Box sx={{ pt: 2 }}>
				<Title>{description}</Title>
			</Box>
			<Stepper nonLinear activeStep={activeStep}>
				{steps.map((label, index) => (
					<Step key={label} completed={completed[index]}>
						<StepLabel
							sx={{
								'.MuiSvgIcon-root': {
									fontSize: {
										xs: '1.2rem',
										sm: '1.3rem',
										md: '1.4rem',
										lg: '1.5rem',
									},
								},
								'.MuiStepLabel-label': {
									fontSize: { xs: 11, sm: 12, md: 13, lg: 14 },
								},
							}}
						>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
};

export default AppSubStepHeader;
