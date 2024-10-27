import React, { FC, Fragment, useRef, ChangeEvent } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Autocomplete, ButtonBase, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close, FileUploadOutlined } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
	display: 'none',
});

interface RenderFileFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
}

const RenderFileField: FC<RenderFileFieldProps> = ({
	field: { onChange, value, name },
}) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const handleCarouselFiles = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files;
		if (selectedFiles) {
			onChange((prevFiles: Array<File>) => [...prevFiles, ...selectedFiles]);
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
				getOptionLabel={(option: File) => option.name}
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

export default RenderFileField;
