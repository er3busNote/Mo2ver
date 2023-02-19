import React, { FC } from 'react';
import { ControllerRenderProps, UseFormStateReturn } from 'react-hook-form';
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
	return (
		<FormControl>
			<InputLabel id={`${name}-select-label`}>{label}</InputLabel>
			<Select
				labelId={`${name}-select-label`}
				value={value}
				label={label}
				onChange={onChange}
			>
				{datas.map((data: SelectProps) => {
					return (
						<MenuItem key={data.value} value={data.value} sx={{ fontSize: 14 }}>
							{data.label}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};

export default RenderSelectField;
