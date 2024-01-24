import React, { FC } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TitleState } from '../../store/types';
import {
	changeTitle,
	changeDescription,
	changePrevDescription,
	changeNext,
} from '../../store/index';
import { Box, IconButton, Typography, Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Title from '../Title';

interface AdminSubHeaderProps {
	title?: string;
	description?: string;
}

const AdminSubHeader: FC<AdminSubHeaderProps> = ({
	title,
	description,
}): JSX.Element => {
	const dispatch = useDispatch();

	const dashboardClick = () => {
		dispatch(changeTitle('대시보드'));
		dispatch(changeDescription(''));
		dispatch(changePrevDescription(description ?? ''));
		dispatch(changeNext());
	};
	return (
		<Box
			sx={{
				px: { xs: 4, sm: 10 },
				pt: 2,
				pb: 1,
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Box sx={{ pt: 2 }}>
				<Title>{title}</Title>
			</Box>
			<Breadcrumbs sx={{ pt: 1 }} separator="›" aria-label="breadcrumb">
				<IconButton
					component={Link}
					to="/admin"
					sx={{
						px: 0.5,
						color: 'black',
						'&:hover': { color: 'gray', textDecoration: 'underline' },
					}}
					onClick={() => dashboardClick()}
				>
					<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
					<Typography sx={{ fontSize: { xs: '11px', sm: '12px', lg: '14px' } }}>
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
						{title}
					</Typography>
				)}
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
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(AdminSubHeader);
