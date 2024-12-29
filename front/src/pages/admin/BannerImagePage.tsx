import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../api';
import { BannerImageData, BannerImageDetailData } from '../../api/types';
import useCSRFToken from '../../hooks/useCSRFToken';
import BannerFormImagePC from '../../components/form/admin/BannerFormImagePC';
import BannerFormImageMobile from '../../components/form/admin/BannerFormImageMobile';
import { Box } from '@mui/material';
import {
	BannerFormImageValues,
	BannerImageDetailValues,
} from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

const drawerMenuLimit = 768;

const bnnrImageSchema = yup
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
		position: yup.string().required('필수항목'),
		type: yup.string().required(),
		useyn: yup.string().required('필수항목'),
		bnnrImg: yup
			.array()
			.of(
				yup.object().shape({
					title: yup.string().required('배너내용을 입력해주세요'),
					bnnrImg: yup
						.mixed<File>()
						.test(
							'file',
							'파일을 선택하세요',
							(value) => value && value.size > 0
						)
						.test(
							'fileSize',
							'파일크기가 너무 작습니다',
							(value) => value && value.size <= 1024 * 1024 * 5 // 5MB
						)
						.test(
							'fileType',
							'지원되는 파일 타입이 아닙니다',
							(value) =>
								value && ['image/jpeg', 'image/png'].includes(value.type)
						),
					cnntUrl: yup.string().required('연결할 URL을 입력해주세요'),
					useyn: yup.string().required('필수항목'),
				})
			)
			.required('이미지 정보를 입력해주세요'),
	})
	.required();

interface BannerProps {
	title: string;
	description: string;
	onSubmit: (
		data: BannerFormImageValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface BannerDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	banner: ActionCreatorsMapObject;
}

const bnnrImageValues: BannerFormImageValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'BN',
	useyn: 'Y',
	bnnrImg: [{ title: '', bnnrImg: undefined, cnntUrl: '', useyn: '' }],
};

const BannerImagePC: FC<BannerProps> = ({
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
				<BannerFormImagePC
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerImageMobile: FC<BannerProps> = ({
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
				<BannerFormImageMobile
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerImagePage: FC<BannerDispatchProps> = ({
	title,
	description,
	member,
	banner,
}): JSX.Element => {
	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const submitForm = async (
		data: BannerFormImageValues,
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const bnnrImg = data.bnnrImg as Array<BannerImageDetailValues>;
		const paramBnnrImg = new Array<BannerImageDetailData>();
		const formData = new FormData();
		bnnrImg.map((item: BannerImageDetailValues) => {
			if (item.bnnrImg) formData.append('files', item.bnnrImg);
			else {
				const textContent = 'This is the error content of the file.';
				const blob = new Blob([textContent], { type: 'text/plain' });
				const file = new File([blob], 'error.txt', { type: 'text/plain' });
				formData.append('files', file);
			}
			paramBnnrImg.push({
				title: item.title,
				cnntUrl: item.cnntUrl,
				useyn: item.useyn,
			});
		});
		const bannerFormData: BannerImageData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
			bnnrImg: paramBnnrImg,
		};
		formData.append(
			'bannerImage',
			new Blob([JSON.stringify(bannerFormData)], { type: 'application/json' })
		);
		console.log('bannerImage');
		console.log(bannerFormData);
		console.log(csrfData);
		await banner.upload(formData, csrfData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
		navigate('/admin/banner');
	};

	const methods = useForm<BannerFormImageValues>({
		mode: 'onChange',
		defaultValues: bnnrImageValues,
		resolver: yupResolver(bnnrImageSchema),
	});

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<FormProvider {...methods}>
				<BannerImagePC
					title={title}
					description={description}
					onSubmit={submitForm}
				/>
				<BannerImageMobile
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
	banner: bindActionCreators(Api.banner, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerImagePage);
