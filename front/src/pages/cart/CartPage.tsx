import React, { FC, Dispatch, SetStateAction } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@store/types';
import { CartData, CartPageData } from '@api/types';
import Api from '@api/index';
import useCSRFToken from '@hooks/useCSRFToken';
import useCartPageList from '@hooks/cart/useCartPageList';
import CartListPC from './CartListPC';
import CartListMobile from './CartListMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const steps = ['장바구니', '주문/결제', '주문완료'];

interface CartProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
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
			/>
		</Box>
	);
};

const CartPage: FC<CartDispatchProps> = ({
	title,
	description,
	member,
	cart,
	file,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
			{isDesktop && (
				<CartPC
					title={title}
					description={description}
					file={file}
					setPage={setPage}
					cartPageData={cartPageData}
					onCartUpdate={cartUpdate}
					onCartDelete={cartDelete}
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
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
