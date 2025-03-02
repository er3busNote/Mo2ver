import React, { FC, useEffect, useRef, ChangeEvent } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../api';
import useCSRFToken from '../../hooks/useCSRFToken';
import useFieInfo from '../../hooks/cmmn/useFileInfo';
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
	member: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

const RenderUploadField: FC<RenderUploadFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	member,
	image,
}) => {
	const csrfData = useCSRFToken({ member });
	const [dataFiles, setFiles] = useFieInfo({ image, csrfData });
	useEffect(() => {
		if (dataFiles && dataFiles.length > 0 && dataFiles[0].fileSize > 0) {
			onChange(dataFiles[0].fileAttachCode);
		}
	}, [dataFiles]);

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files;
		if (selectedFiles) {
			setFiles(selectedFiles);
		}
	};

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
					disabled={value !== ''}
				>
					Upload file
					<VisuallyHiddenInput
						type="file"
						ref={fileInputRef}
						name={name}
						accept="image/png, image/jpeg"
						onChange={handleFiles}
					/>
				</Button>
				{value !== '' && (
					<IconButton
						size="small"
						onClick={() => {
							if (fileInputRef.current) fileInputRef.current.value = '';
							onChange('');
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

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(RenderUploadField);
