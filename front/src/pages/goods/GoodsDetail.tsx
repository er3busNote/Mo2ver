import React, { FC, useRef, MouseEvent, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import {
	GoodsDetailData,
	CartData,
	ReviewPageData,
	ReviewInfoData,
	ImageData,
} from '@api/types';
import useImageUrl from '@hooks/useImageUrl';
import GoodsSubHeader from './cmmn/GoodsSubHeader';
import ReviewList from './review/ReviewList';
import ReviewSummary from './review/ReviewSummary';
import ButtonTag from '@components/button/ButtonTag';
import ButtonGoods from '@components/button/ButtonGoods';
import {
	Box,
	Grid,
	Link,
	Paper,
	Rating,
	Breadcrumbs,
	CardMedia,
	Typography,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	Skeleton,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { SxProps, Theme } from '@mui/material/styles';
import { Stars as StarsIcon } from '@mui/icons-material';
import { useIsMobile } from '@context/MobileContext';
import { isEmpty, get, find } from 'lodash';

interface GoodsDetailProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	goodsData: GoodsDetailData;
	reviewPageData: ReviewPageData;
	setPage: Dispatch<SetStateAction<number>>;
	onReviewAdd: (reviewInfo: ReviewInfoData) => void;
	onReviewMod: (reviewInfo: ReviewInfoData) => void;
	onCartAdd: (cartData: CartData) => void;
	onOrder: (code: string) => void;
}

const GoodsDetail: FC<GoodsDetailProps> = ({
	title,
	description,
	file,
	goodsData,
	reviewPageData,
	setPage,
	onReviewAdd,
	onReviewMod,
	onCartAdd,
	onOrder,
}): JSX.Element => {
	const isMobile = useIsMobile();
	const reviewRef = useRef<HTMLDivElement | null>(null);

	const reviewScroll = () => {
		(document.activeElement as HTMLElement | null)?.blur();
		reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const reviewFocus = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		reviewScroll();
	};

	const addCartClick = () => {
		const cartData: CartData = {
			goodsCode: goodsData.goodsCode,
			goodsName: goodsData.goodsName,
			goodsBrand: goodsData.goodsBrand,
			goodsGender: goodsData.goodsGender,
			goodsYear: goodsData.goodsYear,
			supplyPrice: goodsData.supplyPrice,
			salePrice: goodsData.salePrice,
			image: get(goodsData, ['imageList', 0], new Object() as ImageData),
			amount: 1,
			totalPrice: goodsData.salePrice,
		};
		onCartAdd(cartData);
	};

	const orderClick = () => {
		onOrder(goodsData.goodsCode);
	};

	const attachFile = String(
		get(
			find(goodsData.imageList, { basicImageYesNo: 'Y' }),
			'goodsImageAttachFile',
			''
		)
	);

	const gridItem: SxProps<Theme> = {
		py: 0.5,
		display: 'grid',
		borderBottom: '1px #F0F0F0 solid',
	};
	const mainTitle: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: '12px', sm: '13px', lg: '15px' },
		fontWeight: 'bold',
	};
	const mainDescription: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: '#b2b2b2',
	};
	const label: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const labelCell: SxProps<Theme> = {
		px: 0,
		py: 0.2,
		width: '120px',
		borderBlock: 'none',
	};
	const labelTitle: SxProps<Theme> = {
		fontSize: { xs: '14px', sm: '15px', lg: '17px' },
		fontWeight: 'bold',
	};
	const labelDescription: SxProps<Theme> = {
		px: 1.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: '#b2b2b2',
	};
	const info: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const infoSub: SxProps<Theme> = {
		px: 0.5,
		py: 0.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: '#b2b2b2',
	};
	const infoBreadcrumbs: SxProps<Theme> = {
		color: '#b2b2b2',
		'.MuiBreadcrumbs-separator': {
			mx: 0.5,
		},
	};
	const infoLikeIcon: SxProps<Theme> = {
		mb: { xs: '-4px', sm: '-4px', lg: '-5px' },
		color: red[500],
		fontSize: { xs: '0.9rem', sm: '1.0rem', lg: '1.1rem' },
	};
	const infoRating: SxProps<Theme> = {
		mb: { xs: '-5px', sm: '-5px', lg: '-5px' },
		fontSize: { xs: '0.9rem', sm: '1.0rem', lg: '1.1rem' },
	};
	const infoLike: SxProps<Theme> = {
		px: 0.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: 'red',
	};
	const infoShow: SxProps<Theme> = {
		px: 0.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: 'blue',
	};
	const infoHashTag: SxProps<Theme> = {
		py: 1,
		display: 'flex',
		flexWrap: 'wrap',
		gap: '5px 0px',
	};
	const infoDelivery: SxProps<Theme> = {
		px: 2,
		fontSize: { xs: '12px', sm: '13px', lg: '14px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const infoDeliveryBody: SxProps<Theme> = {
		my: 1,
		px: 1,
		py: 1.2,
		bgcolor: '#f9f9f9',
	};
	const infoOriginPrice: SxProps<Theme> = {
		fontSize: { xs: '14px', sm: '15px', lg: '16px' },
		fontWeight: 'bold',
		textDecoration: 'line-through',
		color: '#aaa',
	};
	const infoDiscountPrice: SxProps<Theme> = {
		fontSize: { xs: '14px', sm: '15px', lg: '16px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const infoCell: SxProps<Theme> = {
		px: 0,
		py: 0,
		borderBlock: 'none',
	};
	const reviewBox: SxProps<Theme> = {
		mt: -3,
	};
	const reviewSummary: SxProps<Theme> = {
		px: 5,
	};
	const reviewCard: SxProps<Theme> = {
		mt: -2,
		px: 5,
		mb: isMobile ? 12 : 7,
	};

	return (
		<Box>
			<GoodsSubHeader
				title={title}
				description={description}
				subtitle={goodsData.goodsName}
			/>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} lg={6}>
					<Box sx={{ m: 3, border: '2px #F0F0F0 solid' }}>
						{!isEmpty(attachFile) ? (
							<CardMedia
								component="img"
								width="100%"
								height="556"
								image={useImageUrl({ file, attachFile })}
								sx={{ p: 1.5 }}
							/>
						) : (
							<Skeleton animation="wave" variant="rectangular" height={556} />
						)}
					</Box>
				</Grid>
				<Grid item xs={12} md={6} lg={6}>
					<Box
						sx={{
							mt: { xs: -3, sm: -3, md: 3, lg: 3 },
							mx: { xs: 6, sm: 6, md: 3, lg: 3 },
							mb: { xs: 10, sm: 10 },
							textAlign: 'left',
						}}
					>
						<Box sx={gridItem}>
							<Typography component="span" sx={mainTitle}>
								등록된 상품
							</Typography>
							<Typography component="span" sx={mainDescription}>
								이 상품은 사용자가 등록된 상품으로 실제 화면과 다를 수 있습니다.
							</Typography>
						</Box>
						<Box sx={gridItem}>
							<Box sx={{ py: 1 }}>
								<Typography component="span" sx={labelTitle}>
									Product Info
								</Typography>
								<Typography component="span" sx={labelDescription}>
									제품정보
								</Typography>
							</Box>
							<Box>
								<TableContainer>
									<Table size="small">
										<TableBody>
											<TableRow>
												<TableCell sx={labelCell}>
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={label}>
															브랜드
														</Typography>
														<Typography component="span" sx={label}>
															품번
														</Typography>
													</Breadcrumbs>
												</TableCell>
												<TableCell sx={infoCell}>
													{goodsData ? (
														<Breadcrumbs
															sx={infoBreadcrumbs}
															aria-label="breadcrumb"
														>
															<Typography component="span" sx={info}>
																{goodsData.goodsBrand}
															</Typography>
															<Typography component="span" sx={info}>
																{goodsData.goodsCode}
															</Typography>
														</Breadcrumbs>
													) : (
														<Skeleton animation="wave" />
													)}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={labelCell}>
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={label}>
															등록연도
														</Typography>
														<Typography component="span" sx={label}>
															성별
														</Typography>
													</Breadcrumbs>
												</TableCell>
												<TableCell sx={infoCell}>
													{goodsData ? (
														<Breadcrumbs
															sx={infoBreadcrumbs}
															aria-label="breadcrumb"
														>
															<Typography component="span" sx={info}>
																{goodsData.goodsYear}
															</Typography>
															<Typography component="span" sx={info}>
																{goodsData.goodsGender}
															</Typography>
														</Breadcrumbs>
													) : (
														<Skeleton animation="wave" />
													)}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={labelCell}>
													<Typography component="span" sx={label}>
														조회수(1개월)
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Typography component="span" sx={info}>
														52.4만 회 이상
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={labelCell}>
													<Typography component="span" sx={label}>
														누적판매(1년)
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Box>
														<Typography component="span" sx={info}>
															1.7만개 이상
														</Typography>
														<Typography component="span" sx={infoSub}>
															(결제완료-반품)
														</Typography>
													</Box>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={labelCell}>
													<Typography component="span" sx={label}>
														좋아요
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Box>
														<StarsIcon sx={infoLikeIcon} />
														<Typography component="span" sx={infoLike}>
															30,174
														</Typography>
													</Box>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={labelCell}>
													<Typography component="span" sx={label}>
														구매 후기
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Rating
															name="read-only"
															value={goodsData.averageRating}
															sx={infoRating}
															readOnly
														/>
														<Link
															sx={infoShow}
															href="#"
															underline="none"
															onClick={reviewFocus}
														>
															후기 {goodsData.reviewCount.toLocaleString()} 개
															보기 ▼
														</Link>
													</Breadcrumbs>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
								{!isEmpty(goodsData.keywordList) && (
									<Box sx={infoHashTag}>
										{goodsData.keywordList.map(
											(keyword: string, index: number) => (
												<ButtonTag
													key={index}
													buttonType="detail"
													variant="outlined"
												>
													#{keyword}
												</ButtonTag>
											)
										)}
									</Box>
								)}
							</Box>
						</Box>
						<Box sx={gridItem}>
							<Box sx={{ py: 1 }}>
								<Typography component="span" sx={labelTitle}>
									Delivery Info
								</Typography>
								<Typography component="span" sx={labelDescription}>
									배송정보
								</Typography>
							</Box>
							<Box>
								<TableContainer>
									<Table size="small">
										<TableBody>
											<TableRow>
												<TableCell sx={labelCell}>
													<Typography component="span" sx={label}>
														출고 정보
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Typography component="span" sx={info}>
														결제 3일 이내 출고
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={labelCell}>
													<Typography component="span" sx={label}>
														배송 정보
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={label}>
															국내 배송
														</Typography>
														<Typography component="span" sx={label}>
															XXXXXXX
														</Typography>
													</Breadcrumbs>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
								<Box>
									<Paper elevation={0} sx={infoDeliveryBody}>
										<Typography component="span" sx={infoDelivery}>
											12/21(목) 도착 예정
										</Typography>
									</Paper>
								</Box>
							</Box>
						</Box>
						<Box sx={gridItem}>
							<Box sx={{ py: 1 }}>
								<Typography component="span" sx={labelTitle}>
									Price Info
								</Typography>
								<Typography component="span" sx={labelDescription}>
									가격정보
								</Typography>
							</Box>
							<Box>
								<TableContainer>
									<Table size="small">
										<TableBody>
											<TableRow>
												<TableCell sx={labelCell}>
													<Typography component="span" sx={label}>
														판매가
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													{goodsData ? (
														<Typography component="span" sx={infoOriginPrice}>
															{goodsData.supplyPrice.toLocaleString()}원
														</Typography>
													) : (
														<Skeleton animation="wave" />
													)}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={labelCell}>
													<Typography component="span" sx={label}>
														할인가
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													{/*<Breadcrumbs
														sx={infoBreadcrumbs}
														separator="~"
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={infoDiscountPrice}>
															48,105
														</Typography>
														<Typography component="span" sx={infoDiscountPrice}>
															59,390원
														</Typography>
													</Breadcrumbs>*/}
													{goodsData ? (
														<Typography component="span" sx={infoDiscountPrice}>
															{goodsData.salePrice.toLocaleString()}원
														</Typography>
													) : (
														<Skeleton animation="wave" />
													)}
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</Box>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<ButtonGoods
								buttonType="cart"
								onClick={addCartClick}
								variant="outlined"
							>
								장바구니
							</ButtonGoods>
							<ButtonGoods
								buttonType="buynow"
								onClick={orderClick}
								variant="outlined"
							>
								바로 구매
							</ButtonGoods>
						</Box>
					</Box>
				</Grid>
			</Grid>
			<Box ref={reviewRef} sx={reviewBox}>
				<Box sx={reviewSummary}>
					<ReviewSummary></ReviewSummary>
				</Box>
				<Box sx={reviewCard}>
					<ReviewList
						goodsCode={goodsData.goodsCode}
						reviewPageData={reviewPageData}
						setPage={setPage}
						onReviewAdd={onReviewAdd}
						onReviewMod={onReviewMod}
					></ReviewList>
				</Box>
			</Box>
		</Box>
	);
};

export default GoodsDetail;
