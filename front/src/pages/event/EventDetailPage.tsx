import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@/types/store';
import useEventInfo from '@hooks/event/query/useEventInfo';
import useEventProductPageList from '@hooks/event/query/useEventProductPageList';
import EventDetail from './EventDetail';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { EventDetailProps, EventDispatchProps } from '@/types/event';

const EventDetailPC: FC<EventDetailProps> = ({
	title,
	description,
	file,
	eventData,
	eventProductData,
	setPage,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<EventDetail
				title={title}
				description={description}
				file={file}
				eventData={eventData}
				eventProductData={eventProductData}
				setPage={setPage}
			/>
		</Box>
	);
};

const EventDetailMobile: FC<EventDetailProps> = ({
	title,
	description,
	file,
	eventData,
	eventProductData,
	setPage,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<EventDetail
				title={title}
				description={description}
				file={file}
				eventData={eventData}
				eventProductData={eventProductData}
				setPage={setPage}
			/>
		</Box>
	);
};

const EventDetailPage: FC<EventDispatchProps> = ({
	title,
	description,
	event,
	file,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { id } = useParams();
	const code = id ?? '';
	const { data: eventData } = useEventInfo({ event, code });
	const { data: eventProductData, setPage } = useEventProductPageList({
		event,
		code,
	});

	return (
		<>
			{isDesktop && (
				<EventDetailPC
					title={title}
					description={description}
					file={file}
					eventData={eventData}
					eventProductData={eventProductData}
					setPage={setPage}
				/>
			)}
			{isMobile && (
				<EventDetailMobile
					title={title}
					description={description}
					file={file}
					eventData={eventData}
					eventProductData={eventProductData}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailPage);
