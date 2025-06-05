import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Checkbox, Typography, FormControlLabel } from '@mui/material';
import {
	fontSize_xs,
	fontSize_sm,
	fontSize_md,
	fontSize_lg,
} from '@utils/style';

interface RenderCheckBoxFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label: string;
}

const RenderCheckBoxField: FC<RenderCheckBoxFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	label,
}) => {
	return (
		<FormControlLabel
			control={<Checkbox name={name} checked={value} onChange={onChange} />}
			label={
				<Typography
					fontSize={{
						xs: fontSize_xs,
						sm: fontSize_sm,
						md: fontSize_md,
						lg: fontSize_lg,
					}}
				>
					{label}
				</Typography>
			}
		/>
	);
};

export default RenderCheckBoxField;
