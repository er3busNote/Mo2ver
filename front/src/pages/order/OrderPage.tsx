import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@store/types';
import Api from '@api/index';
import { OrderData } from '@api/types';
import useCSRFToken from '@hooks/useCSRFToken';
import OrderFormPC from './form/OrderFormPC';
import OrderFormMobile from './form/OrderFormMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { OrderFormValues } from '@pages/types';

const steps = ['장바구니', '주문/결제', '주문완료'];

const orderSchema = yup
	.object()
	.shape({
		memo: yup.string(),
		coupon: yup.number(),
		couponNumber: yup.string(),
		point: yup.number(),
		paymentMethod: yup.string().required(),
		card: yup.string().required(),
		cardOwner: yup.string(),
		agreeReceipt: yup.boolean().required(),
		agreeAll: yup.boolean().required(),
		agreePurchase: yup.boolean().required(),
	})
	.required();

interface OrderProps {
	title: string;
	description: string;
	onSubmit: (
		data: OrderFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface OrderDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
}

const orderValues: OrderFormValues = {
	memo: '',
	coupon: 0,
	couponNumber: '',
	point: 0,
	paymentMethod: 'CARD',
	card: '',
	cardOwner: '',
	agreeReceipt: false,
	agreeAll: false,
	agreePurchase: false,
};

const OrderPC: FC<OrderProps> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	return (
		<Box
			sx={{
				mb: '30px',
				width: '940px',
				display: 'inline-block',
			}}
		>
			<OrderFormPC
				title={title}
				description={description}
				steps={steps}
				onSubmit={onSubmit}
			/>
		</Box>
	);
};

const OrderMobile: FC<OrderProps> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	return (
		<Box
			sx={{
				mb: '60px',
				width: '100%',
				display: 'inline-block',
			}}
		>
			<OrderFormMobile
				title={title}
				description={description}
				steps={steps}
				onSubmit={onSubmit}
			/>
		</Box>
	);
};

const OrderPage: FC<OrderDispatchProps> = ({
	title,
	description,
	member,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });

	const methods = useForm<OrderFormValues>({
		mode: 'onChange',
		defaultValues: orderValues,
		resolver: yupResolver(orderSchema),
	});

	const submitForm = async (
		data: OrderFormValues,
		orderForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const orderFormData: OrderData = {
			orderId: '',
		};
		if (orderForm) orderForm.preventDefault(); // 새로고침 방지
		navigate('/profile');
	};

	return (
		<FormProvider {...methods}>
			{isDesktop && (
				<OrderPC
					title={title}
					description={description}
					onSubmit={submitForm}
				/>
			)}
			{isMobile && (
				<OrderMobile
					title={title}
					description={description}
					onSubmit={submitForm}
				/>
			)}
		</FormProvider>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
