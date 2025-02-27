import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import { CartData } from '../api/types';
import Api from '../api';
import useCSRFToken from '../hooks/useCSRFToken';
import GoodsDetail from '../components/goods/GoodsDetail';
import { Box, useTheme, useMediaQuery } from '@mui/material';

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
	return (
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
	);
};

const GoodsDetailMobile: FC<GoodsDetailProps> = ({
	title,
	description,
	onCartAdd,
}): JSX.Element => {
	return (
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
	);
};

const GoodsDetailPage: FC<GoodsDetailDispatchProps> = ({
	title,
	description,
	member,
	cart,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const csrfData = useCSRFToken({ member });
	const cartAdd = async (cartData: CartData) => {
		await cart.add(cartData, csrfData);
	};
	return (
		<>
			{isDesktop && (
				<GoodsDetailPC
					title={title}
					description={description}
					onCartAdd={cartAdd}
				/>
			)}
			{isMobile && (
				<GoodsDetailMobile
					title={title}
					description={description}
					onCartAdd={cartAdd}
				/>
			)}
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
