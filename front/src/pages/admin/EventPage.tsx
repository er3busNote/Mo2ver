import React, { FC } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../api';
import useEventPageList from '../../hooks/event/useEventPageList';
import EventPC from '../../components/admin/event/EventPC';
import EventMobile from '../../components/admin/event/EventMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
// import _ from 'lodash';

interface EventDispatchProps {
	title: string;
	description: string;
	event: ActionCreatorsMapObject;
}

const EventPage: FC<EventDispatchProps> = ({
	title,
	description,
	event,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [eventPageData, setPage] = useEventPageList({ event });
	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			{isDesktop && (
				<EventPC
					title={title}
					description={description}
					setPage={setPage}
					eventPageData={eventPageData}
				/>
			)}
			{isMobile && (
				<EventMobile
					title={title}
					description={description}
					setPage={setPage}
					eventPageData={eventPageData}
				/>
			)}
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
