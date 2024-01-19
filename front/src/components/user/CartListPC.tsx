import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActive } from '../../store/index';
import UserSubHeader from './cmmn/UserSubHeader';
import {
	Box,
	Link,
	Card,
	Button,
	Rating,
	Breadcrumbs,
	CardMedia,
	CardActionArea,
	Typography,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { SxProps, Theme } from '@mui/material/styles';
import StarsIcon from '@mui/icons-material/Stars';

const IMAGE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const CartList: FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (code: string) => {
		//dispatch(menuActive('/goods/' + code + '/detail'));
		//navigate('/goods/' + code + '/detail');
	};

	const thHeader: SxProps<Theme> = {
		px: 5,
		py: 1.5,
		width: 180,
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
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
		fontSize: { sm: '15px', lg: '17px' },
		fontWeight: 'bold',
	};
	const description: SxProps<Theme> = {
		px: 1.5,
		fontSize: { sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		display: 'inline',
		color: '#b2b2b2',
	};
	const label: SxProps<Theme> = {
		py: 0.5,
		fontSize: { sm: '12px', lg: '13px' },
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
		fontSize: { sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const infoSub: SxProps<Theme> = {
		px: 0.5,
		py: 0.5,
		fontSize: { sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		display: 'block',
		color: '#b2b2b2',
	};
	const infoBreadcrumbs: SxProps<Theme> = {
		color: '#b2b2b2',
		'.MuiBreadcrumbs-separator': {
			mx: 0.5,
		},
	};
	const infoLikeIcon: SxProps<Theme> = {
		mb: { sm: '-4px', lg: '-5px' },
		color: red[500],
		fontSize: { sm: '1.0rem', lg: '1.1rem' },
	};
	const infoRating: SxProps<Theme> = {
		mb: { sm: '-5px', lg: '-5px' },
		fontSize: { sm: '1.0rem', lg: '1.1rem' },
	};
	const infoLike: SxProps<Theme> = {
		px: 0.5,
		fontSize: { sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: 'red',
	};
	const infoShow: SxProps<Theme> = {
		px: 0.5,
		fontSize: { sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		display: 'block',
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
		fontSize: { sm: '15px', lg: '16px' },
		fontWeight: 'bold',
		textDecoration: 'line-through',
		color: '#aaa',
	};
	const infoDiscountPrice: SxProps<Theme> = {
		fontSize: { sm: '15px', lg: '16px' },
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
		width: '30%',
	};
	const productBox: SxProps<Theme> = {
		display: 'block',
	};

	return (
		<TableContainer>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell colSpan={2} sx={thHeader} align="center">
							상품명
						</TableCell>
						<TableCell sx={thHeader} align="center">
							가격
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow sx={rowItem}>
						<TableCell sx={cardBox} component="th" scope="row">
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
						<TableCell sx={cardBox} component="th" scope="row">
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
						<TableCell sx={cardBox} component="th" scope="row">
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
						<TableCell sx={cardBox} component="th" scope="row">
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

const CartListPC: FC = (): JSX.Element => {
	return (
		<Box sx={{ mb: 10 }}>
			<UserSubHeader title={'장바구니'} />
			<Box sx={{ mx: 3, my: 2 }}>
				<CartList />
			</Box>
		</Box>
	);
};

export default CartListPC;
