import React, { FC, Fragment, useEffect, useRef, ChangeEvent } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { FileData } from '../../api/types';
import Api from '../../api';
import { Autocomplete, ButtonBase, TextField } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { Close, FileUploadOutlined } from '@mui/icons-material';
import useCSRFToken from '../../hooks/useCSRFToken';
import useFieInfo from '../../hooks/cmmn/useFileInfo';

const fontSize_xs = '11px';
const fontSize_sm = '12px';
const fontSize_md = '13px';
const fontSize_lg = '13px';

const VisuallyHiddenInput = styled('input')({
	display: 'none',
});

interface RenderFileFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	member: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

const RenderFileField: FC<RenderFileFieldProps> = ({
	field: { onChange, value, name },
	member,
	image,
}) => {
	const csrfData = useCSRFToken({ member });
	const [dataFiles, setFiles] = useFieInfo({ image, csrfData });
	useEffect(() => {
		if (dataFiles && dataFiles.length > 0 && dataFiles[0].fileSize > 0) {
			onChange([...value, ...dataFiles]);
		}
	}, [dataFiles]);

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const handleCarouselFiles = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files;
		if (selectedFiles) {
			setFiles(selectedFiles);
		}
	};
	const handleCarouselInput = () => {
		fileInputRef.current?.click();
	};

	const textInput: SxProps<Theme> = {
		color: 'inherit',
		'& .MuiInputBase-root , & .MuiInputBase-input': {
			py: 0.5,
			paddingRight: '1rem !important',
			cursor: 'pointer',
		},
		'& .MuiChip-root': {
			height: '28px',
			maxWidth: { xs: '180px', sm: '260px' },
		},
		'& .MuiChip-label': {
			fontSize: {
				xs: fontSize_xs,
				sm: fontSize_sm,
				md: fontSize_md,
				lg: fontSize_lg,
			},
		},
	};

	const autoComplete: SxProps<Theme> = {
		caretColor: 'transparent',
		cursor: 'pointer',
		'& .Mui-disabled,& .MuiInputLabel-root': {
			color: 'rgba(0,0,0,0.6)',
			backgroundColor: 'transparent',
		},
	};

	return (
		<Fragment>
			<Autocomplete
				multiple
				options={value}
				getOptionLabel={(option: FileData) => option?.fileName}
				renderInput={(params) => (
					<TextField
						{...params}
						disabled
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<Fragment>
									{value.length > 0 && (
										<ButtonBase
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												onChange([]);
											}}
											sx={{
												paddingRight: '0.5rem',
											}}
										>
											<Close />
										</ButtonBase>
									)}
									<ButtonBase>
										<FileUploadOutlined onClick={handleCarouselInput} />
									</ButtonBase>
								</Fragment>
							),
						}}
						sx={textInput}
					/>
				)}
				value={value}
				onChange={(event, newValue) => {
					event.preventDefault();
					onChange(newValue);
				}}
				open={false}
				sx={autoComplete}
			/>
			<VisuallyHiddenInput
				type="file"
				ref={fileInputRef}
				name={name}
				accept="image/png, image/jpeg"
				onChange={handleCarouselFiles}
				multiple
			/>
		</Fragment>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(RenderFileField);
