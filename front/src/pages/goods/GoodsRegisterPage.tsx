import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@store/types';
import Api from '@api/index';
import { GoodsRegisterData } from '@api/types';
import useCSRFToken from '@hooks/useCSRFToken';
import GoodsRegister from './GoodsRegister';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { RegisterFormValues } from '@pages/types';
import { useIsMobile } from '@context/MobileContext';
import dayjs, { Dayjs } from 'dayjs';

const steps = ['상품등록', '등록완료'];

const registerSchema = yup
	.object()
	.shape({
		name: yup
			.string()
			.required('상품명을 입력해주세요')
			.min(2, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		brand: yup.string().required('브랜드명을 입력해주세요'),
		gender: yup.string().required('성별을 입력해주세요'),
		year: yup
			.number()
			.typeError('제조일자를 입력해주세요')
			.required('제조일자를 입력해주세요')
			.min(1990, '1990년 이상 입력해주세요'),
		keyword: yup
			.array()
			.min(1, '적어도 하나의 키워드를 입력해야 합니다.')
			.default([]),
		summaryInfo: yup.string().required('상품설명을 입력해주세요'),
		goodsImg: yup
			.array()
			.of(
				yup.object().shape({
					fileAttachCode: yup
						.string()
						.test(
							'non-empty', // 커스텀 테스트 이름
							'fileAttachCode는 빈 문자열일 수 없습니다.', // 에러 메시지
							(value) => value !== '' // 빈 문자열이 아닌지 체크
						)
						.required('첨부파일코드는 필수 항목입니다.'),
					fileSize: yup
						.number()
						.test(
							'non-zero-size', // 커스텀 테스트 이름
							'fileSize는 0일 수 없습니다.', // 에러 메시지
							(value) => value !== 0 // 0이 아닌지 체크
						)
						.required('파일크기는 필수 항목입니다.'),
					fileName: yup.string().required('파일이름은 필수 항목입니다.'),
					fileType: yup.string().required('파일형식은 필수 항목입니다.'),
					fileExtension: yup
						.string()
						.required('파일 확장자는 필수 항목입니다.'),
				})
			)
			.min(1, '적어도 하나의 파일을 업로드해야 합니다.')
			.max(5, '최대 5개의 파일을 업로드할 수 있습니다.')
			.required('첨부파일은 필수입니다.')
			.default([]),
		largeCategory: yup.string().required('대분류를 선택해주세요'),
		mediumCategory: yup.string().required('중분류를 선택해주세요'),
		smallCategory: yup.string().required('소분류를 선택해주세요'),
		buyLimitYesNo: yup.string().required(),
		salePeriodYesNo: yup.string().required(),
		saleStartDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.nullable()
			.test(
				'not-before-now',
				'판매시작일시는 현재 날짜보다 이전일 수 없습니다.',
				(value) => {
					if (!value) return true;
					return value.isSame(dayjs(), 'day') || value.isAfter(dayjs(), 'day');
				}
			)
			.test(
				'is-before-start',
				'판매시작일시는 판매종료일시 이전여야 합니다.',
				function (value) {
					const { saleEndDate } = this.parent; // 다른 필드 참조
					return (
						(value && saleEndDate && dayjs(value).isSame(dayjs(saleEndDate))) ||
						(value && saleEndDate && dayjs(value).isBefore(dayjs(saleEndDate)))
					);
				}
			)
			.required('판매시작일시가 존재하질 않습니다'),
		saleEndDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.when(
				'saleStartDate',
				(saleStartDate, schema) =>
					saleStartDate &&
					schema.test({
						test: (value) =>
							(value && value.isSame(saleStartDate.toLocaleString())) ||
							(value && value.isAfter(saleStartDate.toLocaleString())),
						message: '판매시작일시 이후여야 합니다',
					})
			)
			.nullable()
			.required('판매종료일시가 존재하질 않습니다'),
		supplyPrice: yup
			.number()
			.typeError('공급가격을 입력해주세요')
			.required('공급가격을 입력해주세요')
			.min(100, '100원 이상 입력해주세요'),
		salePrice: yup
			.number()
			.typeError('판매가격을 입력해주세요')
			.required('판매가격을 입력해주세요')
			.min(100, '100원 이상 입력해주세요'),
		maxBuyQuantity: yup
			.number()
			.required('최대구매수량을 입력해주세요')
			.min(1, '1개 이상 입력해주세요'),
		discountPrice: yup
			.number()
			.typeError('할인가격을 입력해주세요')
			.required('할인가격을 입력해주세요')
			.min(100, '100원 이상 입력해주세요'),
		discountStartDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.test(
				'not-before-now',
				'할인시작일시는 현재 날짜보다 이전일 수 없습니다.',
				(value) => {
					if (!value) return true;
					return value.isSame(dayjs(), 'day') || value.isAfter(dayjs(), 'day');
				}
			)
			.test(
				'is-before-start',
				'할인시작일시는 할인종료일시 이전여야 합니다.',
				function (value) {
					const { discountEndDate } = this.parent; // 다른 필드 참조
					return (
						(value &&
							discountEndDate &&
							dayjs(value).isSame(dayjs(discountEndDate))) ||
						(value &&
							discountEndDate &&
							dayjs(value).isBefore(dayjs(discountEndDate)))
					);
				}
			)
			.nullable()
			.required('할인시작일시가 존재하질 않습니다'),
		discountEndDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.when(
				'discountStartDate',
				(discountStartDate, schema) =>
					discountStartDate &&
					schema.test({
						test: (value) =>
							(value && value.isSame(discountStartDate.toLocaleString())) ||
							(value && value.isAfter(discountStartDate.toLocaleString())),
						message: '할인시작일시 이후여야 합니다',
					})
			)
			.nullable()
			.required('할인종료일시가 존재하질 않습니다'),
	})
	.required();

interface GoodsRegisterProps {
	description: string;
	category: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	onSubmit: (
		data: RegisterFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface GoodsRegisterDispatchProps {
	description: string;
	member: ActionCreatorsMapObject;
	goods: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

const registerValues: RegisterFormValues = {
	name: '',
	brand: '',
	gender: '',
	year: 2024,
	keyword: [],
	summaryInfo: '',
	goodsImg: [],
	largeCategory: '',
	mediumCategory: '',
	smallCategory: '',
	buyLimitYesNo: 'Y',
	salePeriodYesNo: 'Y',
	saleStartDate: dayjs(),
	saleEndDate: dayjs(),
	supplyPrice: 1000,
	salePrice: 1000,
	maxBuyQuantity: 1,
	discountPrice: 1000,
	discountStartDate: dayjs(),
	discountEndDate: dayjs(),
};

const GoodsRegisterPC: FC<GoodsRegisterProps> = ({
	description,
	category,
	file,
	onSubmit,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<GoodsRegister
				description={description}
				steps={steps}
				slidesPerView={4}
				spaceBetween={40}
				category={category}
				file={file}
				onSubmit={onSubmit}
			/>
		</Box>
	);
};

const GoodsRegisterMobile: FC<GoodsRegisterProps> = ({
	description,
	category,
	file,
	onSubmit,
}): JSX.Element => {
	const isMobile = useIsMobile();
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<GoodsRegister
				description={description}
				steps={steps}
				slidesPerView={isMobile ? 4 : 5}
				spaceBetween={10}
				category={category}
				file={file}
				onSubmit={onSubmit}
			/>
		</Box>
	);
};

const GoodsRegisterPage: FC<GoodsRegisterDispatchProps> = ({
	description,
	member,
	goods,
	category,
	file,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const submitForm = async (
		data: RegisterFormValues,
		registerForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const registerFormData: GoodsRegisterData = {
			goodsName: data.name,
			goodsBrand: data.brand,
			goodsGender: data.gender,
			goodsYear: data.year,
			goodsImg: data.goodsImg,
			keyword: '#'.concat(data.keyword.join('#')),
			summaryInfo: data.summaryInfo,
			largeCategoryCode: data.largeCategory,
			mediumCategoryCode: data.mediumCategory,
			smallCategoryCode: data.smallCategory,
			buyLimitYesNo: data.buyLimitYesNo,
			buyLimitCondition: '10',
			salePeriodYesNo: data.salePeriodYesNo,
			saleStartDate: data.saleStartDate.format('YYYY-MM-DD'),
			saleEndDate: data.saleEndDate.format('YYYY-MM-DD'),
			supplyPrice: data.supplyPrice,
			salePrice: data.salePrice,
			maxBuyQuantity: data.maxBuyQuantity,
			discountPrice: data.discountPrice,
			discountStartDate: data.discountStartDate.format('YYYY-MM-DD'),
			discountEndDate: data.discountEndDate.format('YYYY-MM-DD'),
			rateYesNo: 'N',
			maxLimitYesNo: 'N',
			maxLimitAmount: 0,
		};
		console.log(registerFormData);
		console.log(csrfData);
		await goods.create(registerFormData, csrfData);
		if (registerForm) registerForm.preventDefault(); // 새로고침 방지
		navigate('/profile');
	};

	const methods = useForm<RegisterFormValues>({
		mode: 'onChange',
		defaultValues: registerValues,
		resolver: yupResolver(registerSchema),
	});

	return (
		<FormProvider {...methods}>
			{isDesktop && (
				<GoodsRegisterPC
					description={description}
					category={category}
					file={file}
					onSubmit={submitForm}
				/>
			)}
			{isMobile && (
				<GoodsRegisterMobile
					description={description}
					category={category}
					file={file}
					onSubmit={submitForm}
				/>
			)}
		</FormProvider>
	);
};

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
	goods: bindActionCreators(Api.goods, dispatch),
	category: bindActionCreators(Api.category, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsRegisterPage);
