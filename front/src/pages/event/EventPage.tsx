import React, { FC } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@/types/store';
import useEventPageList from '@hooks/event/useEventPageList';
import EventList from './EventList';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { EventProps, EventDispatchProps } from '@/types/event';

const EventPC: FC<EventProps> = ({
	title,
	description,
	file,
	eventData,
	setPage,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<EventList
				title={title}
				description={description}
				file={file}
				eventData={eventData}
				setPage={setPage}
			/>
		</Box>
	);
};

const EventMobile: FC<EventProps> = ({
	title,
	description,
	file,
	eventData,
	setPage,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<EventList
				title={title}
				description={description}
				file={file}
				eventData={eventData}
				setPage={setPage}
			/>
		</Box>
	);
};

const EventPage: FC<EventDispatchProps> = ({
	title,
	description,
	event,
	file,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [eventData, setPage] = useEventPageList({ event });

	return (
		<>
			{isDesktop && (
				<EventPC
					title={title}
					description={description}
					file={file}
					eventData={eventData}
					setPage={setPage}
				/>
			)}
			{isMobile && (
				<EventMobile
					title={title}
					description={description}
					file={file}
					eventData={eventData}
					setPage={setPage}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	event: bindActionCreators(Api.event, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
