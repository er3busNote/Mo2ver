import React, { FC, Dispatch, SetStateAction } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TitleState } from '../../../store/types';
import { changeTitle, changeDescription } from '../../../store/index';
import { Box, IconButton, Typography, Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SwitchGridTabButton from './SwitchGridTabButton';
import Title from '../../Title';

interface EventSubHeaderProps {
	title?: string;
	description?: string;
	subtitle?: string;
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

	const dashboardClick = () => {
		dispatch(changeTitle('홈'));
		dispatch(changeDescription(''));
	};
	return (
		<Box
			sx={{
				px: { xs: 4, sm: 10 },
				pt: 2,
				pb: 1,
				display: 'flex',
				justifyContent: 'space-between',
				borderBottom: '2px #F0F0F0 solid',
			}}
		>
			<Box sx={{ pt: 2 }}>
				<Title>{subtitle ? subtitle : title}</Title>
			</Box>
			{change ? (
				<SwitchGridTabButton branch={branch} setSwitch={setSwitch} />
			) : (
				<Breadcrumbs sx={{ pt: 1 }} separator="›" aria-label="breadcrumb">
					<IconButton
						component={Link}
						to="/"
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

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(EventSubHeader);
