import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@/types/store';
import Api from '@api/index';
import { OrderData, OrderCouponData, OrderPointData } from '@/types/api';
import useCSRFToken from '@hooks/member/query/useCSRFToken';
import useMemberInfo from '@hooks/member/query/useMemberInfo';
import useAddressInfo from '@hooks/address/query/useAddressInfo';
import useOrderInfo from '@hooks/order/query/useOrderInfo';
import usePaymentInfo from '@hooks/payment/query/usePaymentInfo';
import useTossPaymentWidget from '@hooks/payment/ui/useTossPaymentWidget';
import OrderFormPC from './form/OrderFormPC';
import OrderFormMobile from './form/OrderFormMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { OrderProps } from '@/types/order';
import { OrderFormValues } from '@/types/form';
import { AmountData } from '@/types/payment';

const steps = ['장바구니', '주문/결제', '주문완료'];

const orderSchema = yup
	.object()
	.shape({
		addressNo: yup.string().required(),
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

interface OrderDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	address: ActionCreatorsMapObject;
	order: ActionCreatorsMapObject;
	payment: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

const orderValues: OrderFormValues = {
	addressNo: '',
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

const OrderPC: FC<Omit<OrderProps, 'steps'>> = ({
	title,
	description,
	file,
	address,
	orderId,
	memberData,
	addressData,
	orderData,
	onAddressRefetch,
	onCouponApply,
	onPointApply,
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
				file={file}
				address={address}
				orderId={orderId}
				memberData={memberData}
				addressData={addressData}
				orderData={orderData}
				onAddressRefetch={onAddressRefetch}
				onCouponApply={onCouponApply}
				onPointApply={onPointApply}
				onSubmit={onSubmit}
			/>
		</Box>
	);
};

const OrderMobile: FC<Omit<OrderProps, 'steps'>> = ({
	title,
	description,
	file,
	address,
	orderId,
	memberData,
	addressData,
	orderData,
	onAddressRefetch,
	onCouponApply,
	onPointApply,
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
				file={file}
				address={address}
				orderId={orderId}
				memberData={memberData}
				addressData={addressData}
				orderData={orderData}
				onAddressRefetch={onAddressRefetch}
				onCouponApply={onCouponApply}
				onPointApply={onPointApply}
				onSubmit={onSubmit}
			/>
		</Box>
	);
};

const OrderPage: FC<OrderDispatchProps> = ({
	title,
	description,
	member,
	address,
	order,
	payment,
	file,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const navigate = useNavigate();
	const location = useLocation();
	const orderId = location.state?.orderId;
	const { data: csrfData } = useCSRFToken({ member });
	const { data: memberData } = useMemberInfo({ member });
	const { data: paymentData } = usePaymentInfo({ payment, orderId, csrfData });
	const { data: addressData, refetch: onAddressRefetch } = useAddressInfo({
		address,
	});
	const { data: orderData, refetch: onOrderRefetch } = useOrderInfo({
		order,
		orderId,
	}); // 쿠폰 및 포인트 적용 시, 최종금액이 바뀔수 있음
	const { paymentMethodRef, agreementRef, setAmount, handlePayment } =
		useTossPaymentWidget({
			orderId,
			clientKey: paymentData?.clientKey || '',
			memberData,
		});

	const methods = useForm<OrderFormValues>({
		mode: 'onChange',
		defaultValues: orderValues,
		resolver: yupResolver(orderSchema),
	});

	const onCouponApply = async (orderCouponData: OrderCouponData) => {
		const csrfData = await member.csrf();
		await order.updateCoupon(orderCouponData, csrfData);
		onOrderRefetch();
	};
	const onPointApply = async (orderPointData: OrderPointData) => {
		const csrfData = await member.csrf();
		await order.updatePoint(orderPointData, csrfData);
		onOrderRefetch();
	};
	const submitForm = async (
		data: OrderFormValues,
		orderForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const orderFormData: OrderData = {
			orderId: orderId,
		};

		const amountData: AmountData = {
			currency: 'KRW',
			value: 50000,
		};
		setAmount(amountData);
		handlePayment();
		if (orderForm) orderForm.preventDefault(); // 새로고침 방지
		navigate('/profile');
	};

	return (
		<FormProvider {...methods}>
			{isDesktop && (
				<OrderPC
					title={title}
					description={description}
					file={file}
					address={address}
					orderId={orderId}
					memberData={memberData}
					addressData={addressData}
					orderData={orderData}
					onAddressRefetch={onAddressRefetch}
					onCouponApply={onCouponApply}
					onPointApply={onPointApply}
					onSubmit={submitForm}
				/>
			)}
			{isMobile && (
				<OrderMobile
					title={title}
					description={description}
					file={file}
					address={address}
					orderId={orderId}
					memberData={memberData}
					addressData={addressData}
					orderData={orderData}
					onAddressRefetch={onAddressRefetch}
					onCouponApply={onCouponApply}
					onPointApply={onPointApply}
					onSubmit={submitForm}
				/>
			)}
			<Box id="payment-method" ref={paymentMethodRef}></Box>
			<Box id="agreement" ref={agreementRef}></Box>
		</FormProvider>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	address: bindActionCreators(Api.address, dispatch),
	order: bindActionCreators(Api.order, dispatch),
	payment: bindActionCreators(Api.payment, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
