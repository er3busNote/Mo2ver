import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../api';
import useCSRFToken from '../../hooks/useCSRFToken';
import VideoFormDisplayPC from '../../components/form/admin/VideoFormDisplayPC';
import VideoFormDisplayMobile from '../../components/form/admin/VideoFormDisplayMobile';
import { Box } from '@mui/material';
import { VideoFormDisplayValues } from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

const drawerMenuLimit = 768;

const videoDisplaySchema = yup
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
			.test(
				'is-before-start',
				'시작날짜는 종료날짜 이전여야 합니다.',
				function (value) {
					const { endDate } = this.parent; // 다른 필드 참조
					return (
						(value && endDate && dayjs(value).isSame(dayjs(endDate))) ||
						(value && endDate && dayjs(value).isBefore(dayjs(endDate)))
					);
				}
			)
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
		useyn: yup.string().required(),
	})
	.required();

interface BannerProps {
	title: string;
	description: string;
	onSubmit: (
		data: VideoFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface BannerDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
}

const videoDisplayValues: VideoFormDisplayValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'VD',
	useyn: 'Y',
};

const BannerVideoPC: FC<BannerProps> = ({
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
				<VideoFormDisplayPC
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerVideoMobile: FC<BannerProps> = ({
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
				<VideoFormDisplayMobile
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerVideoPage: FC<BannerDispatchProps> = ({
	title,
	description,
	member,
}): JSX.Element => {
	const csrfData = useCSRFToken({ member });
	const submitForm = (
		data: VideoFormDisplayValues,
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const videoFormData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
		};
		console.log(videoFormData);
		console.log(csrfData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
	};

	const methods = useForm<VideoFormDisplayValues>({
		mode: 'onChange',
		defaultValues: videoDisplayValues,
		resolver: yupResolver(videoDisplaySchema),
	});

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<FormProvider {...methods}>
				<BannerVideoPC
					title={title}
					description={description}
					onSubmit={submitForm}
				/>
				<BannerVideoMobile
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerVideoPage);
