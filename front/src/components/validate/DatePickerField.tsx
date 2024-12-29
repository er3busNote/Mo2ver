import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { SxProps, Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const fontSize_xs = '11px';
const fontSize_sm = '12px';
const fontSize_md = '13px';
const fontSize_lg = '13px';

interface RenderDatePickerFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label: string;
	readonly?: boolean;
}

const RenderDatePickerField: FC<RenderDatePickerFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	label,
	readonly = false,
}) => {
	const datePicker: SxProps<Theme> = {
		height: '37px',
		'& .MuiInputBase-root': {
			backgroundColor: readonly ? grey[200] : 'transparent',
		},
		'& .MuiInputBase-input': {
			pl: { xs: 1.5, sm: 2 },
			py: { xs: 1.5, sm: 2 },
			width: { xs: '60px', sm: '80px' },
			fontSize: {
				xs: fontSize_xs,
				sm: fontSize_sm,
				md: fontSize_md,
				lg: fontSize_lg,
			},
		},
		'& .MuiFormLabel-root': {
			ml: 1,
			mt: 0.5,
			fontSize: {
				xs: fontSize_xs,
				sm: fontSize_sm,
				md: fontSize_md,
				lg: fontSize_lg,
			},
		},
		'& .MuiInputAdornment-root': {
			overflowX: 'visible',
		},
		'& .MuiIconButton-root': {
			pr: { xs: 0.5, sm: 1 },
			pl: 0,
		},
		'& .MuiFormHelperText-root': {
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
					InputProps: {
						readOnly: readonly,
					},
					helperText: error ? error.message : '',
				},
			}}
			disabled={readonly}
		/>
	);
};

export default RenderDatePickerField;
