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
import { GoodsDisplayData } from '../../api/types';
import useCSRFToken from '../../hooks/useCSRFToken';
import GoodsFormDisplayPC from '../../components/form/admin/GoodsFormDisplayPC';
import GoodsFormDisplayMobile from '../../components/form/admin/GoodsFormDisplayMobile';
import { Box } from '@mui/material';
import { GoodsFormDisplayValues } from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

const drawerMenuLimit = 768;

const goodsDisplaySchema = yup
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
						test: (endDate) =>
							endDate && endDate.isAfter(startDate.toLocaleString()),
						message: '시작날짜 이후여야 합니다',
					})
			)
			.nullable()
			.required('마지막날짜가 존재하질 않습니다'),
		position: yup.string().required('필수항목'),
		type: yup.string().required(),
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

interface BannerProps {
	title: string;
	description: string;
	onSubmit: (
		data: GoodsFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface BannerDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	banner: ActionCreatorsMapObject;
}

const goodsDisplayValues: GoodsFormDisplayValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'GD',
	useyn: 'Y',
	goods: [],
};

const BannerGoodsPC: FC<BannerProps> = ({
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
				<GoodsFormDisplayPC
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerGoodsMobile: FC<BannerProps> = ({
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
				<GoodsFormDisplayMobile
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerGoodsPage: FC<BannerDispatchProps> = ({
	title,
	description,
	member,
	banner,
}): JSX.Element => {
	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const submitForm = async (
		data: GoodsFormDisplayValues,
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const goodsFormData: GoodsDisplayData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
			goods: data.goods,
		};
		console.log(goodsFormData);
		console.log(csrfData);
		await banner.goods(goodsFormData, csrfData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
		navigate('/admin/banner');
	};

	const methods = useForm<GoodsFormDisplayValues>({
		mode: 'onChange',
		defaultValues: goodsDisplayValues,
		resolver: yupResolver(goodsDisplaySchema),
	});

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<FormProvider {...methods}>
				<BannerGoodsPC
					title={title}
					description={description}
					onSubmit={submitForm}
				/>
				<BannerGoodsMobile
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerGoodsPage);
