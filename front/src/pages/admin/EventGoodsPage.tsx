import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
import dayjs, { Dayjs } from 'dayjs';

const drawerMenuLimit = 768;

const eventDisplaySchema = yup
	.object()
	.shape({
		title: yup
			.string()
			.required('제목을 입력해주세요')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		startDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.nullable()
			.required('시작날짜가 존재하질 않습니다'),
		endDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.when(
				'startDate',
				(startDate, schema) =>
					startDate &&
					schema.test({
						test: (endDate) =>
							endDate && endDate.isAfter(startDate.toLocaleString()),
						message: '시작날짜 이후여야 합니다',
					})
			)
			.nullable()
			.required('마지막날짜가 존재하질 않습니다'),
		useyn: yup.string().required('필수항목'),
		displayImg: yup
			.mixed<File>()
			.test('file', '파일을 선택하세요', (value) => value && value.size > 0)
			.test(
				'fileSize',
				'파일크기가 너무 작습니다',
				(value) => value && value.size <= 1024 * 1024 * 5 // 5MB
			)
			.test(
				'fileType',
				'지원되는 파일 타입이 아닙니다',
				(value) => value && ['image/jpeg', 'image/png'].includes(value.type)
			),
		eventImg: yup
			.mixed<File>()
			.test('file', '파일을 선택하세요', (value) => value && value.size > 0)
			.test(
				'fileSize',
				'파일크기가 너무 작습니다',
				(value) => value && value.size <= 1024 * 1024 * 5 // 5MB
			)
			.test(
				'fileType',
				'지원되는 파일 타입이 아닙니다',
				(value) => value && ['image/jpeg', 'image/png'].includes(value.type)
			),
		goods: yup
			.array()
			.of(
				yup.object().shape({
					goodsCode: yup.string().required('상품코드'),
					goodsName: yup.string().required('상품내용'),
					salePrice: yup.number().required('판매가'),
					sortSequence: yup
						.number()
						.typeError('정렬순서를 입력해주세요')
						.positive('1 이상의 값을 입력해주세요')
						.required('정렬순서'),
				})
			)
			.required('상품 전시 정보를 선택해주세요'),
	})
	.required();

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

const eventDisplayValues: EventFormDisplayValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	useyn: 'Y',
	displayImg: undefined,
	eventImg: undefined,
	goods: [],
};

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

	const methods = useForm<EventFormDisplayValues>({
		mode: 'onChange',
		defaultValues: eventDisplayValues,
		resolver: yupResolver(eventDisplaySchema),
	});

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<FormProvider {...methods}>
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
			</FormProvider>
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
