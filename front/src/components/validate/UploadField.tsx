import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
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
import DialogImage from '../../components/dialog/DialogImage';
import { Box, IconButton, FormHelperText } from '@mui/material';
import { SxProps, Theme, styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

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
		setOpen(false); // Dialog 닫기
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
							file={value}
							image={image}
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
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(RenderUploadField);
