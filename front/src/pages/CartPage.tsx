import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import CartListPC from '../components/user/CartListPC';
import CartListMobile from '../components/user/CartListMobile';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const steps = ['장바구니', '주문/결제', '주문완료'];

interface CartProps {
	description: string;
}

const CartPC: FC<CartProps> = ({ description }): JSX.Element => {
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
					<CartListPC description={description} steps={steps} />
				</Box>
			)}
		</>
	);
};

const CartMobile: FC<CartProps> = ({ description }): JSX.Element => {
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
					<CartListMobile description={description} steps={steps} />
				</Box>
			)}
		</>
	);
};

const CartPage: FC<CartProps> = ({ description }): JSX.Element => {
	return (
		<>
			<CartPC description={description} />
			<CartMobile description={description} />
		</>
	);
};

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(CartPage);
