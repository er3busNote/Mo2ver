import React, { FC, Dispatch, SetStateAction } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../services/api';
import { EventPageData } from '../../services/types';
import useEventPageList from '../../hooks/useEventPageList';
import EventPC from '../../components/admin/event/EventPC';
import EventMobile from '../../components/admin/event/EventMobile';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';

const drawerMenuLimit = 768;

interface EventProps {
	title: string;
	description: string;
	setPage: Dispatch<SetStateAction<number>>;
	eventPageData: EventPageData;
}

interface EventDispatchProps {
	title: string;
	description: string;
	event: ActionCreatorsMapObject;
}

const BannerPagePC: FC<EventProps> = ({
	title,
	description,
	setPage,
	eventPageData,
}): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<EventPC
					title={title}
					description={description}
					setPage={setPage}
					eventPageData={eventPageData}
				/>
			)}
		</>
	);
};

const BannerPageMobile: FC<EventProps> = ({
	title,
	description,
	setPage,
	eventPageData,
}): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<EventMobile
					title={title}
					description={description}
					setPage={setPage}
					eventPageData={eventPageData}
				/>
			)}
		</>
	);
};

const EventPage: FC<EventDispatchProps> = ({
	title,
	description,
	event,
}): JSX.Element => {
	const [eventPageData, setPage] = useEventPageList({ event });
	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<BannerPagePC
				title={title}
				description={description}
				setPage={setPage}
				eventPageData={eventPageData}
			/>
			<BannerPageMobile
				title={title}
				description={description}
				setPage={setPage}
				eventPageData={eventPageData}
			/>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	event: bindActionCreators(Api.event, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
