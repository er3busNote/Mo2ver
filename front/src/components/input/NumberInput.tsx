import React, { forwardRef, ForwardedRef } from 'react';
import {
	Unstable_NumberInput as BaseNumberInput,
	NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const drawerMenuLimit = 768;

const StyledInputRoot = styled('div')(({ theme }) => ({
	fontWeight: '400',
	color: theme.palette.mode === 'dark' ? grey[300] : grey[500],
	display: 'flex',
	flexFlow: 'row nowrap',
	justifyContent: 'center',
	alignItems: 'center',
}));

const StyledInput = styled('input')(({ theme }) => ({
	fontSize: '0.875rem',
	fontFamily: 'inherit',
	fontWeight: '400',
	lineHeight: '1.375',
	color: theme.palette.mode === 'dark' ? grey[300] : grey[900],
	background: theme.palette.mode === 'dark' ? grey[900] : '#fff',
	border: `1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]}`,
	boxShadow: `0px 2px 4px ${
		theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
	}`,
	[theme.breakpoints.up(drawerMenuLimit)]: {
		// PC
		borderRadius: '8px',
		margin: '0 8px',
		padding: '10px 12px',
		width: '4rem',
	},
	[theme.breakpoints.down(drawerMenuLimit)]: {
		// Mobile
		padding: '2px',
		width: '3rem',
	},
	outline: 0,
	minWidth: 0,
	textAlign: 'center',
	'&:hover': {
		borderColor: blue[400],
	},
	'&:focus': {
		borderColor: blue[400],
		boxShadow: `0 0 0 3px ${
			theme.palette.mode === 'dark' ? blue[700] : blue[200]
		}`,
	},
	'&:focus-visible': {
		outline: 0,
	},
}));

const StyledButton = styled('button')(({ theme }) => ({
	fontSize: '0.875rem',
	boxSizing: 'border-box',
	lineHeight: '1.5',
	border: '1px solid',
	borderColor: theme.palette.mode === 'dark' ? grey[800] : grey[200],
	background: theme.palette.mode === 'dark' ? grey[900] : grey[50],
	color: theme.palette.mode === 'dark' ? grey[200] : grey[900],
	[theme.breakpoints.up(drawerMenuLimit)]: {
		// PC
		borderRadius: '999px',
		width: '32px',
		height: '32px',
	},
	[theme.breakpoints.down(drawerMenuLimit)]: {
		// Mobile
		width: '20px',
		height: '25px',
	},
	display: 'flex',
	flexFlow: 'row nowrap',
	justifyContent: 'center',
	alignItems: 'center',
	transitionProperty: 'all',
	transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	transitionDuration: '120ms',
	'&:hover': {
		cursor: 'pointer',
		background: theme.palette.mode === 'dark' ? blue[700] : blue[500],
		borderColor: theme.palette.mode === 'dark' ? blue[500] : blue[400],
		color: grey[50],
	},
	'&:focus-visible': {
		outline: 0,
	},
	'&.increment': {
		order: 1,
	},
}));

const NumberInput = forwardRef(function CustomNumberInput(
	props: NumberInputProps,
	ref: ForwardedRef<HTMLDivElement>
) {
	return (
		<BaseNumberInput
			slots={{
				root: StyledInputRoot,
				input: StyledInput,
				incrementButton: StyledButton,
				decrementButton: StyledButton,
			}}
			slotProps={{
				incrementButton: {
					children: <AddIcon fontSize="small" />,
					className: 'increment',
				},
				decrementButton: {
					children: <RemoveIcon fontSize="small" />,
				},
			}}
			{...props}
			ref={ref}
		/>
	);
});

export default NumberInput;
