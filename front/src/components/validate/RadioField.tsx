import React, { FC } from 'react';
import { ControllerRenderProps, UseFormStateReturn } from 'react-hook-form';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

const fontSize_xs = '11px';
const fontSize_sm = '12px';
const fontSize_md = '13px';
const fontSize_lg = '13px';

interface RadioProps {
	value: any;
	label: string;
}

interface RenderRadioFieldProps {
	field: ControllerRenderProps<any, any>;
	formState: UseFormStateReturn<any>;
	datas: Array<RadioProps>;
}

const RenderRadioField: FC<RenderRadioFieldProps> = ({
	field: { onChange, value, name },
	datas,
}) => {
	const radioForm: SxProps<Theme> = {
		'.MuiFormControlLabel-label': {
			fontSize: {
				xs: fontSize_xs,
				sm: fontSize_sm,
				md: fontSize_md,
				lg: fontSize_lg,
			},
		},
	};
	const radioInput: SxProps<Theme> = {
		color: '#505056',
		'&.Mui-checked': {
			color: '#EE7957',
		},
	};
	return (
		<RadioGroup row name={name} value={value} onChange={onChange}>
			{datas.map((data: RadioProps) => {
				return (
					<FormControlLabel
						key={data.value}
						value={data.value}
						sx={radioForm}
						control={<Radio size="small" sx={radioInput} />}
						label={data.label}
					/>
				);
			})}
		</RadioGroup>
	);
};

export default RenderRadioField;
