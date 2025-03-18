import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../../../store/types';
import EventList from './EventList';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface EventProps {
	title: string;
	description: string;
}

const EventPC: FC<EventProps> = ({ title, description }): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<EventList title={title} description={description} />
		</Box>
	);
};

const EventMobile: FC<EventProps> = ({ title, description }): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<EventList title={title} description={description} />
		</Box>
	);
};

const EventPage: FC<EventProps> = ({ title, description }): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<>
			{isDesktop && <EventPC title={title} description={description} />}
			{isMobile && <EventMobile title={title} description={description} />}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(EventPage);
