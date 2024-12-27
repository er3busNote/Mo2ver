import React, { FC, useState, KeyboardEvent } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import {
	Autocomplete,
	Chip,
	MenuItem,
	TextField,
	FormControl,
	FormHelperText,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

const fontSize_xs = '11px';
const fontSize_sm = '12px';
const fontSize_md = '13px';
const fontSize_lg = '13px';

interface RenderSelectChipFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	datas: Array<string>;
	label: string;
}

const RenderSelectChipField: FC<RenderSelectChipFieldProps> = ({
	field: { onChange, value, name },
	fieldState: { error },
	datas,
	label,
}) => {
	const [inputValue, setInputValue] = useState('');

	const handleAddChip = (event: KeyboardEvent<HTMLInputElement>) => {
		const addValue = (event.target as HTMLInputElement).value.trim();

		if (event.key === 'Enter' && addValue && !value.includes(addValue)) {
			value.push(addValue);
			onChange(value);
			setInputValue('');
		}
	};

	const handleDeleteChip = (chipToDelete: string) => {
		onChange(value.filter((chip: string) => chip !== chipToDelete));
	};

	const selectForm: SxProps<Theme> = {
		width: { xs: 185, sm: 212 },
		'.MuiInputLabel-shrink': {
			ml: { xs: 1, sm: 0.5 },
			mt: { xs: 1, sm: 0.5 },
		},
		overflowX: 'visible',
	};
	const menuText: SxProps<Theme> = {
		fontSize: {
			xs: fontSize_xs,
			sm: fontSize_sm,
			md: fontSize_md,
			lg: fontSize_lg,
		},
		minHeight: { xs: '37px !important', sm: '42px !important' },
	};

	const textInput: SxProps<Theme> = {
		color: 'inherit',
		'& .MuiInputBase-root , & .MuiInputBase-input': {
			py: 0.5,
			paddingRight: '1rem !important',
			cursor: 'pointer',
			fontSize: {
				xs: fontSize_xs,
				sm: fontSize_sm,
				md: fontSize_md,
				lg: fontSize_lg,
			},
		},
		'& .MuiOutlinedInput-notchedOutline legend': {
			paddingRight: '40px',
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
		overflowX: 'visible',
	};

	return (
		<FormControl sx={selectForm} error={error !== undefined}>
			<Autocomplete
				multiple
				freeSolo // 사용자가 목록 외에 텍스트를 입력할 수 있게 함
				options={datas}
				value={value}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					event.preventDefault();
					setInputValue(newInputValue);
				}}
				onChange={(event, newValue) => {
					event.preventDefault();
					onChange(newValue);
				}}
				sx={autoComplete}
				renderTags={(tagValue, getTagProps) =>
					tagValue.map((option: string, index: number) => {
						const { key, ...otherProps } = getTagProps({ index });
						return (
							<Chip
								key={key}
								label={option}
								{...otherProps}
								onDelete={() => handleDeleteChip(option)}
							/>
						);
					})
				}
				renderOption={(props, option, { selected }) => {
					return (
						<MenuItem key={option} value={option} sx={menuText} {...props}>
							{option}
						</MenuItem>
					);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						id={name}
						name={name}
						label={label}
						onKeyDown={handleAddChip}
						variant="outlined"
						sx={textInput}
						InputLabelProps={{
							sx: {
								mt: -0.6,
								fontSize: {
									xs: fontSize_xs,
									sm: fontSize_sm,
									md: fontSize_md,
									lg: fontSize_lg,
								},
								zIndex: 1,
							},
						}}
					/>
				)}
			/>
			{error && <FormHelperText>{error.message}</FormHelperText>}
		</FormControl>
	);
};

export default RenderSelectChipField;
