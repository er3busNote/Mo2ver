import React, { FC, useState, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@/types/store';
import Api from '@api/index';
import { BannerRequestData, BannerImageInfoData } from '@/types/api';
import useCSRFToken from '@hooks/useCSRFToken';
import useGroupCodeList from '@hooks/cmmn/useGroupCodeList';
import useBannerImagesDetail from '@hooks/banner/useBannerImagesDetail';
import BannerImageFormPC from './BannerImageFormPC';
import BannerImageFormMobile from './BannerImageFormMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { BannerImageFormValues } from '@pages/admin/types';
import dayjs, { Dayjs } from 'dayjs';

const bannerImageSchema = yup
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
		position: yup.string().required('필수항목'),
		type: yup.string().required(),
		code: yup.string().required(),
		useyn: yup.string().required('필수항목'),
		bnnrImg: yup
			.array()
			.of(
				yup.object().shape({
					title: yup.string().required('배너내용을 입력해주세요'),
					cnntUrl: yup.string().required('연결할 URL을 입력해주세요'),
					file: yup.string().required('첨부파일이 존재하질 않습니다'),
					useyn: yup.string().required('필수항목'),
				})
			)
			.required('이미지 정보를 입력해주세요'),
	})
	.required();

interface BannerDispatchProps {
	title: string;
	description: string;
	code: ActionCreatorsMapObject;
	member: ActionCreatorsMapObject;
	banner: ActionCreatorsMapObject;
}

const bannerImageValues: BannerImageFormValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'BN',
	code: '',
	useyn: 'Y',
	bnnrImg: [{ title: '', cnntUrl: '', file: '', useyn: '' }],
};

const BannerImageFormPage: FC<BannerDispatchProps> = ({
	title,
	description,
	code,
	member,
	banner,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const navigate = useNavigate();
	const location = useLocation();
	const csrfData = useCSRFToken({ member });
	const [bannerNo, setBannerNo] = useState<number>();
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
	const groupCodeData = useGroupCodeList({
		code,
		groupCodelist: ['BN001', 'BN002', 'BN003'],
		csrfData,
	});
	const componentType =
		location.state?.bannerNo && location.state?.displayTemplateCode
			? 'Update'
			: 'Create';

	const methods = useForm<BannerImageFormValues>({
		mode: 'onChange',
		defaultValues: bannerImageValues,
		resolver: yupResolver(bannerImageSchema),
	});

	if (componentType === 'Update') {
		const bannerNo = location.state?.bannerNo;
		const displayTemplateCode = location.state?.displayTemplateCode;
		const bannerData: BannerRequestData = {
			bannerNo: bannerNo,
			displayTemplateCode: displayTemplateCode,
		};
		const imagesInfo = useBannerImagesDetail({
			banner,
			bannerData,
			csrfData,
		});
		if (imagesInfo && !isDataLoaded) {
			const { reset } = methods;
			reset({
				title: imagesInfo.title,
				startDate: dayjs(imagesInfo.startDate),
				endDate: dayjs(imagesInfo.endDate),
				position: imagesInfo.position,
				type: imagesInfo.type,
				code: imagesInfo.code,
				useyn: imagesInfo.useyn,
				bnnrImg: imagesInfo.bnnrImg,
			});
			if (imagesInfo.bannerNo) setBannerNo(imagesInfo.bannerNo);
			setIsDataLoaded(true);
		}
	}

	const submitForm = async (
		data: BannerImageFormValues,
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const bannerFormData: BannerImageInfoData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			code: data.code,
			useyn: data.useyn,
			bnnrImg: data.bnnrImg,
		};
		if (componentType === 'Update') {
			bannerFormData.bannerNo = bannerNo;
		}
		console.log(bannerFormData);
		console.log(csrfData);
		if (componentType === 'Create')
			await banner.imagesCreate(bannerFormData, csrfData);
		if (componentType === 'Update')
			await banner.imagesUpdate(bannerFormData, csrfData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
		navigate('/admin/banner');
	};

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			{(componentType === 'Create' ||
				(componentType === 'Update' && isDataLoaded && groupCodeData)) && (
				<FormProvider {...methods}>
					{isDesktop && (
						<BannerImageFormPC
							title={title}
							description={description}
							groupCodeData={groupCodeData}
							type={componentType}
							onSubmit={submitForm}
						/>
					)}
					{isMobile && (
						<BannerImageFormMobile
							title={title}
							description={description}
							groupCodeData={groupCodeData}
							type={componentType}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
	code: bindActionCreators(Api.code, dispatch),
	member: bindActionCreators(Api.member, dispatch),
	banner: bindActionCreators(Api.banner, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BannerImageFormPage);
