import React, { FC } from 'react';
import CartListPC from '../components/user/CartListPC';
import CartListMobile from '../components/user/CartListMobile';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

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
					<CartListPC />
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
					<CartListMobile />
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
