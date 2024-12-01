import React, { FC, useRef } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Box, Button, IconButton, FormHelperText } from '@mui/material';
import { SxProps, Theme, styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
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
	field: { onChange, value, name },
	fieldState: { error },
}) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const uploadBox: SxProps<Theme> = {
		display: 'grid',
		justifyContent: 'center',
	};
	const helperText: SxProps<Theme> = {
		pt: 0.5,
		display: 'flex',
		justifyContent: 'center',
		color: '#d32f2f',
	};
	return (
		<Box sx={uploadBox}>
			<Box>
				<Button
					component="label"
					variant="contained"
					startIcon={<CloudUploadIcon />}
					sx={{
						px: { xs: '10px', sm: '12px', lg: '16px' },
						py: { xs: '3px', sm: '4px' },
						fontSize: { xs: '7px', sm: '8px', md: '11px', lg: '12px' },
					}}
					disabled={value !== undefined}
				>
					Upload file
					<VisuallyHiddenInput
						type="file"
						ref={fileInputRef}
						name={name}
						defaultValue={value}
						accept="image/png, image/jpeg"
						onChange={(e) => {
							const file = e.target.files && e.target.files[0];
							if (file) {
								onChange(file);
							}
						}}
					/>
				</Button>
				{value !== undefined && (
					<IconButton
						size="small"
						onClick={() => {
							if (fileInputRef.current) fileInputRef.current.value = '';
							onChange(undefined);
						}}
					>
						<ClearIcon />
					</IconButton>
				)}
			</Box>
			{error && (
				<FormHelperText sx={helperText}>{error.message}</FormHelperText>
			)}
		</Box>
	);
};

export default RenderUploadField;
