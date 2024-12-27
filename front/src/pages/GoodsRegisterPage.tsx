import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import Api from '../api';
import { GoodsRegisterData } from '../api/types';
import useCSRFToken from '../hooks/useCSRFToken';
import GoodsRegister from '../components/goods/GoodsRegister';
import { Box } from '@mui/material';
import { RegisterFormValues } from '../components/form/types';
import { useMediaQuery } from 'react-responsive';
import { isMobile as isMobileDevice } from 'react-device-detect';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

const drawerMenuLimit = 768;

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
						test: (saleEndDate) =>
							saleEndDate &&
							saleEndDate.isAfter(saleStartDate.toLocaleString()),
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
			.nullable()
			.required('할인시작일시가 존재하질 않습니다'),
		discountEndDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.when(
				'saleStartDate',
				(discountStartDate, schema) =>
					discountStartDate &&
					schema.test({
						test: (discountEndDate) =>
							discountEndDate &&
							discountEndDate.isAfter(discountStartDate.toLocaleString()),
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
	image: ActionCreatorsMapObject;
	onSubmit: (
		data: RegisterFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface GoodsRegisterDispatchProps {
	description: string;
	member: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

const registerValues: RegisterFormValues = {
	name: '',
	brand: '',
	gender: '',
	year: 2024,
	keyword: [],
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
	image,
	onSubmit,
}): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
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
						image={image}
						onSubmit={onSubmit}
					/>
				</Box>
			)}
		</>
	);
};

const GoodsRegisterMobile: FC<GoodsRegisterProps> = ({
	description,
	category,
	image,
	onSubmit,
}): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<Box
					sx={{
						width: '100%',
						display: 'inline-block',
					}}
				>
					<GoodsRegister
						description={description}
						steps={steps}
						slidesPerView={isMobileDevice ? 4 : 5}
						spaceBetween={10}
						category={category}
						image={image}
						onSubmit={onSubmit}
					/>
				</Box>
			)}
		</>
	);
};

const GoodsRegisterPage: FC<GoodsRegisterDispatchProps> = ({
	description,
	member,
	category,
	image,
}): JSX.Element => {
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
			largeCategoryCode: data.largeCategory,
			mediumCategoryCode: data.mediumCategory,
			smallCategoryCode: data.smallCategory,
			buyLimitYesNo: data.buyLimitYesNo,
			salePeriodYesNo: data.salePeriodYesNo,
			saleStartDate: data.saleStartDate.format('YYYY-MM-DD'),
			saleEndDate: data.saleEndDate.format('YYYY-MM-DD'),
			supplyPrice: data.supplyPrice,
			salePrice: data.salePrice,
			maxBuyQuantity: data.maxBuyQuantity,
			discountPrice: data.discountPrice,
			discountStartDate: data.discountStartDate.format('YYYY-MM-DD'),
			discountEndDate: data.discountEndDate.format('YYYY-MM-DD'),
		};
		console.log(registerFormData);
		console.log(csrfData);
		if (registerForm) registerForm.preventDefault(); // 새로고침 방지
		navigate('/register');
	};

	const methods = useForm<RegisterFormValues>({
		mode: 'onChange',
		defaultValues: registerValues,
		resolver: yupResolver(registerSchema),
	});

	return (
		<FormProvider {...methods}>
			<GoodsRegisterPC
				description={description}
				category={category}
				image={image}
				onSubmit={submitForm}
			/>
			<GoodsRegisterMobile
				description={description}
				category={category}
				image={image}
				onSubmit={submitForm}
			/>
		</FormProvider>
	);
};

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
	category: bindActionCreators(Api.category, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsRegisterPage);
