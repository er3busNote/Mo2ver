import React, { FC, FocusEvent, PointerEvent, KeyboardEvent } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import NumberInput from '../input/NumberInput';

interface RenderNumberFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	readonly?: boolean;
}

const RenderNumberField: FC<RenderNumberFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	readonly = false,
}) => {
	const handleNumberChange = (
		event:
			| FocusEvent<HTMLInputElement, Element>
			| PointerEvent<Element>
			| KeyboardEvent<Element>,
		newValue: number | null
	) => {
		onChange(newValue);
	};

	return (
		<FormControl error={error !== undefined}>
			<NumberInput
				id={name}
				value={value}
				min={1}
				max={99}
				onChange={(event, newValue) => handleNumberChange(event, newValue)}
				readonly={readonly}
			/>
			{error && <FormHelperText>{error.message}</FormHelperText>}
		</FormControl>
	);
};

export default RenderNumberField;
