import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import useImageUrl from '@hooks/useImageUrl';
import EventSubHeader from './cmmn/EventSubHeader';
import ButtonTag from '@components/button/ButtonTag';
import ButtonGoods from '@components/button/ButtonGoods';
import PageNavigator from '@components/pagination/PageNavigator';
import {
	Box,
	Grid,
	Link,
	Card,
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
import { Stars as StarsIcon } from '@mui/icons-material';
import { EventData, EventProductData, EventProductPageData } from '@api/types';
import goToGoodsDetail from '@navigate/goods/goToGoodsDetail';
import { fontSize_xs, fontSize_sm, fontSize_lg } from '@utils/style';
import { isEmpty, get } from 'lodash';

interface EventDetailProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	eventData: EventData;
	eventProductData: EventProductPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface GoodsProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	goodsData: Array<EventProductData>;
}

const GoodsGrid: FC<GoodsProps> = ({
	title,
	description,
	file,
	goodsData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (code: string) => {
		goToGoodsDetail({
			code,
			title,
			description,
			dispatch,
			navigate,
		});
	};

	return (
		<Grid container spacing={3}>
			{goodsData &&
				goodsData.map((data: EventProductData, index: number) => {
					const attachFile = data.goodsImageAttachFile;
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
										image={useImageUrl({ file, attachFile })}
									/>
									<CardContent>
										<Typography
											component="div"
											sx={{
												fontSize: {
													xs: fontSize_xs,
													sm: fontSize_sm,
													lg: fontSize_lg,
												},
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
														fontSize: {
															xs: fontSize_xs,
															sm: fontSize_sm,
															lg: fontSize_lg,
														},
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
	file,
	goodsData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (code: string) => {
		goToGoodsDetail({
			code,
			title,
			description,
			dispatch,
			navigate,
		});
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
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		fontWeight: 'bold',
		display: { xs: 'none', sm: 'none', md: 'inline', lg: 'inline' },
		color: '#b2b2b2',
	};
	const label: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
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
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		fontWeight: 'bold',
		color: '#000',
	};
	const infoSub: SxProps<Theme> = {
		px: 0.5,
		py: 0.5,
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
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
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		fontWeight: 'bold',
		color: 'red',
	};
	const infoShow: SxProps<Theme> = {
		px: 0.5,
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		fontWeight: 'bold',
		display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
		color: 'blue',
	};
	const infoHashTag: SxProps<Theme> = {
		py: 1,
		display: 'flex',
		flexWrap: 'wrap',
		gap: '5px 0px',
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
		display: { xs: 'none', sm: 'block', md: 'flex', lg: 'flex' },
	};
	const priceBox: SxProps<Theme> = {
		px: 2,
	};

	return (
		<TableContainer>
			<Table size="small">
				<TableBody>
					{goodsData &&
						goodsData.map((data: EventProductData, index: number) => {
							const attachFile = data.goodsImageAttachFile;
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
													image={useImageUrl({ file, attachFile })}
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
												{!isEmpty(data.keywordList) && (
													<Box sx={infoHashTag}>
														{data.keywordList.map(
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
									</TableCell>
									<TableCell sx={priceBox}>
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
											<ButtonGoods
												buttonType="buynow"
												variant="outlined"
												isEvent={true}
											>
												바로 구매
											</ButtonGoods>
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
	file,
	eventData,
	eventProductData,
	setPage,
}): JSX.Element => {
	const [branch, setSwitch] = useState(true);
	const attachFile = String(
		get(eventData, ['imageList', 0, 'goodsImageAttachFile'], '')
	);

	return (
		<Box sx={{ mb: 10 }}>
			<EventSubHeader
				title={title}
				description={description}
				subtitle={eventData.subject}
				change={false}
				branch={branch}
				setSwitch={setSwitch}
			/>
			<Box sx={{ m: 3 }}>
				{!isEmpty(attachFile) && (
					<CardMedia
						component="img"
						width="100%"
						image={useImageUrl({ file, attachFile })}
						sx={{ p: 1.5 }}
					/>
				)}
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
							file={file}
							title={title}
							description={description}
							goodsData={eventProductData.content}
						/>
					) : (
						<GoodsRow
							file={file}
							title={title}
							description={description}
							goodsData={eventProductData.content}
						/>
					)}
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					{eventProductData.totalPages && (
						<PageNavigator
							count={eventProductData.totalPages}
							setPage={setPage}
						/>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default EventDetail;
