import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import useCSRFToken from '@services/useCSRFToken';
import useFileInfo from '@services/cmmn/useFileInfo';
import DialogImage from '@components/dialog/DialogImage';
import { Box, IconButton, FormHelperText } from '@mui/material';
import { SxProps, Theme, styled } from '@mui/material/styles';
import {
	Clear as ClearIcon,
	CloudUpload as CloudUploadIcon,
	ImageSearch as ImageSearchIcon,
} from '@mui/icons-material';

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

interface RenderFileFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	member: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

const RenderUploadField: FC<RenderFileFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	member,
	file,
}) => {
	const csrfData = useCSRFToken({ member });
	const { data: dataFiles, setFiles } = useFileInfo({ file, csrfData });
	const [open, setOpen] = useState<boolean>(false);
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

	const handleInput = () => {
		fileInputRef.current?.click();
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
				<IconButton size="small" disabled={value !== ''} onClick={handleInput}>
					<CloudUploadIcon />
				</IconButton>
				<VisuallyHiddenInput
					type="file"
					ref={fileInputRef}
					name={name}
					accept="image/png, image/jpeg"
					onChange={handleFiles}
				/>
				{value !== '' && (
					<>
						<IconButton size="small" onClick={() => handleOpen()}>
							<ImageSearchIcon />
						</IconButton>
						<DialogImage
							open={open}
							attachFile={value}
							file={file}
							handleClose={handleClose}
						/>
					</>
				)}
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
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(null, mapDispatchToProps)(RenderUploadField);
