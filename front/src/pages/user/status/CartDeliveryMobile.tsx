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
	Divider,
	IconButton,
	Breadcrumbs,
	CardMedia,
	CardActionArea,
	Typography,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import {
	ArrowForwardIos as ArrowForwardIosIcon,
	GradingOutlined as GradingOutlinedIcon,
	LocalShippingOutlined as LocalShippingOutlinedIcon,
	Restore as RestoreIcon,
	CreditCardOutlined as CreditCardOutlinedIcon,
	BallotOutlined as BallotOutlinedIcon,
	ExpandMore as ExpandMoreIcon,
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
			{value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
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
		fontSize: { xs: '11px', sm: '12px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const labelCell: SxProps<Theme> = {
		px: 0,
		py: 0.2,
		width: '60px',
		borderBlock: 'none',
	};
	const info: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: '11px', sm: '12px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const infoBreadcrumbs: SxProps<Theme> = {
		color: '#b2b2b2',
		'.MuiBreadcrumbs-separator': {
			mx: 0.5,
		},
	};
	const infoOriginPrice: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '13px' },
		fontWeight: 'bold',
		textDecoration: 'line-through',
		color: '#aaa',
	};
	const infoDiscountPrice: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '13px' },
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
		width: '40%',
	};
	const productBox: SxProps<Theme> = {
		width: '60%',
		justifyContent: 'left',
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
											height="120"
										/>
									</CardActionArea>
								</Card>
							</TableCell>
							<TableCell sx={productBox}>
								<Table size="small">
									<TableBody>
										<TableRow>
											<TableCell sx={labelCell}>
												<Typography component="span" sx={label}>
													상품명
												</Typography>
											</TableCell>
											<TableCell sx={infoCell}>
												<Typography component="span" sx={info}>
													스파오
												</Typography>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell sx={labelCell}>
												<Typography component="span" sx={label}>
													브랜드
												</Typography>
											</TableCell>
											<TableCell sx={infoCell}>
												<Typography component="span" sx={info}>
													베이직
												</Typography>
											</TableCell>
										</TableRow>
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
							</TableCell>
						</TableRow>
						<TableRow sx={rowItem}>
							<TableCell colSpan={2} sx={controlBox}>
								<Stack direction="row" spacing={1}>
									<ButtonDelivery
										buttonType="search"
										device="mobile"
										variant="outlined"
									>
										배송 조회
									</ButtonDelivery>
									<ButtonDelivery
										buttonType="cancel"
										device="mobile"
										variant="outlined"
									>
										주문·배송 취소
									</ButtonDelivery>
									<ButtonDelivery
										buttonType="inquiry"
										device="mobile"
										variant="outlined"
									>
										판매자 문의
									</ButtonDelivery>
								</Stack>
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

const CartDeliveryMobile: FC<CartDeliveryProps> = ({
	title,
	description,
	type,
	setSwitch,
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
		fontSize: { xs: '14px', sm: '15px' },
		fontWeight: 'bold',
	};
	const orderPreview: SxProps<Theme> = {
		pt: 3,
		pb: 1,
		fontSize: { xs: '10px', sm: '14px' },
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
		fontSize: { xs: '18px', sm: '24px' },
		fontWeight: 'bold',
	};
	const orderDetail: SxProps<Theme> = {
		py: 1,
		bgcolor: '#F8F8F8',
	};
	const orderButton: SxProps<Theme> = {
		pt: '2px',
		px: 1,
		fontSize: { xs: '10px', sm: '14px' },
		fontWeight: 'bold',
	};
	const labelChip: SxProps<Theme> = {
		height: { xs: '23px', sm: '25px' },
		fontSize: { xs: '11px', sm: '14px' },
	};
	const labelTabs: SxProps<Theme> = {
		minHeight: '30px',
	};
	const labelTab: SxProps<Theme> = {
		py: 0,
		minHeight: '30px',
		fontSize: { xs: '12px', sm: '14px' },
		fontWeight: 'bold',
	};
	const orderBox: SxProps<Theme> = {
		mx: 1,
		my: 2,
		border: '1px solid #ddd',
		borderRadius: '7px',
	};
	const searchBox: SxProps<Theme> = {
		pt: 0,
	};
	const selectBox: SxProps<Theme> = {
		pt: 1.5,
	};
	const orderViewBox: SxProps<Theme> = {
		pt: 1,
	};
	const itemSummary: SxProps<Theme> = {
		'.MuiAccordionSummary-content': {
			alignItems: 'center',
		},
	};
	const itemText: SxProps<Theme> = {
		px: 2,
		fontSize: { xs: '14px', sm: '15px' },
		fontWeight: 'bold',
		color: '#6b6b6b',
	};
	const itemIcon: SxProps<Theme> = {
		minWidth: '40px',
	};
	const itemArrow: SxProps<Theme> = {
		fontSize: { xs: '14px', sm: '15px' },
		color: '#6b6b6b',
	};
	switch (type) {
		case 'DS':
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
											최근상품
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
				</Box>
			);
		case 'DA':
			return (
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="order-content"
						id="order-header"
						sx={itemSummary}
					>
						<BallotOutlinedIcon />
						<Typography sx={itemText}>주문목록</Typography>
					</AccordionSummary>
					<AccordionDetails>
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
								<Tabs
									value={orderView}
									onChange={orderViewChange}
									sx={labelTabs}
								>
									<Tab label="전체" value={0} sx={labelTab} />
									<Tab label="배송중내역" value={1} sx={labelTab} disabled />
									<Tab label="배송완료내역" value={2} sx={labelTab} disabled />
								</Tabs>
							</Box>
							<TabPanel value={orderView} index={0}>
								<UserOrderDetail
									title={title}
									description={description}
									type={'A'}
								/>
							</TabPanel>
							<TabPanel value={orderView} index={1}>
								<UserOrderDetail
									title={title}
									description={description}
									type={'D'}
								/>
							</TabPanel>
							<TabPanel value={orderView} index={2}>
								<UserOrderDetail
									title={title}
									description={description}
									type={'F'}
								/>
							</TabPanel>
						</Box>
					</AccordionDetails>
				</Accordion>
			);
		case 'DL':
			return (
				<Box>
					<ListItem disablePadding>
						<ListItemButton onClick={setSwitch}>
							<ListItemIcon sx={itemIcon}>
								<LocalShippingOutlinedIcon />
							</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{
									style: { fontSize: 14, fontWeight: 'bold' },
								}}
								primary="주문/배송내역"
							/>
							<ArrowForwardIosIcon fontSize="small" sx={itemArrow} />
						</ListItemButton>
					</ListItem>
					<Divider variant="middle" component="li" />
				</Box>
			);
		default:
			return <></>;
	}
};

export default CartDeliveryMobile;
