import React, { FC, useState, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../api';
import {
	BannerDetailData,
	BannerImageData,
	BannerImageDetailData,
} from '../../api/types';
import useCSRFToken from '../../hooks/useCSRFToken';
import useGroupCodeList from '../../hooks/cmmn/useGroupCodeList';
import useBannerImagesDetail from '../../hooks/banner/useBannerImagesDetail';
import BannerFormImagePC from '../../components/form/admin/BannerFormImagePC';
import BannerFormImageMobile from '../../components/form/admin/BannerFormImageMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import {
	BannerFormImageValues,
	BannerImageDetailValues,
} from '../../components/form/admin/types';
//import { merge } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

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
		code: yup.string().required(),
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

interface BannerDispatchProps {
	title: string;
	description: string;
	code: ActionCreatorsMapObject;
	member: ActionCreatorsMapObject;
	banner: ActionCreatorsMapObject;
}

const bnnrImageValues: BannerFormImageValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'BN',
	code: '',
	useyn: 'Y',
	bnnrImg: [{ title: '', bnnrImg: undefined, cnntUrl: '', useyn: '' }],
};

const BannerImagePage: FC<BannerDispatchProps> = ({
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
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const groupCodeData = useGroupCodeList({
		code,
		groupCodelist: ['BN001', 'BN002', 'BN003'],
		csrfData,
	});
	const componentType =
		location.state?.bannerManageNo && location.state?.displayTemplateCode
			? 'Update'
			: 'Create';

	const methods = useForm<BannerFormImageValues>({
		mode: 'onChange',
		defaultValues: bnnrImageValues,
		resolver: yupResolver(bnnrImageSchema),
	});

	if (componentType === 'Update') {
		const bannerManageNo = location.state?.bannerManageNo;
		const displayTemplateCode = location.state?.bannerManageNo;
		const bannerData: BannerDetailData = {
			bannerManageNo: bannerManageNo,
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
			setIsDataLoaded(true);
		}
	}

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
			code: data.code,
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

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			{(componentType === 'Create' ||
				(componentType === 'Update' && isDataLoaded && groupCodeData)) && (
				<FormProvider {...methods}>
					{isDesktop && (
						<BannerFormImagePC
							title={title}
							description={description}
							groupCodeData={groupCodeData}
							onSubmit={submitForm}
						/>
					)}
					{isMobile && (
						<BannerFormImageMobile
							title={title}
							description={description}
							groupCodeData={groupCodeData}
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerImagePage);
