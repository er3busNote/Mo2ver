import React, { FC, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../api';
import { EventDisplayData } from '../../api/types';
import useCSRFToken from '../../hooks/useCSRFToken';
import EventFormDisplayPC from '../../components/form/admin/EventFormDisplayPC';
import EventFormDisplayMobile from '../../components/form/admin/EventFormDisplayMobile';
import { Box } from '@mui/material';
import { EventFormDisplayValues } from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';

const drawerMenuLimit = 768;

interface EventProps {
	title: string;
	description: string;
	onSubmit: (
		data: EventFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface EventDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	event: ActionCreatorsMapObject;
}

const EventGoodsPC: FC<EventProps> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<EventFormDisplayPC
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const EventGoodsMobile: FC<EventProps> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<EventFormDisplayMobile
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const EventGoodsPage: FC<EventDispatchProps> = ({
	title,
	description,
	member,
	event,
}): JSX.Element => {
	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const submitForm = async (
		data: EventFormDisplayValues,
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const formData = new FormData();
		const textContent = 'This is the error content of the file.';
		const blob = new Blob([textContent], { type: 'text/plain' });
		const file = new File([blob], 'error.txt', { type: 'text/plain' });
		formData.append('displayFile', data.displayImg ?? file);
		formData.append('eventFile', data.eventImg ?? file);
		const eventFormData: EventDisplayData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			useyn: data.useyn,
			goods: data.goods,
		};
		formData.append(
			'eventProduct',
			new Blob([JSON.stringify(eventFormData)], { type: 'application/json' })
		);
		console.log('eventProduct');
		console.log(eventFormData);
		console.log(csrfData);
		await event.upload(formData, csrfData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
		navigate('/admin/event');
	};
	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<EventGoodsPC
				title={title}
				description={description}
				onSubmit={submitForm}
			/>
			<EventGoodsMobile
				title={title}
				description={description}
				onSubmit={submitForm}
			/>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	event: bindActionCreators(Api.event, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventGoodsPage);
