import React, { FC, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActive } from '../../../store/index';
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
} from '@mui/material';
import { red } from '@mui/material/colors';
import { SxProps, Theme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import StarsIcon from '@mui/icons-material/Stars';

const EVENT_INFO = [
	'https://upload.wikimedia.org/wikipedia/en/5/5f/Mac_Miller_Live_from_Space.jpg',
];

const IMAGE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

interface EventDetailProps {
	title: string;
	description: string;
}

const GoodsGrid: FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (code: string) => {
		//dispatch(menuActive('/goods/' + code + '/detail'));
		//navigate('/goods/' + code + '/detail');
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={6} md={3} lg={3}>
				<Card
					elevation={0}
					sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
					onClick={() => goodsClick('0')}
				>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image={IMAGE_INFO[0]}
							alt="green iguana"
						/>
						<CardContent>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '11px', sm: '12px', lg: '13px' },
									fontWeight: 'bold',
								}}
							>
								스파오
							</Typography>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '10px', sm: '11px', lg: '12px' },
									fontWeight: 'bold',
								}}
							>
								베이직
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
										69,900원
									</Typography>
									<Typography
										color="text.secondary"
										sx={{
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											fontWeight: 'bold',
										}}
									>
										64,900원
									</Typography>
								</Breadcrumbs>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={6} md={3} lg={3}>
				<Card
					elevation={0}
					sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
					onClick={() => goodsClick('1')}
				>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image={IMAGE_INFO[1]}
							alt="green iguana"
						/>
						<CardContent>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '11px', sm: '12px', lg: '13px' },
									fontWeight: 'bold',
								}}
							>
								코드그라피
							</Typography>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '10px', sm: '11px', lg: '12px' },
									fontWeight: 'bold',
								}}
							>
								내피분리형
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
										139,000원
									</Typography>
									<Typography
										color="text.secondary"
										sx={{
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											fontWeight: 'bold',
										}}
									>
										79,900원
									</Typography>
								</Breadcrumbs>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={6} md={3} lg={3}>
				<Card
					elevation={0}
					sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
					onClick={() => goodsClick('2')}
				>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image={IMAGE_INFO[2]}
							alt="green iguana"
						/>
						<CardContent>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '11px', sm: '12px', lg: '13px' },
									fontWeight: 'bold',
								}}
							>
								집시
							</Typography>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '10px', sm: '11px', lg: '12px' },
									fontWeight: 'bold',
								}}
							>
								마스터 구스다운 숏패딩
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
										349,900원
									</Typography>
									<Typography
										color="text.secondary"
										sx={{
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											fontWeight: 'bold',
										}}
									>
										199,000원
									</Typography>
								</Breadcrumbs>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={6} md={3} lg={3}>
				<Card
					elevation={0}
					sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
					onClick={() => goodsClick('3')}
				>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image={IMAGE_INFO[3]}
							alt="green iguana"
						/>
						<CardContent>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '11px', sm: '12px', lg: '13px' },
									fontWeight: 'bold',
								}}
							>
								키뮤어
							</Typography>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '10px', sm: '11px', lg: '12px' },
									fontWeight: 'bold',
								}}
							>
								서플러스 울 (WOOL)
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
										159,000원
									</Typography>
									<Typography
										color="text.secondary"
										sx={{
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											fontWeight: 'bold',
										}}
									>
										82,240원
									</Typography>
								</Breadcrumbs>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		</Grid>
	);
};

