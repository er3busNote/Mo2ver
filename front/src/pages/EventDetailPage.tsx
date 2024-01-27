import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import EventDetail from '../components/goods/event/EventDetail';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

interface EventDetailProps {
	title: string;
	description: string;
}

const EventDetailPC: FC<EventDetailProps> = ({
	title,
	description,
}): JSX.Element => {
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
					<EventDetail title={title} description={description} />
				</Box>
			)}
		</>
	);
};

const EventDetailMobile: FC<EventDetailProps> = ({
	title,
	description,
}): JSX.Element => {
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
					<EventDetail title={title} description={description} />
				</Box>
			)}
		</>
	);
};

const EventDetailPage: FC<EventDetailProps> = ({
	title,
	description,
}): JSX.Element => {
	return (
		<>
			<EventDetailPC title={title} description={description} />
			<EventDetailMobile title={title} description={description} />
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(EventDetailPage);
