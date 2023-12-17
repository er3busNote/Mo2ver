import React, { FC } from 'react';
import EventList from '../components/goods/event/EventList';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const EventPC: FC = (): JSX.Element => {
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
					<EventList />
				</Box>
			)}
		</>
	);
};

const EventMobile: FC = (): JSX.Element => {
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
					<EventList />
				</Box>
			)}
		</>
	);
};

const EventPage: FC = (): JSX.Element => {
	return (
		<>
			<EventPC />
			<EventMobile />
		</>
	);
};

export default EventPage;
