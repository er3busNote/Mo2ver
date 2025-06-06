import React, { FC, useState, ChangeEvent, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SearchInput from '@components/input/SearchInput';
import ButtonDelivery from '@components/button/ButtonDelivery';
import PageNavigator from '@components/pagination/PageNavigator';
import {
	Box,
	Tab,
	Tabs,
	Card,
	Grid,
	Chip,
	Stack,
	Rating,
	IconButton,
	Breadcrumbs,
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
import {
	Stars as StarsIcon,
	GradingOutlined as GradingOutlinedIcon,
	LocalShippingOutlined as LocalShippingOutlinedIcon,
	Restore as RestoreIcon,
	CreditCardOutlined as CreditCardOutlinedIcon,
} from '@mui/icons-material';
import goToGoodsDetail from '@navigate/goods/goToGoodsDetail';
import { IMAGE_INFO } from '@utils/init';
import { CartDeliveryProps } from '../types';

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

interface UserOrderDetailProps {
	title: string;
	description: string;
}

const TabPanel: FC<TabPanelProps> = ({
	children,
	value,
	index,
}): JSX.Element => {
	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</Box>
	);
};

const UserOrderDetail: FC<UserOrderDetailProps> = ({
	title,
	description,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [page, setPage] = useState(0);

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
		fontSize: { sm: '1.0rem', lg: '1.1rem' },
	};
	const infoLike: SxProps<Theme> = {
		px: 0.5,
		fontSize: { sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: 'red',
	};
	const infoOriginPrice: SxProps<Theme> = {
		fontSize: { sm: '13px', lg: '14px' },
		fontWeight: 'bold',
		textDecoration: 'line-through',
		color: '#aaa',
	};
	const infoDiscountPrice: SxProps<Theme> = {
		fontSize: { sm: '13px', lg: '14px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const infoCell: SxProps<Theme> = {
		px: 0,
		py: 0,
		borderBlock: 'none',
	};
	const infoCellStar: SxProps<Theme> = {
		px: 0,
		py: 0,
		lineHeight: '0.43',
		borderBlock: 'none',
	};
	const priceCell: SxProps<Theme> = {
		px: 0,
		py: 0.2,
		width: '60px',
		borderBlock: 'none',
	};
	const cardBox: SxProps<Theme> = {
		width: '20%',
	};
	const productBox: SxProps<Theme> = {
		width: '40%',
		justifyContent: 'left',
		textAlign: 'left',
	};
	const priceBox: SxProps<Theme> = {
		width: '15%',
		justifyContent: 'center',
		textAlign: 'left',
	};
	const controlBox: SxProps<Theme> = {
		width: '25%',
		justifyContent: 'center',
	};
	return (
		<Box>
			<TableContainer>
				<Table size="small">
					<TableBody>
						<TableRow sx={rowItem}>
							<TableCell sx={cardBox} component="th" scope="row">
								<Card elevation={0} onClick={() => goodsClick('0')}>
									<CardActionArea>
										<CardMedia
											component="img"
											image={IMAGE_INFO[0]}
											height="170"
										/>
									</CardActionArea>
								</Card>
							</TableCell>
							<TableCell sx={productBox}>
								<Table size="small">
									<TableBody>
										<TableRow>
											<TableCell sx={labelCell}>
												<Breadcrumbs
													sx={infoBreadcrumbs}
													aria-label="breadcrumb"
												>
													<Typography component="span" sx={label}>
														상품명
													</Typography>
													<Typography component="span" sx={label}>
														브랜드
													</Typography>
												</Breadcrumbs>
											</TableCell>
											<TableCell sx={infoCell}>
												<Breadcrumbs
													sx={infoBreadcrumbs}
													aria-label="breadcrumb"
												>
													<Typography component="span" sx={info}>
														스파오
													</Typography>
													<Typography component="span" sx={info}>
														베이직
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
													별점
												</Typography>
											</TableCell>
											<TableCell sx={infoCellStar}>
												<Rating
													name="read-only"
													value={4.8}
													sx={infoRating}
													readOnly
												/>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableCell>
							<TableCell sx={priceBox}>
								<Table size="small">
									<TableBody>
										<TableRow>
											<TableCell sx={priceCell}>
												<Typography component="span" sx={label}>
													판매가
												</Typography>
											</TableCell>
										</TableRow>
										<TableRow>
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
										</TableRow>
										<TableRow>
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
							</TableCell>
							<TableCell sx={controlBox}>
								<Box sx={{ display: 'grid', gap: '5px' }}>
									<ButtonDelivery
										buttonType="search"
										device="pc"
										variant="outlined"
									>
										배송 조회
									</ButtonDelivery>
									<ButtonDelivery
										buttonType="cancel"
										device="pc"
										variant="outlined"
									>
										주문·배송 취소
									</ButtonDelivery>
									<ButtonDelivery
										buttonType="inquiry"
										device="pc"
										variant="outlined"
									>
										판매자 문의
									</ButtonDelivery>
								</Box>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				<PageNavigator count={1} setPage={setPage} />
			</Box>
		</Box>
	);
};

const CartDeliveryPC: FC<Omit<CartDeliveryProps, 'type'>> = ({
	title,
	description,
}): JSX.Element => {
	const [orderView, setOrderView] = useState(0);
	const [keyword, setKeyword] = useState('');

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		setKeyword(text);
	};

	const orderViewChange = (event: React.SyntheticEvent, newValue: number) => {
		event.preventDefault();
		setOrderView(newValue);
	};

	const orderTitle: SxProps<Theme> = {
		fontSize: { sm: '15px', lg: '16px' },
		fontWeight: 'bold',
	};
	const orderPreview: SxProps<Theme> = {
		pt: 3,
		pb: 1,
		fontSize: { sm: '14px', lg: '15px' },
		color: '#adadad',
		fontWeight: 'bold',
	};
	const orderCount: SxProps<Theme> = {
		pb: 3,
		display: 'flex',
		justifyContent: 'center',
	};
	const orderText: SxProps<Theme> = {
		alignItems: 'center',
	};
	const orderInfo: SxProps<Theme> = {
		fontSize: { sm: '24px', lg: '28px' },
		fontWeight: 'bold',
	};
	const orderDetail: SxProps<Theme> = {
		py: 1,
		bgcolor: '#F8F8F8',
	};
	const orderButton: SxProps<Theme> = {
		pt: '2px',
		px: 1,
		fontSize: { sm: '14px', lg: '15px' },
		fontWeight: 'bold',
	};
	const labelChip: SxProps<Theme> = {
		height: '25px',
	};
	const labelTabs: SxProps<Theme> = {
		minHeight: '40px',
	};
	const labelTab: SxProps<Theme> = {
		py: 0,
		minHeight: '40px',
		fontWeight: 'bold',
	};
	const orderBox: SxProps<Theme> = {
		mr: 2,
		my: 2,
		border: '2px solid #ddd',
		borderRadius: '7px',
	};
	const searchBox: SxProps<Theme> = {
		pt: 2,
	};
	const selectBox: SxProps<Theme> = {
		pt: 1.5,
	};
	const orderViewBox: SxProps<Theme> = {
		pt: 1,
	};
	return (
		<Box>
			<Box sx={{ display: 'flex' }}>
				<Typography component="h2" sx={orderTitle}>
					나의 주문/배송 현황
				</Typography>
			</Box>
			<Box sx={orderBox}>
				<Grid container rowSpacing={1}>
					<Grid item xs={3}>
						<Box sx={orderPreview}>구매후기</Box>
						<Box sx={orderCount}>
							<Stack direction="row" spacing={1} sx={orderText}>
								<Typography component="span" sx={orderInfo}>
									8
								</Typography>
								<Typography component="span">건</Typography>
							</Stack>
						</Box>
						<Box sx={orderDetail}>
							<IconButton component={Link} to="/cart" sx={{ p: 0 }}>
								<GradingOutlinedIcon fontSize="small" />
								<Typography component="span" sx={orderButton}>
									구매후기
								</Typography>
							</IconButton>
						</Box>
					</Grid>
					<Grid item xs={3}>
						<Box sx={orderPreview}>배송중</Box>
						<Box sx={orderCount}>
							<Stack direction="row" spacing={1} sx={orderText}>
								<Typography component="span" sx={orderInfo}>
									4
								</Typography>
								<Typography component="span">건</Typography>
							</Stack>
						</Box>
						<Box sx={orderDetail}>
							<IconButton component={Link} to="/cart" sx={{ p: 0 }}>
								<LocalShippingOutlinedIcon fontSize="small" />
								<Typography component="span" sx={orderButton}>
									배송중
								</Typography>
							</IconButton>
						</Box>
					</Grid>
					<Grid item xs={3}>
						<Box sx={orderPreview}>최근본상품</Box>
						<Box sx={orderCount}>
							<Stack direction="row" spacing={1} sx={orderText}>
								<Typography component="span" sx={orderInfo}>
									4
								</Typography>
								<Typography component="span">건</Typography>
							</Stack>
						</Box>
						<Box sx={orderDetail}>
							<IconButton component={Link} to="/cart" sx={{ p: 0 }}>
								<RestoreIcon fontSize="small" />
								<Typography component="span" sx={orderButton}>
									최근본상품
								</Typography>
							</IconButton>
						</Box>
					</Grid>
					<Grid item xs={3}>
						<Box sx={orderPreview}>결재내역</Box>
						<Box sx={orderCount}>
							<Stack direction="row" spacing={1} sx={orderText}>
								<Typography component="span" sx={orderInfo}>
									2
								</Typography>
								<Typography component="span">건</Typography>
							</Stack>
						</Box>
						<Box sx={orderDetail}>
							<IconButton component={Link} to="/cart" sx={{ p: 0 }}>
								<CreditCardOutlinedIcon fontSize="small" />
								<Typography component="span" sx={orderButton}>
									결제내역
								</Typography>
							</IconButton>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box sx={{ pt: 2, display: 'flex' }}>
				<Typography component="h2" sx={orderTitle}>
					주문 목록
				</Typography>
			</Box>
			<Box sx={searchBox}>
				<SearchInput
					placeholder="주문한 상품을 검색할 수 있어요!"
					onChange={searchOnChange}
				/>
			</Box>
			<Box sx={selectBox}>
				<Stack direction="row" spacing={1}>
					<Chip label="최근 6개월" color="primary" sx={labelChip} />
					<Chip
						label="2023"
						color="primary"
						variant="outlined"
						sx={labelChip}
					/>
					<Chip
						label="2022"
						color="primary"
						variant="outlined"
						sx={labelChip}
					/>
				</Stack>
			</Box>
			<Box sx={orderViewBox}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={orderView} onChange={orderViewChange} sx={labelTabs}>
						<Tab label="전체" value={0} sx={labelTab} />
						<Tab label="배송중내역" value={1} sx={labelTab} disabled />
						<Tab label="배송완료내역" value={2} sx={labelTab} disabled />
					</Tabs>
				</Box>
				<TabPanel value={orderView} index={0}>
					<UserOrderDetail title={title} description={description} type={'A'} />
				</TabPanel>
				<TabPanel value={orderView} index={1}>
					<UserOrderDetail title={title} description={description} type={'D'} />
				</TabPanel>
				<TabPanel value={orderView} index={2}>
					<UserOrderDetail title={title} description={description} type={'F'} />
				</TabPanel>
			</Box>
		</Box>
	);
};

export default CartDeliveryPC;
