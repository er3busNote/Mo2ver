import React, { FC, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@store/types';
import {
	GoodsDetailData,
	CartData,
	ReviewPageData,
	ReviewInfoData,
} from '@api/types';
import useGoodsDetail from '@hooks/goods/useGoodsDetail';
import useReviewPageList from '@hooks/review/useReviewPageList';
import GoodsDetail from './GoodsDetail';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface GoodsDetailProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	goodsData: GoodsDetailData;
	reviewData: ReviewPageData;
	setPage: Dispatch<SetStateAction<number>>;
	onReviewAdd: (reviewInfo: ReviewInfoData) => void;
	onReviewMod: (reviewInfo: ReviewInfoData) => void;
	onCartAdd: (cartData: CartData) => void;
}

interface GoodsDetailDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	goods: ActionCreatorsMapObject;
	review: ActionCreatorsMapObject;
	cart: ActionCreatorsMapObject;
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
				reviewPageData={reviewData}
				setPage={setPage}
				onReviewAdd={onReviewAdd}
				onReviewMod={onReviewMod}
				onCartAdd={onCartAdd}
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
	file,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { id } = useParams();
	const code = id ?? '';
	const goodsData = useGoodsDetail({ goods, code });
	const [reviewData, setPage, setReload] = useReviewPageList({ review, code });

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
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetailPage);
