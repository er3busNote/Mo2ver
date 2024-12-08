import React, { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface ButtonGoodsProps {
	type?: 'button' | 'submit' | 'reset'; // HTML 기본 type 속성
	buttonType?: 'default' | 'cart' | 'buynow' | 'search' | 'register'; // 커스텀 버튼 유형
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

const ButtonGoods: FC<ButtonGoodsProps> = ({
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
			px: device === 'mobile' ? 6 : 6,
			py: device === 'mobile' ? 1 : 0.5,
			fontSize: device === 'mobile' ? { xs: '10px', sm: '12px' } : '13px',
		};

		const widthStyle = {
			width: device === 'mobile' ? '100%' : 'auto',
		};

		switch (buttonType) {
			case 'cart':
				return {
					mt: 2,
					py: 1,
					width: '48%',
					fontSize: '14px',
					fontWeight: 'bold',
					bgcolor: '#7940B6',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#9373B5',
					},
				};
			case 'buynow':
				return {
					mt: 2,
					py: 1,
					width: '48%',
					fontSize: '14px',
					fontWeight: 'bold',
					bgcolor: '#000',
					border: '1px solid #000',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#0f0f0f',
					},
				};
			case 'search':
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
			case 'register':
				return {
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

export default ButtonGoods;
