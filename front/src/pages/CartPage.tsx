import React, { FC, Dispatch, SetStateAction } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import { CartData, CartPageData } from '../api/types';
import Api from '../api';
import useCSRFToken from '../hooks/useCSRFToken';
import useCartPageList from '../hooks/cart/useCartPageList';
import CartListPC from '../components/user/CartListPC';
import CartListMobile from '../components/user/CartListMobile';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const steps = ['장바구니', '주문/결제', '주문완료'];

interface CartProps {
	title: string;
	description: string;
	setPage: Dispatch<SetStateAction<number>>;
	cartPageData: CartPageData;
	onCartUpdate: (cartData: CartData) => void;
	onCartDelete: (goodsCode: string) => void;
}

interface CartDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	cart: ActionCreatorsMapObject;
}

const CartPC: FC<CartProps> = ({
	title,
	description,
	setPage,
	cartPageData,
	onCartUpdate,
	onCartDelete,
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
					<CartListPC
						title={title}
						description={description}
						steps={steps}
						setPage={setPage}
						cartPageData={cartPageData}
						onCartUpdate={onCartUpdate}
						onCartDelete={onCartDelete}
					/>
				</Box>
			)}
		</>
	);
};

const CartMobile: FC<CartProps> = ({
	title,
	description,
	setPage,
	cartPageData,
	onCartUpdate,
	onCartDelete,
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
					<CartListMobile
						title={title}
						description={description}
						steps={steps}
						setPage={setPage}
						cartPageData={cartPageData}
						onCartUpdate={onCartUpdate}
						onCartDelete={onCartDelete}
					/>
				</Box>
			)}
		</>
	);
};

const CartPage: FC<CartDispatchProps> = ({
	title,
	description,
	member,
	cart,
}): JSX.Element => {
	const csrfData = useCSRFToken({ member });
	const [cartPageData, setPage, setTotalPrice] = useCartPageList({ cart });
	const cartUpdate = async (cartData: CartData) => {
		const data = (await cart.update(cartData, csrfData)) as CartPageData;
		setTotalPrice(data.cartTotal);
	};
	const cartDelete = async (goodsCode: string) => {
		const data = (await cart.delete(goodsCode, csrfData)) as CartPageData;
		setTotalPrice(data.cartTotal);
	};
	return (
		<>
			<CartPC
				title={title}
				description={description}
				setPage={setPage}
				cartPageData={cartPageData}
				onCartUpdate={cartUpdate}
				onCartDelete={cartDelete}
			/>
			<CartMobile
				title={title}
				description={description}
				setPage={setPage}
				cartPageData={cartPageData}
				onCartUpdate={cartUpdate}
				onCartDelete={cartDelete}
			/>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
