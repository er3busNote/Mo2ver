import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@store/types';
import Api from '@api/index';
import useCSRFToken from '@hooks/useCSRFToken';
import useGroupCodeList from '@hooks/cmmn/useGroupCodeList';
import BannerVideoFormPC from './BannerVideoFormPC';
import BannerVideoFormMobile from './BannerVideoFormMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { BannerVideoFormValues } from '@pages/admin/types';
import dayjs, { Dayjs } from 'dayjs';

const bannerVideoSchema = yup
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
			.required('종료날짜가 존재하질 않습니다'),
		position: yup.string().required(),
		type: yup.string().required(),
		code: yup.string().required(),
		useyn: yup.string().required(),
	})
	.required();

interface BannerDispatchProps {
	title: string;
	description: string;
	code: ActionCreatorsMapObject;
	member: ActionCreatorsMapObject;
}

const bannerVideoValues: BannerVideoFormValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'VD',
	code: '',
	useyn: 'Y',
};

const BannerVideoFormPage: FC<BannerDispatchProps> = ({
	title,
	description,
	code,
	member,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const csrfData = useCSRFToken({ member });
	const groupCodeData = useGroupCodeList({
		code,
		groupCodelist: ['BN001', 'BN002', 'BN003'],
		csrfData,
	});

	const methods = useForm<BannerVideoFormValues>({
		mode: 'onChange',
		defaultValues: bannerVideoValues,
		resolver: yupResolver(bannerVideoSchema),
	});

	const submitForm = (
		data: BannerVideoFormValues,
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const videoFormData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			code: data.code,
			useyn: data.useyn,
		};
		console.log(videoFormData);
		console.log(csrfData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
	};

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<FormProvider {...methods}>
				{isDesktop && (
					<BannerVideoFormPC
						title={title}
						description={description}
						groupCodeData={groupCodeData}
						onSubmit={submitForm}
					/>
				)}
				{isMobile && (
					<BannerVideoFormMobile
						title={title}
						description={description}
						groupCodeData={groupCodeData}
						onSubmit={submitForm}
					/>
				)}
			</FormProvider>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	code: bindActionCreators(Api.code, dispatch),
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BannerVideoFormPage);
