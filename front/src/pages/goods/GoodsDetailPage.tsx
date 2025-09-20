import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@/types/store';
import {
	CartData,
	OrderRequestData,
	OrderGoodsInfoData,
	ReviewInfoData,
} from '@/types/api';
import { GoodsDetailProps } from '@/types/goods';
import useCSRFToken from '@hooks/member/query/useCSRFToken';
import useGoodsDetail from '@hooks/goods/query/useGoodsDetail';
import useReviewPageList from '@services/review/useReviewPageList';
import GoodsDetail from './GoodsDetail';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import goToOrderForm from '@navigate/order/goToOrderForm';

interface GoodsDetailDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	goods: ActionCreatorsMapObject;
	review: ActionCreatorsMapObject;
	cart: ActionCreatorsMapObject;
	order: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

const GoodsDetailPC: FC<GoodsDetailProps> = ({
	title,
	description,
	file,
	goodsData,
	reviewData,
	setPage,
	onReviewAdd,
	onReviewMod,
	onCartAdd,
	onOrder,
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
				file={file}
				goodsData={goodsData}
				reviewData={reviewData}
				setPage={setPage}
				onReviewAdd={onReviewAdd}
				onReviewMod={onReviewMod}
				onCartAdd={onCartAdd}
				onOrder={onOrder}
			/>
		</Box>
	);
};

const GoodsDetailMobile: FC<GoodsDetailProps> = ({
	title,
	description,
	file,
	goodsData,
	reviewData,
	setPage,
	onReviewAdd,
	onReviewMod,
	onCartAdd,
	onOrder,
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
				file={file}
				goodsData={goodsData}
				reviewPageData={reviewData}
				setPage={setPage}
				onReviewAdd={onReviewAdd}
				onReviewMod={onReviewMod}
				onCartAdd={onCartAdd}
				onOrder={onOrder}
			/>
		</Box>
	);
};

const GoodsDetailPage: FC<GoodsDetailDispatchProps> = ({
	title,
	description,
	member,
	goods,
	review,
	cart,
	order,
	file,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { id } = useParams();
	const code = id ?? '';
	const { data: goodsData } = useGoodsDetail({ goods, code });
	const [reviewData, setPage, setReload] = useReviewPageList({ review, code });

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { data: csrfData } = useCSRFToken({ member });

	const onReviewAdd = async (reviewInfo: ReviewInfoData) => {
		const csrfData = await member.csrf();
		await review.create(reviewInfo, csrfData);
		setReload(true);
	};
	const onReviewMod = async (reviewInfo: ReviewInfoData) => {
		const csrfData = await member.csrf();
		await review.update(reviewInfo, csrfData);
		setReload(true);
	};
	const cartAdd = async (cartData: CartData) => {
		const csrfData = await member.csrf();
		await cart.add(cartData, csrfData);
	};
	const orderClick = (code: string) => {
		const orderGoodsInfoData: OrderGoodsInfoData = {
			goodsCode: code,
			quantity: 1,
		};
		const orderRequestData: OrderRequestData = {
			goodsOrders: [orderGoodsInfoData],
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
				<GoodsDetailPC
					title={title}
					description={description}
					file={file}
					goodsData={goodsData}
					reviewData={reviewData}
					setPage={setPage}
					onReviewAdd={onReviewAdd}
					onReviewMod={onReviewMod}
					onCartAdd={cartAdd}
					onOrder={orderClick}
				/>
			)}
			{isMobile && (
				<GoodsDetailMobile
					title={title}
					description={description}
					file={file}
					goodsData={goodsData}
					reviewData={reviewData}
					setPage={setPage}
					onReviewAdd={onReviewAdd}
					onReviewMod={onReviewMod}
					onCartAdd={cartAdd}
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
	goods: bindActionCreators(Api.goods, dispatch),
	review: bindActionCreators(Api.review, dispatch),
	cart: bindActionCreators(Api.cart, dispatch),
	order: bindActionCreators(Api.order, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetailPage);
