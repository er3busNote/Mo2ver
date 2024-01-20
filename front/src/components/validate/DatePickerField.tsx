import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

interface RenderDatePickerFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label: string;
}

const RenderDatePickerField: FC<RenderDatePickerFieldProps> = ({
	field: { onChange, value },
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
			value={value}
			onChange={(value) => handleChange(value)}
		/>
	);
};

export default RenderDatePickerField;
