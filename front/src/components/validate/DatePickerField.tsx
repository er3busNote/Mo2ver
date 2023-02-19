import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';

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
	const handleChange = (newValue: Date) => {
		// if (name === 'startDate') setStartDate(newValue);
		// else if (name === 'endDate') setEndDate(newValue);

		// if (name === 'startDate' && newValue > endDate) setEndDate(newValue);
		// else if (name === 'endDate' && newValue < startDate) setStartDate(newValue);
		onChange(newValue);
	};
	return (
		<DesktopDatePicker
			label={label}
			inputFormat="MM/DD/YYYY"
			value={value}
			onChange={(value) => handleChange(moment(value).toDate())}
			renderInput={(params) => (
				<TextField
					error={error ? true : false}
					required
					id={name}
					name={name}
					// helperText={error?.message}
					{...params}
				/>
			)}
		/>
	);
};

export default RenderDatePickerField;
