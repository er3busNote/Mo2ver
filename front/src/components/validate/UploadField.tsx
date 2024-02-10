import React, { FC } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

interface RenderUploadFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
}

const RenderUploadField: FC<RenderUploadFieldProps> = ({
	field: { onChange, value },
}) => {
	console.log(value);
	return (
		<Button
			component="label"
			variant="contained"
			startIcon={<CloudUploadIcon />}
			sx={{
				px: { xs: '10px', sm: '12px', lg: '16px' },
				py: { xs: '3px', sm: '6px' },
				fontSize: { xs: '7px', sm: '8px', md: '11px', lg: '12px' },
			}}
			disabled={value !== undefined}
		>
			Upload file
			<VisuallyHiddenInput
				type="file"
				accept="image/png, image/jpeg"
				onChange={onChange}
			/>
		</Button>
	);
};

export default RenderUploadField;
