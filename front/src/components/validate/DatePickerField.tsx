import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { SxProps, Theme } from '@mui/material/styles';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

interface RenderDatePickerFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label: string;
}

const RenderDatePickerField: FC<RenderDatePickerFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	label,
}) => {
	const datePicker: SxProps<Theme> = {
		height: '37px',
		'.MuiInputBase-input': {
			pl: { xs: 1.5, sm: 2 },
			py: 2,
			width: { xs: '60px', sm: '80px' },
			fontSize: { xs: '12px', sm: '13px', md: '13px', lg: '14px' },
		},
		'.MuiFormLabel-root': {
			ml: 1,
			mt: 0.5,
			fontSize: { xs: '12px', sm: '13px', md: '13px', lg: '14px' },
		},
		'.MuiInputAdornment-root': {
			overflowX: 'visible',
		},
		'.MuiIconButton-root': {
			pr: { xs: 0.5, sm: 1 },
			pl: 0,
		},
		'.MuiFormHelperText-root': {
			color: '#d32f2f',
		},
		overflowX: 'visible',
	};
	return (
		<DesktopDatePicker
			label={label}
			name={name}
			value={value}
			onChange={onChange}
			sx={datePicker}
			slotProps={{
				textField: {
					helperText: error ? error.message : '',
				},
			}}
		/>
	);
};

export default RenderDatePickerField;
