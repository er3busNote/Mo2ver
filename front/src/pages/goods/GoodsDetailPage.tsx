import React, { FC, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@store/types';
import {
	GoodsData,
	CartData,
	ReviewPageData,
	ReviewRequestData,
} from '@api/types';
import useCSRFToken from '@hooks/useCSRFToken';
import useGoodsDetail from '@hooks/goods/useGoodsDetail';
import useReviewPageList from '@hooks/review/useReviewPageList';
import GoodsDetail from './GoodsDetail';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface GoodsDetailProps {
	title: string;
	description: string;
	image: ActionCreatorsMapObject;
	goodsData: GoodsData;
	reviewData: ReviewPageData;
	setPage: Dispatch<SetStateAction<number>>;
	onReviewAdd: (reviewInfo: ReviewRequestData) => void;
	onCartAdd: (cartData: CartData) => void;
}

interface GoodsDetailDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	goods: ActionCreatorsMapObject;
	review: ActionCreatorsMapObject;
	cart: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

const GoodsDetailPC: FC<GoodsDetailProps> = ({
	title,
	description,
	image,
	goodsData,
	reviewData,
	setPage,
	onReviewAdd,
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
				image={image}
				goodsData={goodsData}
				reviewPageData={reviewData}
				setPage={setPage}
				onReviewAdd={onReviewAdd}
				onCartAdd={onCartAdd}
			/>
		</Box>
	);
};

const GoodsDetailMobile: FC<GoodsDetailProps> = ({
	title,
	description,
	image,
	goodsData,
	reviewData,
	setPage,
	onReviewAdd,
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
				image={image}
				goodsData={goodsData}
				reviewPageData={reviewData}
				setPage={setPage}
				onReviewAdd={onReviewAdd}
				onCartAdd={onCartAdd}
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
	image,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { id } = useParams();
	const code = id ?? '';
	const goodsData = useGoodsDetail({ goods, code });
	const [reviewData, setPage, setReload] = useReviewPageList({ review, code });

	const csrfData = useCSRFToken({ member });
	const onReviewAdd = async (reviewInfo: ReviewRequestData) => {
		await review.create(reviewInfo, csrfData);
		setReload(true);
	};
	const cartAdd = async (cartData: CartData) => {
		await cart.add(cartData, csrfData);
	};
	return (
		<>
			{isDesktop && (
				<GoodsDetailPC
					title={title}
					description={description}
					image={image}
					goodsData={goodsData}
					reviewData={reviewData}
					setPage={setPage}
					onReviewAdd={onReviewAdd}
					onCartAdd={cartAdd}
				/>
			)}
			{isMobile && (
				<GoodsDetailMobile
					title={title}
					description={description}
					image={image}
					goodsData={goodsData}
					reviewData={reviewData}
					setPage={setPage}
					onReviewAdd={onReviewAdd}
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

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	goods: bindActionCreators(Api.goods, dispatch),
	review: bindActionCreators(Api.review, dispatch),
	cart: bindActionCreators(Api.cart, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetailPage);