const GoodsRow: FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (code: string) => {
		//dispatch(menuActive('/goods/' + code + '/detail'));
		//navigate('/goods/' + code + '/detail');
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
	const title: SxProps<Theme> = {
		fontSize: { xs: '14px', sm: '15px', lg: '17px' },
		fontWeight: 'bold',
	};
	const description: SxProps<Theme> = {
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
					<TableRow sx={rowItem}>
						<TableCell sx={cardBox}>
							<Card elevation={0} onClick={() => goodsClick('0')}>
								<CardActionArea>
									<CardMedia
										component="img"
										image={IMAGE_INFO[0]}
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
									<Typography component="span" sx={title}>
										Product Info
									</Typography>
									<Typography component="span" sx={description}>
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
															Publisher
														</Typography>
														<Typography component="span" sx={label}>
															품번
														</Typography>
													</Breadcrumbs>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={info}>
															Mo2ver
														</Typography>
														<Typography component="span" sx={info}>
															10000010
														</Typography>
													</Breadcrumbs>
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
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={info}>
															2023
														</Typography>
														<Typography component="span" sx={info}>
															남
														</Typography>
													</Breadcrumbs>
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
									<Typography component="span" sx={title}>
										Price Info
									</Typography>
									<Typography component="span" sx={description}>
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
													<Typography component="span" sx={infoOriginPrice}>
														69,900원
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={priceCell}>
													<Typography component="span" sx={label}>
														할인가
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
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
													</Breadcrumbs>
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
					<TableRow sx={rowItem}>
						<TableCell sx={cardBox}>
							<Card elevation={0} onClick={() => goodsClick('1')}>
								<CardActionArea>
									<CardMedia
										component="img"
										image={IMAGE_INFO[1]}
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
									<Typography component="span" sx={title}>
										Product Info
									</Typography>
									<Typography component="span" sx={description}>
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
															Publisher
														</Typography>
														<Typography component="span" sx={label}>
															품번
														</Typography>
													</Breadcrumbs>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={info}>
															Mo2ver
														</Typography>
														<Typography component="span" sx={info}>
															10000010
														</Typography>
													</Breadcrumbs>
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
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={info}>
															2023
														</Typography>
														<Typography component="span" sx={info}>
															남
														</Typography>
													</Breadcrumbs>
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
									<Typography component="span" sx={title}>
										Price Info
									</Typography>
									<Typography component="span" sx={description}>
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
													<Typography component="span" sx={infoOriginPrice}>
														69,900원
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={priceCell}>
													<Typography component="span" sx={label}>
														할인가
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
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
													</Breadcrumbs>
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
					<TableRow sx={rowItem}>
						<TableCell sx={cardBox}>
							<Card elevation={0} onClick={() => goodsClick('2')}>
								<CardActionArea>
									<CardMedia
										component="img"
										image={IMAGE_INFO[2]}
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
									<Typography component="span" sx={title}>
										Product Info
									</Typography>
									<Typography component="span" sx={description}>
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
															Publisher
														</Typography>
														<Typography component="span" sx={label}>
															품번
														</Typography>
													</Breadcrumbs>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={info}>
															Mo2ver
														</Typography>
														<Typography component="span" sx={info}>
															10000010
														</Typography>
													</Breadcrumbs>
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
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={info}>
															2023
														</Typography>
														<Typography component="span" sx={info}>
															남
														</Typography>
													</Breadcrumbs>
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
									<Typography component="span" sx={title}>
										Price Info
									</Typography>
									<Typography component="span" sx={description}>
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
													<Typography component="span" sx={infoOriginPrice}>
														69,900원
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={priceCell}>
													<Typography component="span" sx={label}>
														할인가
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
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
													</Breadcrumbs>
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
					<TableRow sx={rowItem}>
						<TableCell sx={cardBox}>
							<Card elevation={0} onClick={() => goodsClick('3')}>
								<CardActionArea>
									<CardMedia
										component="img"
										image={IMAGE_INFO[3]}
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
									<Typography component="span" sx={title}>
										Product Info
									</Typography>
									<Typography component="span" sx={description}>
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
															Publisher
														</Typography>
														<Typography component="span" sx={label}>
															품번
														</Typography>
													</Breadcrumbs>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={info}>
															Mo2ver
														</Typography>
														<Typography component="span" sx={info}>
															10000010
														</Typography>
													</Breadcrumbs>
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
													<Breadcrumbs
														sx={infoBreadcrumbs}
														aria-label="breadcrumb"
													>
														<Typography component="span" sx={info}>
															2023
														</Typography>
														<Typography component="span" sx={info}>
															남
														</Typography>
													</Breadcrumbs>
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
									<Typography component="span" sx={title}>
										Price Info
									</Typography>
									<Typography component="span" sx={description}>
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
													<Typography component="span" sx={infoOriginPrice}>
														69,900원
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={priceCell}>
													<Typography component="span" sx={label}>
														할인가
													</Typography>
												</TableCell>
												<TableCell sx={infoCell}>
													<Breadcrumbs
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
													</Breadcrumbs>
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
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const EventDetail: FC<EventDetailProps> = ({
	title,
	description,
}): JSX.Element => {
	const { id } = useParams();
	const [page, setPage] = useState(0);
	const [branch, setSwitch] = useState(true);

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
					image={EVENT_INFO[Number(id)]}
					sx={{ p: 1.5 }}
					alt="Live from space album cover"
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
				<Box sx={{ my: 2 }}>{branch ? <GoodsGrid /> : <GoodsRow />}</Box>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Pagination
						count={1}
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

export default EventDetail;
