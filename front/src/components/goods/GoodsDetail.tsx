import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../api';
import { ImageData, CartData } from '../../api/types';
import useImageUrl from '../../hooks/useImageUrl';
import useGoodsDetail from '../../hooks/goods/useGoodsDetail';
import GoodsSubHeader from './cmmn/GoodsSubHeader';
import {
	Box,
	Grid,
	Link,
	Paper,
	Button,
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
import StarsIcon from '@mui/icons-material/Stars';

interface GoodsProps {
	title: string;
	description: string;
	goods: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
	onCartAdd: (cartData: CartData) => void;
}

const GoodsDetail: FC<GoodsProps> = ({
	title,
	description,
	goods,
	image,
	onCartAdd,
}): JSX.Element => {
	const { id } = useParams();
	const code = id ?? '';
	const data = useGoodsDetail({ goods, code });

	const addCartClick = () => {
		const cartData: CartData = {
			goodsCode: data.goodsCode,
			goodsName: data.goodsName,
			goodsBrand: data.goodsBrand,
			goodsGender: data.goodsGender,
			goodsYear: data.goodsYear,
			supplyPrice: data.supplyPrice,
			salePrice: data.salePrice,
			image:
				data.imageList.length > 0
					? data.imageList[0]
					: (new Object() as ImageData),
			amount: 1,
			totalPrice: data.salePrice,
		};
		onCartAdd(cartData);
	};

	const file =
		data.imageList.length > 0
			? String(data.imageList[0].goodsImageAttachFile)
			: '';

	const gridItem: SxProps<Theme> = {
		py: 0.5,
		display: 'grid',
		borderBottom: '1px #F0F0F0 solid',
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
	const infoTag: SxProps<Theme> = {
		mr: 1,
		px: 1.5,
		py: 0.5,
		minWidth: 10,
		fontSize: '10px',
		fontWeight: 'bold',
		border: '1px solid #e8e8e8',
		color: '#b2b2b2',
		'&:hover': {
			color: '#b2b2b2',
			bgcolor: '#f3f3f3',
			border: '1px solid #e8e8e8',
		},
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

	return (
		<Box>
			<GoodsSubHeader
				title={title}
				description={description}
				subtitle={data.goodsName}
			/>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} lg={6}>
					<Box sx={{ m: 3, border: '2px #F0F0F0 solid' }}>
						{file !== '' ? (
							<CardMedia
								component="img"
								width="100%"
								height="556"
								image={useImageUrl({ image, file, path: 'file' })}
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
							<Typography
								component="span"
								sx={{
									py: 0.5,
									fontSize: { xs: '12px', sm: '13px', lg: '15px' },
									fontWeight: 'bold',
								}}
							>
								등록된 상품
							</Typography>
							<Typography
								component="span"
								sx={{
									py: 0.5,
									fontSize: { xs: '11px', sm: '12px', lg: '13px' },
									fontWeight: 'bold',
									color: '#b2b2b2',
								}}
							>
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
													{data ? (
														<Breadcrumbs
															sx={infoBreadcrumbs}
															aria-label="breadcrumb"
														>
															<Typography component="span" sx={info}>
																{data.goodsBrand}
															</Typography>
															<Typography component="span" sx={info}>
																{data.goodsCode}
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
													{data ? (
														<Breadcrumbs
															sx={infoBreadcrumbs}
															aria-label="breadcrumb"
														>
															<Typography component="span" sx={info}>
																{data.goodsYear}
															</Typography>
															<Typography component="span" sx={info}>
																{data.goodsGender}
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
															value={4.8}
															sx={infoRating}
															readOnly
														/>
														<Link sx={infoShow} href="/" underline="none">
															후기 2,415개 보기
														</Link>
													</Breadcrumbs>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
								<Box sx={{ py: 1, display: 'flex' }}>
									<Button sx={infoTag} variant="outlined">
										#방한
									</Button>
									<Button sx={infoTag} variant="outlined">
										#보온
									</Button>
									<Button sx={infoTag} variant="outlined">
										#숏패딩
									</Button>
									<Button sx={infoTag} variant="outlined">
										#파카
									</Button>
									<Button sx={infoTag} variant="outlined">
										#점퍼
									</Button>
									<Button sx={infoTag} variant="outlined">
										#패딩
									</Button>
								</Box>
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
													{data ? (
														<Typography component="span" sx={infoOriginPrice}>
															{data.supplyPrice.toLocaleString()}원
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
													{data ? (
														<Typography component="span" sx={infoDiscountPrice}>
															{data.salePrice.toLocaleString()}원
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
							<Button
								onClick={addCartClick}
								sx={{
									mt: 2,
									py: 1,
									width: '48%',
									fontSize: '14px',
									fontWeight: 'bold',
									bgcolor: '#7940B6',
									border: '1px solid #757595',
									borderRadius: 0,
									color: '#fff',
									'&:hover': {
										bgcolor: '#9373B5',
									},
								}}
								variant="outlined"
							>
								장바구니
							</Button>
							<Button
								sx={{
									mt: 2,
									py: 1,
									width: '48%',
									fontSize: '14px',
									fontWeight: 'bold',
									bgcolor: '#000',
									border: '1px solid #000',
									borderRadius: 0,
									color: '#fff',
									'&:hover': {
										bgcolor: '#0f0f0f',
									},
								}}
								variant="outlined"
							>
								바로 구매
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	goods: bindActionCreators(Api.goods, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(GoodsDetail);
