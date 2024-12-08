import React, { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface ButtonBaseProps {
	type?: 'button' | 'submit' | 'reset'; // HTML 기본 type 속성
	buttonType?:
		| 'default'
		| 'save'
		| 'add'
		| 'search'
		| 'cancel'
		| 'remove'
		| 'register'; // 커스텀 버튼 유형
	device?: 'pc' | 'mobile';
	size?: 'deault' | 'small';
	variant?: 'text' | 'outlined' | 'contained';
	color?:
		| 'inherit'
		| 'primary'
		| 'secondary'
		| 'success'
		| 'error'
		| 'info'
		| 'warning';
	fullWidth?: boolean; // 버튼의 너비
	disabled?: boolean; // 버튼 비활성화 여부
	onClick?: () => void;
	children?: ReactNode;
}

const ButtonBase: FC<ButtonBaseProps> = ({
	type = 'button',
	buttonType = 'default',
	device = 'pc',
	size = 'default',
	variant = 'text',
	color = 'primary',
	fullWidth = false,
	disabled = false,
	onClick,
	children,
}): JSX.Element => {
	const getButtonSx = (): SxProps<Theme> => {
		const baseStyle = {
			px: device === 'mobile' ? 6 : 6,
			py: device === 'mobile' ? 1 : 0.5,
			fontSize: device === 'mobile' ? { xs: '10px', sm: '12px' } : '13px',
		};

		const widthStyle = {
			width: device === 'mobile' ? '100%' : 'auto',
		};

		if (size === 'small') {
			baseStyle.px = 4;
			baseStyle.py = 0.8;
			baseStyle.fontSize = '8px';
		}

		switch (buttonType) {
			case 'save':
				return {
					...baseStyle,
					fontWeight: 'bold',
					bgcolor: '#7940B6',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#9373B5',
					},
				};
			case 'add':
				return {
					...baseStyle,
					fontWeight: 'bold',
					bgcolor: '#363658',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#757595',
					},
				};
			case 'search':
				return {
					...baseStyle,
					fontWeight: 'bold',
					bgcolor: '#363658',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#757595',
					},
				};
			case 'cancel':
				return {
					...baseStyle,
					...widthStyle,
					fontWeight: 'bold',
					bgcolor: '#363658',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#757595',
					},
				};
			case 'remove':
				return {
					...baseStyle,
					fontWeight: 'bold',
					bgcolor: '#7D7D7D',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#A1A1A1',
					},
				};
			case 'register':
				return {
					...baseStyle,
					fontWeight: 'bold',
					bgcolor: '#7940B6',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#9373B5',
					},
				};
			default:
				return {};
		}
	};

	return (
		<Button
			type={type}
			variant={variant}
			color={color}
			fullWidth={fullWidth}
			disabled={disabled}
			onClick={onClick}
			sx={getButtonSx()}
		>
			{children}
		</Button>
	);
};

export default ButtonBase;
