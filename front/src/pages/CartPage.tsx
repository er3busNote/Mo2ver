import React, { FC, Dispatch, SetStateAction } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import Api from '../api';
import { CartPageData } from '../api/types';
import useCartPageList from '../hooks/cart/useCartPageList';
import CartListPC from '../components/user/CartListPC';
import CartListMobile from '../components/user/CartListMobile';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const steps = ['장바구니', '주문/결제', '주문완료'];

interface CartProps {
	description: string;
	setPage: Dispatch<SetStateAction<number>>;
	cartPageData: CartPageData;
}

interface CartDispatchProps {
	description: string;
	cart: ActionCreatorsMapObject;
}

const CartPC: FC<CartProps> = ({
	description,
	setPage,
	cartPageData,
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
						description={description}
						steps={steps}
						setPage={setPage}
						cartPageData={cartPageData}
					/>
				</Box>
			)}
		</>
	);
};

const CartMobile: FC<CartProps> = ({
	description,
	setPage,
	cartPageData,
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
						description={description}
						steps={steps}
						setPage={setPage}
						cartPageData={cartPageData}
					/>
				</Box>
			)}
		</>
	);
};

const CartPage: FC<CartDispatchProps> = ({
	description,
	cart,
}): JSX.Element => {
	const [cartPageData, setPage] = useCartPageList({ cart });
	return (
		<>
			<CartPC
				description={description}
				setPage={setPage}
				cartPageData={cartPageData}
			/>
			<CartMobile
				description={description}
				setPage={setPage}
				cartPageData={cartPageData}
			/>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	cart: bindActionCreators(Api.cart, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
