import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { TitleState } from '@/types/store';
import {
	CartData,
	CartPageData,
	OrderRequestData,
	OrderGoodsInfoData,
} from '@/types/api';
import Api from '@api/index';
import useCSRFToken from '@hooks/member/query/useCSRFToken';
import useCartPageList from '@services/cart/useCartPageList';
import CartListPC from './CartListPC';
import CartListMobile from './CartListMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import goToOrderForm from '@navigate/order/goToOrderForm';
import { CartProps } from '@/types/cart';
import { map, filter } from 'lodash';

const steps = ['장바구니', '주문/결제', '주문완료'];

interface CartDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	cart: ActionCreatorsMapObject;
	order: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

const CartPC: FC<CartProps> = ({
	title,
	description,
	file,
	setPage,
	cartPageData,
	onCartUpdate,
	onCartDelete,
	onOrder,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<CartListPC
				title={title}
				description={description}
				file={file}
				steps={steps}
				setPage={setPage}
				cartPageData={cartPageData}
				onCartUpdate={onCartUpdate}
				onCartDelete={onCartDelete}
				onOrder={onOrder}
			/>
		</Box>
	);
};

const CartMobile: FC<CartProps> = ({
	title,
	description,
	file,
	setPage,
	cartPageData,
	onCartUpdate,
	onCartDelete,
	onOrder,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<CartListMobile
				title={title}
				description={description}
				file={file}
				steps={steps}
				setPage={setPage}
				cartPageData={cartPageData}
				onCartUpdate={onCartUpdate}
				onCartDelete={onCartDelete}
				onOrder={onOrder}
			/>
		</Box>
	);
};

const CartPage: FC<CartDispatchProps> = ({
	title,
	description,
	member,
	cart,
	order,
	file,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { data: csrfData } = useCSRFToken({ member });
	const [cartPageData, setPage, setTotalPrice] = useCartPageList({ cart });
	const cartUpdate = async (cartData: CartData) => {
		const data = (await cart.update(cartData, csrfData)) as CartPageData;
		setTotalPrice(data.cartTotal);
	};
	const cartDelete = async (goodsCode: string) => {
		const data = (await cart.delete(goodsCode, csrfData)) as CartPageData;
		setTotalPrice(data.cartTotal);
	};
	const orderClick = (isCheck: boolean) => {
		let cartList = cartPageData.cartList;
		if (isCheck) cartList = filter(cartList, { check: true });
		const orderGoodsInfoData: Array<OrderGoodsInfoData> = map(
			cartList,
			(item) => ({
				goodsCode: item.goodsCode,
				quantity: item.amount,
			})
		);
		const orderRequestData: OrderRequestData = {
			goodsOrders: orderGoodsInfoData,
		};
		goToOrderForm({
			title,
			description,
			dispatch,
			navigate,
			order,
			orderRequestData,
			csrfData,
		});
	};
	return (
		<>
			{isDesktop && (
				<CartPC
					title={title}
					description={description}
					file={file}
					setPage={setPage}
					cartPageData={cartPageData}
					onCartUpdate={cartUpdate}
					onCartDelete={cartDelete}
					onOrder={orderClick}
				/>
			)}
			{isMobile && (
				<CartMobile
					title={title}
					description={description}
					file={file}
					setPage={setPage}
					cartPageData={cartPageData}
					onCartUpdate={cartUpdate}
					onCartDelete={cartDelete}
					onOrder={orderClick}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	cart: bindActionCreators(Api.cart, dispatch),
	order: bindActionCreators(Api.order, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
