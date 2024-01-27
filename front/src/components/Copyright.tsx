import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeNext, menuActive } from '../store/index';
import { TitleInfo } from '../store/types';
import { Link, Typography, TypographyProps } from '@mui/material';

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
		const titleData: TitleInfo = {
			title: '홈',
			description: '메인',
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive('/'));
		navigate('/');
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
