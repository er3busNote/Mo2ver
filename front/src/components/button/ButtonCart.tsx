import React, { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface ButtonCartProps {
	type?: 'button' | 'submit' | 'reset'; // HTML 기본 type 속성
	buttonType?:
		| 'default'
		| 'buynow'
		| 'cartremove'
		| 'selectbuynow'
		| 'allbuynow'; // 커스텀 버튼 유형
	device?: 'pc' | 'mobile';
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

const ButtonCart: FC<ButtonCartProps> = ({
	type = 'button',
	buttonType = 'default',
	device = 'pc',
	variant = 'text',
	color = 'primary',
	fullWidth = false,
	disabled = false,
	onClick,
	children,
}): JSX.Element => {
	const getButtonSx = (): SxProps<Theme> => {
		const baseStyle = {
			fontSize: device === 'mobile' ? { xs: '10px', sm: '12px' } : '14px',
			borderRadius: device === 'mobile' ? 1 : 2,
		};

		const paddingStyle = {
			px: device === 'mobile' ? '5px' : 'auto',
			py: 1,
		};

		const heightStyle = {
			py: device === 'mobile' ? 1 : 'auto',
			height: device === 'mobile' ? 'auto' : '48%',
		};

		switch (buttonType) {
			case 'buynow':
				return {
					...baseStyle,
					...paddingStyle,
					mt: 2,
					width: '100%',
					fontWeight: 'bold',
					bgcolor: '#000',
					border: '1px solid #000',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#0f0f0f',
					},
				};
			case 'cartremove':
				return {
					...baseStyle,
					...paddingStyle,
					mt: 0.5,
					width: '100%',
					fontWeight: 'bold',
					bgcolor: '#7940B6',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#9373B5',
					},
				};
			case 'selectbuynow':
				return {
					...baseStyle,
					...heightStyle,
					width: '100%',
					fontWeight: 'bold',
					bgcolor: '#000',
					border: '1px solid #000',
					color: '#fff',
					'&:hover': {
						bgcolor: '#0f0f0f',
					},
				};
			case 'allbuynow':
				return {
					...baseStyle,
					...heightStyle,
					width: '100%',
					fontWeight: 'bold',
					bgcolor: '#7940B6',
					border: '1px solid #757595',
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

export default ButtonCart;
