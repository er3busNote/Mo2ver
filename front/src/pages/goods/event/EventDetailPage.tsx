import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../../../store/types';
import EventDetail from './EventDetail';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface EventDetailProps {
	title: string;
	description: string;
}

const EventDetailPC: FC<EventDetailProps> = ({
	title,
	description,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<EventDetail title={title} description={description} />
		</Box>
	);
};

const EventDetailMobile: FC<EventDetailProps> = ({
	title,
	description,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<EventDetail title={title} description={description} />
		</Box>
	);
};

const EventDetailPage: FC<EventDetailProps> = ({
	title,
	description,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<>
			{isDesktop && <EventDetailPC title={title} description={description} />}
			{isMobile && (
				<EventDetailMobile title={title} description={description} />
			)}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(EventDetailPage);
