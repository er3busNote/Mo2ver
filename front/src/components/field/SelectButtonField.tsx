import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Grid, Button } from '@mui/material';
import {
	fontSize_xs,
	fontSize_sm,
	fontSize_md,
	fontSize_lg,
} from '@utils/style';

interface RenderSelectButtonFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	datas: Record<string, string>;
	label: string;
	readonly?: boolean;
}

const RenderSelectButtonField: FC<RenderSelectButtonFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	datas,
}) => {
	return (
		<Grid container spacing={1}>
			{Object.entries(datas).map(([key, label]) => (
				<Grid item xs={4} key={key}>
					<Button
						fullWidth
						variant={value === key ? 'contained' : 'outlined'}
						color={value === key ? 'primary' : 'inherit'}
						sx={{
							fontSize: {
								xs: fontSize_xs,
								sm: fontSize_sm,
								md: fontSize_md,
								lg: fontSize_lg,
							},
						}}
						onClick={() => onChange(key)}
					>
						{label}
					</Button>
				</Grid>
			))}
		</Grid>
	);
};

export default RenderSelectButtonField;
