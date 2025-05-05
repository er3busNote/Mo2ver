import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link, Typography, TypographyProps } from '@mui/material';
import goToMenu from '@navigate/menu/goToMenu';

interface CopyrightProps extends TypographyProps {
	title: string;
	description: string;
}

const Copyright: FC<CopyrightProps> = ({
	title,
	description,
	...props
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const dashboardClick = () => {
		goToMenu({
			title: '홈',
			description: '메인',
			prevTitle: title,
			prevDescription: description,
			path: '/',
			dispatch,
			navigate,
		});
	};

	return (
		<Typography variant="body2" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" onClick={() => dashboardClick()}>
				Er3busNote
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

export default Copyright;
