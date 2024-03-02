import React, { FC, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { changeNext, menuActive } from '../../../store/index';
import { TitleInfo } from '../../../store/types';
import Api from '../../../services/api';
import useImageUrl from '../../../hooks/useImageUrl';
import useEventDetailPageList from '../../../hooks/useEventDetailPageList';
import EventSubHeader from '../cmmn/EventSubHeader';
import {
	Box,
	Grid,
	Link,
	Card,
	Button,
	Rating,
	Breadcrumbs,
	CardContent,
	CardMedia,
	CardActionArea,
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
import Pagination from '@mui/material/Pagination';
import StarsIcon from '@mui/icons-material/Stars';
import { EventDetailData } from '../../../services/types';

interface EventDetailProps {
	title: string;
	description: string;
	event: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

interface GoodsProps {
	title: string;
	description: string;
	image: ActionCreatorsMapObject;
	goodsData: Array<EventDetailData>;
}

const GoodsGrid: FC<GoodsProps> = ({
	title,
	description,
	image,
	goodsData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (code: string) => {
		const titleData: TitleInfo = {
			title: title,
			description: description,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive('/goods/' + code + '/detail'));
		navigate('/goods/' + code + '/detail');
	};

	return (
		<Grid container spacing={3}>
			{goodsData &&
				goodsData.map((data: EventDetailData, index: number) => {
					const file =
						String(data.goodsImageAttachFile) + '.' + data.goodsImageExtension;
					return (
						<Grid key={index} item xs={6} md={3} lg={3}>
							<Card
								elevation={0}
								sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
								onClick={() => goodsClick(data.goodsCode)}
							>
								<CardActionArea>
									<CardMedia
										component="img"
										height="140"
										image={useImageUrl({ image, file, path: 'goods' })}
									/>
									<CardContent>
										<Typography
											component="div"
											sx={{
												fontSize: { xs: '11px', sm: '12px', lg: '13px' },
												fontWeight: 'bold',
											}}
										>
											{data.goodsName}
										</Typography>
										<Typography
											component="div"
											sx={{
												fontSize: { xs: '10px', sm: '11px', lg: '12px' },
												fontWeight: 'bold',
											}}
										>
											{data.goodsBrand}
										</Typography>
										<Box sx={{ display: 'flex', justifyContent: 'center' }}>
											<Breadcrumbs
												sx={{ pt: 1 }}
												separator="›"
												aria-label="breadcrumb"
											>
												<Typography
													color="text.secondary"
													sx={{
														color: '#b2b2b2',
														fontSize: { xs: '11px', sm: '12px', lg: '13px' },
														textDecoration: 'line-through',
													}}
												>
													{data.supplyPrice.toLocaleString()}원
												</Typography>
												<Typography
													color="text.secondary"
													sx={{
														fontSize: { xs: '11px', sm: '12px', lg: '13px' },
														fontWeight: 'bold',
													}}
												>
													{data.salePrice.toLocaleString()}원
												</Typography>
											</Breadcrumbs>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					);
				})}
		</Grid>
	);
};

const GoodsRow: FC<GoodsProps> = ({
	title,
	description,
	image,
	goodsData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (code: string) => {
		const titleData: TitleInfo = {
			title: title,
			description: description,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive('/goods/' + code + '/detail'));
		navigate('/goods/' + code + '/detail');
	};

	const rowItem: SxProps<Theme> = {
		py: 0.5,
		display: 'table-row',
		borderBottom: '1px #F0F0F0 solid',
	};
	const subItem: SxProps<Theme> = {
		py: 0.5,
		display: 'grid',
		justifyContent: 'center',
		textAlign: 'left',
	};
	const titleInfo: SxProps<Theme> = {
		fontSize: { xs: '14px', sm: '15px', lg: '17px' },
		fontWeight: 'bold',
	};
	const descriptionInfo: SxProps<Theme> = {
		px: 1.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		display: { xs: 'none', sm: 'none', md: 'inline', lg: 'inline' },
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
		display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
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
		display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
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
	const priceCell: SxProps<Theme> = {
		px: 0,
		py: 0.2,
		width: '60px',
		borderBlock: 'none',
	};
	const cardBox: SxProps<Theme> = {
		width: { xs: '50%', sm: '30%', md: '30%', lg: '30%' },
	};
	const productBox: SxProps<Theme> = {
		display: { xs: 'none', sm: 'block', md: 'block', lg: 'block' },
	};

	return (
		<TableContainer>
			<Table size="small">
				<TableBody>
					{goodsData &&
						goodsData.map((data: EventDetailData, index: number) => {
							const file =
								String(data.goodsImageAttachFile) +
								'.' +
								data.goodsImageExtension;
							return (
								<TableRow key={index} sx={rowItem}>
									<TableCell sx={cardBox}>
										<Card
											elevation={0}
											onClick={() => goodsClick(data.goodsCode)}
										>
											<CardActionArea>
												<CardMedia
													component="img"
													image={useImageUrl({ image, file, path: 'goods' })}
													sx={{
														height: {
															xs: '200px',
															sm: '200px',
															md: '230px',
															lg: '230px',
														},
													}}
													alt="green iguana"
												/>
											</CardActionArea>
										</Card>
									</TableCell>
									<TableCell sx={productBox}>
										<Box sx={subItem}>
											<Box sx={{ py: 1 }}>
												<Typography component="span" sx={titleInfo}>
													Product Info
												</Typography>
												<Typography component="span" sx={descriptionInfo}>
													제품정보
												</Typography>
											</Box>
											<Box>
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
												<Box
													sx={{
														py: 1,
														display: {
															xs: 'none',
															sm: 'none',
															md: 'flex',
															lg: 'flex',
														},
													}}
												>
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
									</TableCell>
									<TableCell>
										<Box sx={subItem}>
											<Box sx={{ py: 1 }}>
												<Typography component="span" sx={titleInfo}>
													Price Info
												</Typography>
												<Typography component="span" sx={descriptionInfo}>
													가격정보
												</Typography>
											</Box>
											<Box>
												<Table size="small">
													<TableBody>
														<TableRow>
															<TableCell sx={priceCell}>
																<Typography component="span" sx={label}>
																	판매가
																</Typography>
															</TableCell>
															<TableCell sx={infoCell}>
																{data ? (
																	<Typography
																		component="span"
																		sx={infoOriginPrice}
																	>
																		{data.supplyPrice.toLocaleString()}원
																	</Typography>
																) : (
																	<Skeleton animation="wave" />
																)}
															</TableCell>
														</TableRow>
														<TableRow>
															<TableCell sx={priceCell}>
																<Typography component="span" sx={label}>
																	할인가
																</Typography>
															</TableCell>
															<TableCell sx={infoCell}>
																{/* <Breadcrumbs
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
																</Breadcrumbs> */}
																{data ? (
																	<Typography
																		component="span"
																		sx={infoDiscountPrice}
																	>
																		{data.salePrice.toLocaleString()}원
																	</Typography>
																) : (
																	<Skeleton animation="wave" />
																)}
															</TableCell>
														</TableRow>
													</TableBody>
												</Table>
											</Box>
										</Box>
										<Box>
											<Button
												sx={{
													mt: 2,
													px: { xs: 3, sm: 4, md: 5, lg: 6 },
													py: 1,
													width: '100%',
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
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const EventDetail: FC<EventDetailProps> = ({
	title,
	description,
	event,
	image,
}): JSX.Element => {
	const { id } = useParams();
	const code = id ?? '';
	const [eventDetailData, setPage] = useEventDetailPageList({ event, code });
	const [branch, setSwitch] = useState(true);
	const file = String(code + '2.png');

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box sx={{ mb: 10 }}>
			<EventSubHeader
				title={title}
				description={description}
				subtitle={'Live From Space'}
				change={false}
				branch={branch}
				setSwitch={setSwitch}
			/>
			<Box sx={{ m: 3 }}>
				<CardMedia
					component="img"
					width="100%"
					image={useImageUrl({ image, file, path: 'event' })}
					sx={{ p: 1.5 }}
				/>
			</Box>
			<EventSubHeader
				title={title}
				description={description}
				subtitle={'전체상품'}
				change={true}
				branch={branch}
				setSwitch={setSwitch}
			/>
			<Box sx={{ m: 3 }}>
				<Box sx={{ my: 2 }}>
					{branch ? (
						<GoodsGrid
							image={image}
							title={title}
							description={description}
							goodsData={eventDetailData.content}
						/>
					) : (
						<GoodsRow
							image={image}
							title={title}
							description={description}
							goodsData={eventDetailData.content}
						/>
					)}
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Pagination
						count={eventDetailData.totalPages - 1}
						variant="outlined"
						color="primary"
						siblingCount={0}
						boundaryCount={1}
						hidePrevButton
						hideNextButton
						onChange={pageChange}
						size="small"
					/>
				</Box>
			</Box>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	event: bindActionCreators(Api.event, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(EventDetail);
