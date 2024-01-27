import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import EventList from '../components/goods/event/EventList';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

interface EventProps {
	title: string;
	description: string;
}

const EventPC: FC<EventProps> = ({ title, description }): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<Box
					sx={{
						width: '940px',
						display: 'inline-block',
					}}
				>
					<EventList title={title} description={description} />
				</Box>
			)}
		</>
	);
};

const EventMobile: FC<EventProps> = ({ title, description }): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<Box
					sx={{
						width: '100%',
						display: 'inline-block',
					}}
				>
					<EventList title={title} description={description} />
				</Box>
			)}
		</>
	);
};

const EventPage: FC<EventProps> = ({ title, description }): JSX.Element => {
	return (
		<>
			<EventPC title={title} description={description} />
			<EventMobile title={title} description={description} />
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(EventPage);
