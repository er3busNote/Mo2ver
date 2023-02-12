import React, { FC } from 'react';
import { ControllerRenderProps, UseFormStateReturn } from 'react-hook-form';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';

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
	return (
		<RadioGroup row name={name} value={value} onChange={onChange}>
			{datas.map((data: RadioProps) => {
				return (
					<FormControlLabel
						key={data.value}
						value={data.value}
						control={
							<Radio
								size="small"
								sx={{
									color: '#505056',
									'&.Mui-checked': {
										color: '#EE7957',
									},
								}}
							/>
						}
						label={data.label}
					/>
				);
			})}
		</RadioGroup>
	);
};

export default RenderRadioField;
