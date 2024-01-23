import React, { FC } from 'react';
import CartListPC from '../components/user/CartListPC';
import CartListMobile from '../components/user/CartListMobile';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const steps = ['장바구니', '주문/결제', '주문완료'];

const CartPC: FC = (): JSX.Element => {
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
					<CartListPC steps={steps} />
				</Box>
			)}
		</>
	);
};

const CartMobile: FC = (): JSX.Element => {
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
					<CartListMobile steps={steps} />
				</Box>
			)}
		</>
	);
};

const CartPage: FC = (): JSX.Element => {
	return (
		<>
			<CartPC />
			<CartMobile />
		</>
	);
};

export default CartPage;
