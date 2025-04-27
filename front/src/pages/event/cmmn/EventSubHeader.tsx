import React, { FC, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeNext, menuActive } from '@store/index';
import { TitleInfo } from '@store/types';
import { Box, IconButton, Typography, Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SwitchGridTabButton from './SwitchGridTabButton';
import Title from '@components/Title';

interface EventSubHeaderProps {
	title: string;
	description: string;
	subtitle: string;
	change: boolean;
	branch: boolean;
	setSwitch: Dispatch<SetStateAction<boolean>>;
}

const EventSubHeader: FC<EventSubHeaderProps> = ({
	title,
	description,
	subtitle,
	change,
	branch,
	setSwitch,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const dashboardClick = () => {
		const titleData: TitleInfo = {
			title: '홈',
			description: '',
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive('/'));
		navigate('/');
	};
	return (
		<Box
			sx={{
				mx: { xs: 3, sm: 3 },
				px: { xs: 3, sm: 6 },
				pt: 2,
				pb: 1,
				display: 'flex',
				justifyContent: 'space-between',
				borderBottom: '2px #F0F0F0 solid',
			}}
		>
			<Box sx={{ pt: 2 }}>
				<Title>{subtitle}</Title>
			</Box>
			{change ? (
				<SwitchGridTabButton branch={branch} setSwitch={setSwitch} />
			) : (
				<Breadcrumbs sx={{ pt: 1 }} separator="›" aria-label="breadcrumb">
					<IconButton
						sx={{
							px: 0.5,
							color: 'black',
							'&:hover': { color: 'gray', textDecoration: 'underline' },
						}}
						onClick={() => dashboardClick()}
					>
						<HomeIcon sx={{ mr: 0.5 }} color="secondary" fontSize="inherit" />
						<Typography
							sx={{ fontSize: { xs: '11px', sm: '12px', lg: '14px' } }}
						>
							홈
						</Typography>
					</IconButton>
					{description && description !== '' && (
						<Typography
							sx={{
								display: 'flex',
								alignItems: 'center',
								fontSize: { xs: '11px', sm: '12px', lg: '14px' },
							}}
							color="text.primary"
						>
							{description}
						</Typography>
					)}
				</Breadcrumbs>
			)}
		</Box>
	);
};

export default EventSubHeader;
