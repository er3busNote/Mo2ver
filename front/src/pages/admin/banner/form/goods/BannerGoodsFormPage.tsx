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
import { BannerRequestData, BannerGoodsInfoData } from '@/types/api';
import useCSRFToken from '@services/useCSRFToken';
import useGroupCodeList from '@services/cmmn/useGroupCodeList';
import useBannerGoodsDetail from '@services/banner/useBannerGoodsDetail';
import BannerGoodsFormPC from './BannerGoodsFormPC';
import BannerGoodsFormMobile from './BannerGoodsFormMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { BannerGoodsFormValues } from '@/types/admin/form';
import dayjs, { Dayjs } from 'dayjs';

const bannerGoodsSchema = yup
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

interface BannerDispatchProps {
	title: string;
	description: string;
	code: ActionCreatorsMapObject;
	member: ActionCreatorsMapObject;
	banner: ActionCreatorsMapObject;
}

const bannerGoodsValues: BannerGoodsFormValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'GD',
	code: '',
	useyn: 'Y',
	goods: [],
};

const BannerGoodsFormPage: FC<BannerDispatchProps> = ({
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

	const methods = useForm<BannerGoodsFormValues>({
		mode: 'onChange',
		defaultValues: bannerGoodsValues,
		resolver: yupResolver(bannerGoodsSchema),
	});

	if (componentType === 'Update') {
		const bannerNo = location.state?.bannerNo;
		const displayTemplateCode = location.state?.displayTemplateCode;
		const bannerData: BannerRequestData = {
			bannerNo: bannerNo,
			displayTemplateCode: displayTemplateCode,
		};
		const goodsInfo = useBannerGoodsDetail({
			banner,
			bannerData,
			csrfData,
		});
		if (goodsInfo && !isDataLoaded) {
			const { reset } = methods;
			reset({
				title: goodsInfo.title,
				startDate: dayjs(goodsInfo.startDate),
				endDate: dayjs(goodsInfo.endDate),
				position: goodsInfo.position,
				type: goodsInfo.type,
				code: goodsInfo.code,
				useyn: goodsInfo.useyn,
				goods: goodsInfo.goods,
			});
			if (goodsInfo.bannerNo) setBannerNo(goodsInfo.bannerNo);
			setIsDataLoaded(true);
		}
	}

	const submitForm = async (
		data: BannerGoodsFormValues,
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const bannerFormData: BannerGoodsInfoData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
			code: data.code,
			goods: data.goods,
		};
		if (componentType === 'Update') {
			bannerFormData.bannerNo = bannerNo;
		}
		if (componentType === 'Create')
			await banner.goodsCreate(bannerFormData, csrfData);
		if (componentType === 'Update')
			await banner.goodsUpdate(bannerFormData, csrfData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
		navigate('/admin/banner');
	};

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			{(componentType === 'Create' ||
				(componentType === 'Update' && isDataLoaded && groupCodeData)) && (
				<FormProvider {...methods}>
					{isDesktop && (
						<BannerGoodsFormPC
							title={title}
							description={description}
							groupCodeData={groupCodeData}
							type={componentType}
							onSubmit={submitForm}
						/>
					)}
					{isMobile && (
						<BannerGoodsFormMobile
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
)(BannerGoodsFormPage);
