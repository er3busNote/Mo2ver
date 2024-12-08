import React, { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface ButtonTagProps {
	type?: 'button' | 'submit' | 'reset'; // HTML 기본 type 속성
	buttonType?: 'default' | 'popular' | 'detail'; // 커스텀 버튼 유형
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

const ButtonTag: FC<ButtonTagProps> = ({
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
		const widthStyle = {
			width: device === 'mobile' ? { xs: 'max-content' } : 'auto',
		};

		switch (buttonType) {
			case 'popular':
				return {
					...widthStyle,
					fontSize: '10px',
					border: '1px solid #ccc',
					color: '#1992DF',
					'&:hover': {
						color: '#fff',
						bgcolor: '#1992DF',
						border: '1px solid #1992DF',
					},
				};
			case 'detail':
				return {
					mr: 1,
					px: 1.5,
					py: 0.5,
					minWidth: 10,
					fontSize: '10px',
					fontWeight: 'bold',
					border: '1px solid #e8e8e8',
					color: '#b2b2b2',
					'&:hover': {
						color: '#b2b2b2',
						bgcolor: '#f3f3f3',
						border: '1px solid #e8e8e8',
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

export default ButtonTag;
