import React, { FC, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@store/types';
import { EventData, EventProductPageData } from '@api/types';
import useEventInfo from '@hooks/event/useEventInfo';
import useEventProductPageList from '@hooks/event/useEventProductPageList';
import EventDetail from './EventDetail';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface EventDetailProps {
	title: string;
	description: string;
	image: ActionCreatorsMapObject;
	eventData: EventData;
	eventProductData: EventProductPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface EventDetailDispatchProps {
	title: string;
	description: string;
	event: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

const EventDetailPC: FC<EventDetailProps> = ({
	title,
	description,
	image,
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
				image={image}
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
	image,
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
				image={image}
				eventData={eventData}
				eventProductData={eventProductData}
				setPage={setPage}
			/>
		</Box>
	);
};

const EventDetailPage: FC<EventDetailDispatchProps> = ({
	title,
	description,
	event,
	image,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { id } = useParams();
	const code = id ?? '';
	const eventData = useEventInfo({ event, code });
	const [eventProductData, setPage] = useEventProductPageList({ event, code });

	return (
		<>
			{isDesktop && (
				<EventDetailPC
					title={title}
					description={description}
					image={image}
					eventData={eventData}
					eventProductData={eventProductData}
					setPage={setPage}
				/>
			)}
			{isMobile && (
				<EventDetailMobile
					title={title}
					description={description}
					image={image}
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
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailPage);
