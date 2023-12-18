import React, { FC } from 'react';
import EventDetail from '../components/goods/event/EventDetail';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const EventDetailPC: FC = (): JSX.Element => {
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
					<EventDetail />
				</Box>
			)}
		</>
	);
};

const EventDetailMobile: FC = (): JSX.Element => {
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
					<EventDetail />
				</Box>
			)}
		</>
	);
};

const EventDetailPage: FC = (): JSX.Element => {
	return (
		<>
			<EventDetailPC />
			<EventDetailMobile />
		</>
	);
};

export default EventDetailPage;
