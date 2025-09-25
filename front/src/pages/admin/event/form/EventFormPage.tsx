import React, { FC, useState, useEffect, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@/types/store';
import Api from '@api/index';
import { EventRequestData, EventInfoData } from '@/types/api';
import useCSRFToken from '@hooks/member/query/useCSRFToken';
import useEventDetail from '@hooks/event/query/useEventDetail';
import EventFormPC from './EventFormPC';
import EventFormMobile from './EventFormMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { EventFormValues } from '../../../../types/admin/form';
import dayjs, { Dayjs } from 'dayjs';

const eventSchema = yup
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
			.test(
				'not-before-now',
				'시작날짜는 현재 날짜보다 이전일 수 없습니다.',
				(value) => {
					if (!value) return true;
					return value.isSame(dayjs(), 'day') || value.isAfter(dayjs(), 'day');
				}
			)
			/*.test(
				'is-before-start',
				'시작날짜는 종료날짜 이전여야 합니다.',
				function (value) {
					const { endDate } = this.parent; // 다른 필드 참조
					return (
						(value && endDate && dayjs(value).isSame(dayjs(endDate))) ||
						(value && endDate && dayjs(value).isBefore(dayjs(endDate)))
					);
				}
			)*/
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
						test: (value) =>
							(value && value.isSame(startDate.toLocaleString())) ||
							(value && value.isAfter(startDate.toLocaleString())),
						message: '시작날짜 이후여야 합니다',
					})
			)
			.nullable()
			.required('종료날짜 존재하질 않습니다'),
		displayFile: yup.string().required('첨부파일이 존재하질 않습니다'),
		eventFile: yup.string().required('첨부파일이 존재하질 않습니다'),
		useyn: yup.string().required('필수항목'),
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

interface EventDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	event: ActionCreatorsMapObject;
}

const eventValues: EventFormValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	displayFile: '',
	eventFile: '',
	useyn: 'Y',
	goods: [],
};

const EventFormPage: FC<EventDispatchProps> = ({
	title,
	description,
	member,
	event,
}): JSX.Element => {
	const theme = useTheme();
	const location = useLocation();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { data: csrfData } = useCSRFToken({ member });

	const [componentType, setComponentType] = useState<'Create' | 'Update'>(
		location.state?.eventNo ? 'Update' : 'Create'
	);
	const [eventNo, setEventNo] = useState<number>();
	const [eventData, setEventData] = useState<EventRequestData>(
		new Object() as EventRequestData
	);
	const {
		data: eventInfo,
		isLoading,
		refetch: onEventRefetch,
		create,
		update,
	} = useEventDetail({
		event,
		eventData,
		setEventData,
		csrfData,
	});

	const methods = useForm<EventFormValues>({
		mode: 'onChange',
		defaultValues: eventValues,
		resolver: yupResolver(eventSchema),
	});

	useEffect(() => {
		if (eventInfo && !isLoading) {
			const { reset } = methods;
			reset({
				title: eventInfo.title,
				startDate: dayjs(eventInfo.startDate),
				endDate: dayjs(eventInfo.endDate),
				displayFile: eventInfo.displayFile,
				eventFile: eventInfo.eventFile,
				useyn: eventInfo.useyn,
				goods: eventInfo.goods,
			});
			if (eventInfo.eventNo) {
				setEventNo(eventInfo.eventNo);
				setComponentType('Update');
			}
		}
	}, [eventData, isLoading]);

	useEffect(() => {
		if (componentType === 'Update') {
			const eventNo = location.state?.eventNo;
			const eventData: EventRequestData = {
				eventNo: eventNo,
			};
			setEventData(eventData);
			onEventRefetch();
		}
	}, []);

	const submitForm = async (
		data: EventFormValues,
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const eventFormData: EventInfoData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			displayFile: data.displayFile,
			eventFile: data.eventFile,
			useyn: data.useyn,
			goods: data.goods,
		};
		if (componentType === 'Update') {
			eventFormData.eventNo = eventNo;
		}
		if (componentType === 'Create') await create(eventFormData);
		if (componentType === 'Update') await update(eventFormData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
	};

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			{(componentType === 'Create' ||
				(componentType === 'Update' && !isLoading)) && (
				<FormProvider {...methods}>
					{isDesktop && (
						<EventFormPC
							title={title}
							description={description}
							onSubmit={submitForm}
						/>
					)}
					{isMobile && (
						<EventFormMobile
							title={title}
							description={description}
							onSubmit={submitForm}
						/>
					)}
				</FormProvider>
			)}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventFormPage);
