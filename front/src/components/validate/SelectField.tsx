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

const fontSize_xs = '11px';
const fontSize_sm = '12px';
const fontSize_md = '13px';
const fontSize_lg = '13px';

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
		fontSize: {
			xs: fontSize_xs,
			sm: fontSize_sm,
			md: fontSize_md,
			lg: fontSize_lg,
		},
	};
	const selectInput: SxProps<Theme> = {
		'.MuiSelect-select': {
			py: { xs: 0.8, sm: 1 },
			fontSize: {
				xs: fontSize_xs,
				sm: fontSize_sm,
				md: fontSize_md,
				lg: fontSize_lg,
			},
		},
	};
	const menuText: SxProps<Theme> = {
		fontSize: {
			xs: fontSize_xs,
			sm: fontSize_sm,
			md: fontSize_md,
			lg: fontSize_lg,
		},
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
