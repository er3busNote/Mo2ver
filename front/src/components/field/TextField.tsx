import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { TextField } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {
	fontSize_xs,
	fontSize_sm,
	fontSize_md,
	fontSize_lg,
} from '@utils/style';

interface RenderTextFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	type: string;
	label: string;
	multiline?: boolean;
	readonly?: boolean;
}

const RenderTextField: FC<RenderTextFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	type,
	label,
	multiline,
	readonly = false,
}) => {
	const textInput: SxProps<Theme> = {
		'.MuiInputLabel-shrink': {
			ml: { xs: 1, sm: 0.5 },
			mt: { xs: 1, sm: 0.5 },
		},
	};
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
			sx={textInput}
			autoComplete={name}
			helperText={error?.message}
			multiline={multiline}
			inputProps={{
				sx: {
					py: { xs: 1.8, sm: 2 },
					fontSize: {
						xs: fontSize_xs,
						sm: fontSize_sm,
						md: fontSize_md,
						lg: fontSize_lg,
					},
					backgroundColor: readonly ? grey[200] : 'transparent',
				},
				readOnly: readonly,
				...(type === 'number' && { pattern: '[0-9]*' }),
			}} // font size of input text
			InputLabelProps={{
				sx: {
					mt: -0.6,
					fontSize: {
						xs: fontSize_xs,
						sm: fontSize_sm,
						md: fontSize_md,
						lg: fontSize_lg,
					},
					zIndex: 1,
				},
			}} // font size of input label
		/>
	);
};

export default RenderTextField;
