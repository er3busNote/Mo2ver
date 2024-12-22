import React, { FC, useState, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import Api from '../api';
import useCSRFToken from '../hooks/useCSRFToken';
import GoodsRegister from '../components/goods/GoodsRegister';
import { Box } from '@mui/material';
import { FileData } from '../api/types';
import { RegisterFormValues } from '../components/form/types';
import { useMediaQuery } from 'react-responsive';
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
		year: yup.number().required('등록연도를 입력해주세요'),
		price: yup
			.number()
			.required('가격을 입력해주세요')
			.min(0, '0원 이상 입력해주세요!'),
		goodsImg: yup
			.array()
			.min(1, '적어도 하나의 파일을 업로드해야 합니다.')
			.max(5, '최대 5개의 파일을 업로드할 수 있습니다.')
			.default([]),
		largeCategory: yup.string().required(),
		mediumCategory: yup.string().required(),
		smallCategory: yup.string().required(),
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
			.required('공급가격을 입력해주세요')
			.min(0, '0원 이상 입력해주세요!'),
		salePrice: yup
			.number()
			.required('판매가격을 입력해주세요')
			.min(0, '0원 이상 입력해주세요!'),
		maxBuyQuantity: yup
			.number()
			.required('가격을 입력해주세요')
			.min(1, '1개 이상 입력해주세요!'),
		discountPrice: yup
			.number()
			.required('할인가격을 입력해주세요')
			.min(0, '0원 이상 입력해주세요!'),
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
	price: 1000,
	goodsImg: [],
	largeCategory: '',
	mediumCategory: '',
	smallCategory: '',
	buyLimitYesNo: 'Y',
	salePeriodYesNo: 'Y',
	saleStartDate: dayjs(),
	saleEndDate: dayjs(),
	supplyPrice: 0,
	salePrice: 0,
	maxBuyQuantity: 1,
	discountPrice: 0,
	discountStartDate: dayjs(),
	discountEndDate: dayjs(),
};

const GoodsRegisterPC: FC<GoodsRegisterProps> = ({
	description,
	category,
	image,
	onSubmit,
}): JSX.Element => {
	const [files, setFiles] = useState<Array<FileData>>();
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
						category={category}
						image={image}
						setFiles={setFiles}
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
	const [files, setFiles] = useState<Array<FileData>>();
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
						category={category}
						image={image}
						setFiles={setFiles}
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
