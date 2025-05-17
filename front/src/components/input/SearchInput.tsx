import React, { FC, ChangeEvent, KeyboardEvent } from 'react';
import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		border: '2px solid #ddd',
		borderRadius: '7px',
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			// PC
			fontSize: '14px',
		},
		[theme.breakpoints.down('sm')]: {
			// Mobile
			fontSize: '12px',
		},
		width: '28ch',
		'&:focus': {
			width: '38ch',
		},
	},
}));

interface SearchInputProps {
	placeholder: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = ({
	placeholder,
	onChange,
	onKeyPress,
}): JSX.Element => {
	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder={placeholder}
				onChange={onChange}
				onKeyPress={onKeyPress}
				inputProps={{ 'aria-label': 'search' }}
			/>
		</Search>
	);
};

export default SearchInput;
