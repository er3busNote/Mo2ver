import React, {
	FC,
	useState,
	BaseSyntheticEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../services/api';
import {
	CategoryData,
	CategoryPageData,
	EventDisplayData,
} from '../../services/types';
import useCSRFToken from '../../hooks/useCSRFToken';
import useCategoryInfo from '../../hooks/useCategoryInfo';
import useGoodsSearchPageList from '../../hooks/useGoodsSearchPageList';
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
	goodsData: CategoryPageData;
	largeCategoryData: Array<CategoryData>;
	mediumCategoryData: Array<CategoryData>;
	smallCategoryData: Array<CategoryData>;
	setLargeCategoryCode: Dispatch<SetStateAction<string>>;
	setMediumCategoryCode: Dispatch<SetStateAction<string>>;
	setSmallCategoryCode: Dispatch<SetStateAction<string>>;
	setPage: Dispatch<SetStateAction<number>>;
	searchClick: (goodsName: string) => void;
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
	goods: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
}

const EventGoodsPC: FC<EventProps> = ({
	title,
	description,
	goodsData,
	largeCategoryData,
	mediumCategoryData,
	smallCategoryData,
	setLargeCategoryCode,
	setMediumCategoryCode,
	setSmallCategoryCode,
	setPage,
	searchClick,
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
					goodsData={goodsData}
					largeCategoryData={largeCategoryData}
					mediumCategoryData={mediumCategoryData}
					smallCategoryData={smallCategoryData}
					setLargeCategoryCode={setLargeCategoryCode}
					setMediumCategoryCode={setMediumCategoryCode}
					setSmallCategoryCode={setSmallCategoryCode}
					setPage={setPage}
					searchClick={searchClick}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const EventGoodsMobile: FC<EventProps> = ({
	title,
	description,
	goodsData,
	largeCategoryData,
	mediumCategoryData,
	smallCategoryData,
	setLargeCategoryCode,
	setMediumCategoryCode,
	setSmallCategoryCode,
	setPage,
	searchClick,
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
					goodsData={goodsData}
					largeCategoryData={largeCategoryData}
					mediumCategoryData={mediumCategoryData}
					smallCategoryData={smallCategoryData}
					setLargeCategoryCode={setLargeCategoryCode}
					setMediumCategoryCode={setMediumCategoryCode}
					setSmallCategoryCode={setSmallCategoryCode}
					setPage={setPage}
					searchClick={searchClick}
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
	goods,
	category,
}): JSX.Element => {
	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const [goodsName, setGoodsName] = useState<string>('');
	const [largeCategoryCode, setLargeCategoryCode] = useState<string>('');
	const [mediumCategoryCode, setMediumCategoryCode] = useState<string>('');
	const [smallCategoryCode, setSmallCategoryCode] = useState<string>('');
	const largeCategoryData = useCategoryInfo({ category, categoryLevel: 1 });
	const mediumCategoryData = useCategoryInfo({
		category,
		categoryLevel: 2,
		categoryInfo: largeCategoryCode,
	});
	const smallCategoryData = useCategoryInfo({
		category,
		categoryLevel: 3,
		categoryInfo: mediumCategoryCode,
	});
	const [goodsData, setPage] = useGoodsSearchPageList({
		goods,
		goodsName,
		largeCategoryCode,
		mediumCategoryCode,
		smallCategoryCode,
	});
	const searchClick = (goodsName: string) => {
		setGoodsName(goodsName);
	};
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
				goodsData={goodsData}
				largeCategoryData={largeCategoryData}
				mediumCategoryData={mediumCategoryData}
				smallCategoryData={smallCategoryData}
				setLargeCategoryCode={setLargeCategoryCode}
				setMediumCategoryCode={setMediumCategoryCode}
				setSmallCategoryCode={setSmallCategoryCode}
				setPage={setPage}
				searchClick={searchClick}
				onSubmit={submitForm}
			/>
			<EventGoodsMobile
				title={title}
				description={description}
				goodsData={goodsData}
				largeCategoryData={largeCategoryData}
				mediumCategoryData={mediumCategoryData}
				smallCategoryData={smallCategoryData}
				setLargeCategoryCode={setLargeCategoryCode}
				setMediumCategoryCode={setMediumCategoryCode}
				setSmallCategoryCode={setSmallCategoryCode}
				setPage={setPage}
				searchClick={searchClick}
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
	goods: bindActionCreators(Api.goods, dispatch),
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventGoodsPage);
