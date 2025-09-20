import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SvgIcon, IconButton } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import goToMenu from '@navigate/menu/goToMenu';
import Icon from '@assets/logo.svg?react';

interface MainIconProps {
	type?: 'deault' | 'admin';
	title: string;
	description: string;
}

const MainIcon: FC<MainIconProps> = ({
	type = 'default',
	title,
	description,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const activeClick = () => {
		goToMenu({
			title: type === 'admin' ? '대시보드' : '홈',
			description: type === 'admin' ? '' : '메인',
			prevTitle: title,
			prevDescription: description,
			path: type === 'admin' ? '/admin' : '/',
			dispatch,
			navigate,
		});
	};

	const buttonStyle: SxProps<Theme> = {
		p: 0,
	};

	const iconStyle: SxProps<Theme> = {
		width: type == 'default' ? '8em' : '5em',
		height: type == 'default' ? '5em' : '3em',
		'& g': {
			fill: type == 'default' ? '#6A3DCB' : 'black',
		},
	};

	return (
		<IconButton disableRipple onClick={activeClick} sx={buttonStyle}>
			<SvgIcon component={Icon} sx={iconStyle} inheritViewBox />
		</IconButton>
	);
};

export default MainIcon;
