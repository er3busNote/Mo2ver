import React, { FC } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@store/types';
import Api from '@api/index';
import useCSRFToken from '@hooks/useCSRFToken';
import OrderListPC from './OrderListPC';
import OrderListMobile from './OrderListMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const steps = ['장바구니', '주문/결제', '주문완료'];

interface OrderProps {
	title: string;
	description: string;
}

interface OrderDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
}

const OrderPC: FC<OrderProps> = ({ title, description }): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<OrderListPC title={title} description={description} steps={steps} />
		</Box>
	);
};

const OrderMobile: FC<OrderProps> = ({ title, description }): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<OrderListMobile title={title} description={description} steps={steps} />
		</Box>
	);
};

const OrderPage: FC<OrderDispatchProps> = ({
	title,
	description,
	member,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const csrfData = useCSRFToken({ member });
	return (
		<>
			{isDesktop && <OrderPC title={title} description={description} />}
			{isMobile && <OrderMobile title={title} description={description} />}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
