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
import { styled } from '@mui/material/styles';
import { Close, FileUploadOutlined } from '@mui/icons-material';
import useCSRFToken from '../../hooks/useCSRFToken';
import useFieInfo from '../../hooks/cmmn/useFileInfo';

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
		if (dataFiles.length > 0) {
			onChange((prevFiles: Array<FileData>) => [...prevFiles, ...dataFiles]);
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
						sx={{
							color: 'inherit',
							'& .MuiInputBase-root , & .MuiInputBase-input': {
								paddingRight: '1rem !important',
								cursor: 'pointer',
							},
						}}
					/>
				)}
				value={value}
				onChange={(event, newValue) => {
					event.preventDefault();
					onChange(newValue);
				}}
				open={false}
				sx={{
					caretColor: 'transparent',
					cursor: 'pointer',
					'& .Mui-disabled,& .MuiInputLabel-root': {
						color: 'rgba(0,0,0,0.6)',
						backgroundColor: 'transparent',
					},
				}}
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
