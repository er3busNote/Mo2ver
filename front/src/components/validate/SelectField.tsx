import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormHelperText,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface SelectProps {
	value: any;
	label: string;
}

interface RenderSelectFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	datas: Array<SelectProps>;
	label: string;
}

const RenderSelectField: FC<RenderSelectFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	label,
	datas,
}) => {
	const selectForm: SxProps<Theme> = {
		width: { xs: 100, sm: 120 },
		'.MuiInputLabel-shrink': {
			ml: { xs: 1, sm: 0.5 },
			mt: { xs: 1, sm: 0.5 },
		},
		overflowX: 'visible',
	};
	const selectLabel: SxProps<Theme> = {
		mt: -1,
		ml: 0.5,
		fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px' },
	};
	const selectInput: SxProps<Theme> = {
		'.MuiSelect-select': {
			py: { xs: 1, sm: 1.5 },
			fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px' },
		},
	};
	const menuText: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '13px', md: '13px', lg: '14px' },
	};
	return (
		<FormControl sx={selectForm} error={error !== undefined}>
			<InputLabel id={`${name}-select-label`} sx={selectLabel}>
				{label}
			</InputLabel>
			<Select
				labelId={`${name}-select-label`}
				value={value}
				label={label}
				onChange={onChange}
				sx={selectInput}
			>
				{datas.map((data: SelectProps) => {
					return (
						<MenuItem key={data.value} value={data.value} sx={menuText}>
							{data.label}
						</MenuItem>
					);
				})}
			</Select>
			{error && <FormHelperText>{error.message}</FormHelperText>}
		</FormControl>
	);
};

export default RenderSelectField;
