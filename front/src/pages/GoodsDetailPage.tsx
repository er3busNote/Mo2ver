import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import { CartData } from '../api/types';
import Api from '../api';
import useCSRFToken from '../hooks/useCSRFToken';
import GoodsDetail from '../components/goods/GoodsDetail';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

interface GoodsDetailProps {
	title: string;
	description: string;
	onCartAdd: (cartData: CartData) => void;
}

interface GoodsDetailDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	cart: ActionCreatorsMapObject;
}

const GoodsDetailPC: FC<GoodsDetailProps> = ({
	title,
	description,
	onCartAdd,
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
					<GoodsDetail
						title={title}
						description={description}
						onCartAdd={onCartAdd}
					/>
				</Box>
			)}
		</>
	);
};

const GoodsDetailMobile: FC<GoodsDetailProps> = ({
	title,
	description,
	onCartAdd,
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
					<GoodsDetail
						title={title}
						description={description}
						onCartAdd={onCartAdd}
					/>
				</Box>
			)}
		</>
	);
};

const GoodsDetailPage: FC<GoodsDetailDispatchProps> = ({
	title,
	description,
	member,
	cart,
}): JSX.Element => {
	const csrfData = useCSRFToken({ member });
	const cartAdd = async (cartData: CartData) => {
		await cart.add(cartData, csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
	return (
		<>
			<GoodsDetailPC
				title={title}
				description={description}
				onCartAdd={cartAdd}
			/>
			<GoodsDetailMobile
				title={title}
				description={description}
				onCartAdd={cartAdd}
			/>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
	cart: bindActionCreators(Api.cart, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetailPage);
