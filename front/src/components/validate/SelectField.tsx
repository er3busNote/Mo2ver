import React, { FC } from 'react';
import { ControllerRenderProps, UseFormStateReturn } from 'react-hook-form';
import { SxProps, Theme } from '@mui/material/styles';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface SelectProps {
	value: any;
	label: string;
}

interface RenderSelectFieldProps {
	field: ControllerRenderProps<any, any>;
	formState: UseFormStateReturn<any>;
	datas: Array<SelectProps>;
	label: string;
}

const RenderSelectField: FC<RenderSelectFieldProps> = ({
	field: { onChange, value, name },
	label,
	datas,
}) => {
	const selectForm: SxProps<Theme> = {
		width: 120,
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
		<FormControl sx={selectForm}>
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
		</FormControl>
	);
};

export default RenderSelectField;
