import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { TextField } from '@mui/material';

interface RenderTextFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	type: string;
	label: string;
}

const RenderTextField: FC<RenderTextFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	type,
	label,
}) => {
	return (
		<TextField
			margin="dense"
			error={error ? true : false}
			required
			id={name}
			label={label}
			type={type}
			name={name}
			defaultValue={value}
			onChange={onChange}
			autoComplete={name}
			helperText={error?.message}
			style={{ width: '80%' }}
			inputProps={{ style: { fontSize: 13, height: 3 } }} // font size of input text
			InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
		/>
	);
};

export default RenderTextField;
