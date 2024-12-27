import React, { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { isMobile } from 'react-device-detect';

interface ButtonDialogProps {
	type?: 'button' | 'submit' | 'reset'; // HTML 기본 type 속성
	buttonType?:
		| 'default'
		| 'search'
		| 'select'
		| 'cancel'
		| 'moveall'
		| 'moveselected'; // 커스텀 버튼 유형
	device?: 'pc' | 'mobile';
	size?: 'small' | 'medium' | 'large';
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

const ButtonDialog: FC<ButtonDialogProps> = ({
	type = 'button',
	buttonType = 'default',
	device = 'pc',
	variant = 'text',
	color = 'primary',
	size = 'medium',
	fullWidth = false,
	disabled = false,
	onClick,
	children,
}): JSX.Element => {
	const getButtonSx = (): SxProps<Theme> => {
		const baseStyle = {
			px: device === 'mobile' ? 2 : 4,
			my: device === 'mobile' ? 0.2 : 0.5,
			fontSize: device === 'mobile' ? { xs: '10px', sm: '12px' } : '12px',
		};

		const widthStyle = {
			mx: device === 'mobile' ? (isMobile ? 0.5 : 0) : 0,
			my: device === 'mobile' ? (isMobile ? 0 : 0.5) : 0.5,
			lineHeight: device === 'mobile' ? 1.05 : 1.25,
			minWidth: device === 'mobile' ? 30 : 40,
			fontSize:
				device === 'mobile'
					? { xs: '0.6125rem', sm: '0.8125rem' }
					: '0.8125rem',
		};

		switch (buttonType) {
			case 'search':
				return {
					...baseStyle,
					fontWeight: 'bold',
					bgcolor: '#F4F5FB',
					borderRadius: 0,
					border: '1px solid #87A0F4',
					color: '#87A0F4',
					'&:hover': {
						bgcolor: '#EFF1FF',
						border: '1px solid #93ACFF',
					},
				};
			case 'select':
				return {
					px: device === 'mobile' ? 5 : 6,
					py: 0.8,
					fontSize: device === 'mobile' ? { xs: '8px', sm: '10px' } : '10px',
					fontWeight: 'bold',
					bgcolor: '#7C62FC',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#917EF1',
					},
				};
			case 'cancel':
				return {
					px: device === 'mobile' ? 5 : 6,
					py: 0.8,
					fontSize: device === 'mobile' ? { xs: '8px', sm: '10px' } : '10px',
					fontWeight: 'bold',
					bgcolor: '#555555',
					border: '1px solid #757595',
					borderRadius: 0,
					color: '#fff',
					'&:hover': {
						bgcolor: '#7F7F7F',
					},
				};
			case 'moveall':
				return {
					...widthStyle,
					bgcolor: '#7C62FE',
					color: '#fff',
					'&:hover': {
						bgcolor: '#917EF1',
					},
				};
			case 'moveselected':
				return {
					...widthStyle,
					bgcolor: '#EBEBEB',
					'&:hover': {
						bgcolor: '#EFEFEF',
						border: '1px solid #D4D4D4',
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
			size={size}
			onClick={onClick}
			sx={getButtonSx()}
		>
			{children}
		</Button>
	);
};

export default ButtonDialog;
