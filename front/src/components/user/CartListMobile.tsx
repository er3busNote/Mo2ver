import React, {
	FC,
	ChangeEvent,
	FocusEvent,
	PointerEvent,
	KeyboardEvent,
	forwardRef,
	ForwardedRef,
	Dispatch,
	SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { changeNext, menuActive } from '../../store/index';
import { TitleInfo } from '../../store/types';
import { CartData, CartPageData } from '../../api/types';
import Api from '../../api';
import useImageUrl from '../../hooks/useImageUrl';
import AppSubStepHeader from '../common/AppSubStepHeader';
import {
	Box,
	Card,
	Button,
	Checkbox,
	Pagination,
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
import {
	Unstable_NumberInput as BaseNumberInput,
	NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { blue, grey, pink } from '@mui/material/colors';
import { SxProps, Theme, styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
	isMobile,
	isBrowser,
	BrowserView,
	MobileView,
} from 'react-device-detect';

const StyledInputRoot = styled('div')(
	({ theme }) => `
	font-family: 'IBM Plex Sans', sans-serif;
	font-weight: 400;
	color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
  `
);

const StyledInput = styled('input')(
	({ theme }) => `
	font-size: 0.875rem;
	font-family: inherit;
	font-weight: 400;
	line-height: 1.375;
	color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
	background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
	border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
	box-shadow: 0px 2px 4px ${
		theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
	};
	padding: 2px;
	outline: 0;
	min-width: 0;
	width: 3rem;
	text-align: center;
  
	&:hover {
	  border-color: ${blue[400]};
	}
  
	&:focus {
	  border-color: ${blue[400]};
	  box-shadow: 0 0 0 3px ${
			theme.palette.mode === 'dark' ? blue[700] : blue[200]
		};
	}
  
	&:focus-visible {
	  outline: 0;
	}
  `
);

const StyledButton = styled('button')(
	({ theme }) => `
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 0.875rem;
	box-sizing: border-box;
	line-height: 1.5;
	border: 1px solid;
	border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
	background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
	color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
	width: 20px;
	height: 25px;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 120ms;
  
	&:hover {
	  cursor: pointer;
	  background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
	  border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
	  color: ${grey[50]};
	}
  
	&:focus-visible {
	  outline: 0;
	}
  
	&.increment {
	  order: 1;
	}
  `
);

const NumberInput = forwardRef(function CustomNumberInput(
	props: NumberInputProps,
	ref: ForwardedRef<HTMLDivElement>
) {
	return (
		<BaseNumberInput
			slots={{
				root: StyledInputRoot,
				input: StyledInput,
				incrementButton: StyledButton,
				decrementButton: StyledButton,
			}}
			slotProps={{
				incrementButton: {
					children: <AddIcon fontSize="small" />,
					className: 'increment',
				},
				decrementButton: {
					children: <RemoveIcon fontSize="small" />,
				},
			}}
			{...props}
			ref={ref}
		/>
	);
});

interface CartDataProps {
	title: string;
	description: string;
	cartData: Array<CartData>;
	image: ActionCreatorsMapObject;
	onCartUpdate: (cartData: CartData) => void;
	onCartDelete: (goodsCode: string) => void;
}

interface CartTotalProps {
	totalSalePrice: number; // 총 상품가격 (할인된 가격)
	totalSupplyPrice: number; // 총 공급가격
	deliveryPrice: number; // 배송비
	totalCount: number; // 총 주문 상풍수
	totalOptionCount: number; // 총 주문 옵션 상품수
	//totalCalcPrice: number; // 총 결제 예상 금액
	productMileage: number; // 상품 마일리지
	membershipMileage: number; // 멤버십 마일리지
	//totalCalcMileage: number; // 총 적립 마일리지
}

interface CartListProps {
	title: string;
	description: string;
	steps: string[];
	setPage: Dispatch<SetStateAction<number>>;
	cartPageData: CartPageData;
	image: ActionCreatorsMapObject;
	onCartUpdate: (cartData: CartData) => void;
	onCartDelete: (goodsCode: string) => void;
}

const CartList: FC<CartDataProps> = ({
	title,
	description,
	image,
	cartData,
	onCartUpdate,
	onCartDelete,
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

	const handleNumberChange = (
		event:
			| FocusEvent<HTMLInputElement, Element>
			| PointerEvent<Element>
			| KeyboardEvent<Element>,
		code: string,
		newValue: number | undefined,
		check: boolean | undefined
	) => {
		const cartData: CartData = {
			goodsCode: code,
			amount: newValue ?? 0,
			check: check,
		};
		onCartUpdate(cartData);
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement>,
		code: string,
		amount: number
	) => {
		const cartData: CartData = {
			goodsCode: code,
			amount: amount,
			check: event.target.checked,
		};
		onCartUpdate(cartData);
	};

	const removeCartClick = (code: string) => {
		onCartDelete(code);
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
		width: isMobile ? '50%' : '30%',
	};
	const productBox: SxProps<Theme> = {
		width: isMobile ? '30%' : '50%',
		justifyContent: 'left',
		textAlign: 'left',
	};
	const controlBox: SxProps<Theme> = {
		width: '20%',
		justifyContent: 'center',
	};
	const checkBox: SxProps<Theme> = {
		position: 'absolute',
		left: 0,
		ml: 3,
		p: 0,
		zIndex: 1,
		'& .MuiSvgIcon-root': {
			fontSize: 28,
		},
	};
	const emptyBox: SxProps<Theme> = {
		py: 2,
	};

	return (
		<Box>
			<TableContainer>
				<Table size="small">
					<TableBody>
						{cartData ? (
							cartData.map((data: CartData, index: number) => {
								const file = String(data.image?.goodsImageAttachFile ?? '');
								return (
									<TableRow key={index} sx={rowItem}>
										<Checkbox
											sx={checkBox}
											checked={data.check}
											onChange={(event) =>
												handleChange(event, data.goodsCode, data.amount)
											}
										/>
										<TableCell sx={cardBox} component="th" scope="row">
											<Card
												elevation={0}
												onClick={() => goodsClick(data.goodsCode)}
											>
												<CardActionArea>
													<CardMedia
														component="img"
														height="120"
														image={useImageUrl({ image, file })}
													/>
												</CardActionArea>
											</Card>
										</TableCell>
										<TableCell sx={productBox}>
											<Table size="small">
												<TableBody>
													<TableRow>
														{isBrowser && (
															<TableCell sx={labelCell}>
																<Typography component="span" sx={label}>
																	상품명
																</Typography>
															</TableCell>
														)}
														<TableCell sx={infoCell}>
															<Typography component="span" sx={info}>
																{data.goodsName}
															</Typography>
														</TableCell>
													</TableRow>
													<TableRow>
														{isBrowser && (
															<TableCell sx={labelCell}>
																<Typography component="span" sx={label}>
																	브랜드
																</Typography>
															</TableCell>
														)}
														<TableCell sx={infoCell}>
															<Typography component="span" sx={info}>
																{data.goodsBrand}
															</Typography>
														</TableCell>
													</TableRow>
													<TableRow>
														{isBrowser && (
															<TableCell sx={priceCell}>
																<Typography component="span" sx={label}>
																	판매가
																</Typography>
															</TableCell>
														)}
														<TableCell sx={infoCell}>
															<Typography component="span" sx={infoOriginPrice}>
																{data.supplyPrice?.toLocaleString()}원
															</Typography>
														</TableCell>
													</TableRow>
													<TableRow>
														{isBrowser && (
															<TableCell sx={priceCell}>
																<Typography component="span" sx={label}>
																	할인가
																</Typography>
															</TableCell>
														)}
														<TableCell sx={infoCell}>
															<Breadcrumbs
																sx={infoBreadcrumbs}
																separator="~"
																aria-label="breadcrumb"
															>
																<Typography
																	component="span"
																	sx={infoDiscountPrice}
																>
																	{data.salePrice?.toLocaleString()}
																</Typography>
																<Typography
																	component="span"
																	sx={infoDiscountPrice}
																>
																	{data.supplyPrice?.toLocaleString()}원
																</Typography>
															</Breadcrumbs>
														</TableCell>
													</TableRow>
												</TableBody>
											</Table>
										</TableCell>
										<TableCell sx={controlBox}>
											<NumberInput
												value={data.amount}
												min={1}
												max={99}
												onChange={(event, newValue) =>
													handleNumberChange(
														event,
														data.goodsCode,
														newValue,
														data.check
													)
												}
											/>
											<Box>
												<Button
													sx={{
														mt: 2,
														py: 1,
														width: '100%',
														fontSize: { xs: '10px', sm: '12px' },
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
												<Button
													onClick={() => removeCartClick(data.goodsCode)}
													sx={{
														mt: 0.5,
														px: 0,
														py: 1,
														width: '100%',
														fontSize: { xs: '10px', sm: '12px' },
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
													장바구니 삭제
												</Button>
											</Box>
										</TableCell>
									</TableRow>
								);
							})
						) : (
							<TableRow sx={rowItem}>
								<TableCell sx={emptyBox} align="center">
									장바구니가 비어있습니다.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

const CartTotal: FC<CartTotalProps> = ({
	totalSalePrice,
	totalSupplyPrice,
	deliveryPrice,
	totalCount,
	totalOptionCount,
	//totalCalcPrice,
	productMileage,
	membershipMileage,
	//totalCalcMileage,
}): JSX.Element => {
	const totalDiscountPrice = totalSupplyPrice - totalSalePrice; // 할인 금액
	const totalCalcPrice = totalSalePrice + deliveryPrice; // 총 결제 예상 금액
	const totalCalcMileage = productMileage + membershipMileage; // 총 적립 마일리지

	const rowItem: SxProps<Theme> = {
		py: 0.5,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'baseline',
	};
	const labelCell: SxProps<Theme> = {
		px: 0,
		py: 0,
		pl: isMobile ? 0 : 1.5,
		borderBlock: 'none',
	};
	const infoCell: SxProps<Theme> = {
		px: 0,
		py: 0,
		pr: isMobile ? 0 : 1.5,
		borderBlock: 'none',
	};
	const infoCellSub: SxProps<Theme> = {
		px: 0,
		py: 0,
		pr: isMobile ? 0 : 1.5,
		display: 'flex',
		borderBlock: 'none',
	};
	const calclabel: SxProps<Theme> = {
		pl: 1,
		fontSize: { xs: '11px', sm: '12px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const calcinfo: SxProps<Theme> = {
		px: 2,
		fontSize: { xs: '11px', sm: '12px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const calcinfoSub: SxProps<Theme> = {
		fontSize: { xs: '11px', sm: '12px' },
		fontWeight: 'bold',
		display: 'block',
		color: '#b2b2b2',
	};
	const totalLabel: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '13px' },
		fontWeight: 'bold',
	};
	const totalPrice: SxProps<Theme> = {
		color: pink[500],
		fontSize: { xs: '12px', sm: '13px' },
		fontWeight: 'bold',
	};
	const totalInfo: SxProps<Theme> = {
		px: 1,
		fontSize: { xs: '12px', sm: '13px' },
		fontWeight: 'bold',
	};
	const calcPriceBox: SxProps<Theme> = {
		px: 0,
	};
	const calcMileageBox: SxProps<Theme> = {
		px: 0,
	};
	const totalPriceBox: SxProps<Theme> = {
		px: 0,
		borderBlock: 'none',
	};
	const totalMileageBox: SxProps<Theme> = {
		px: 0,
		borderBlock: 'none',
	};
	const clacBox: SxProps<Theme> = {
		px: 2,
		py: 0.5,
		bgcolor: '#f9f9f9',
		border: '1px solid #dfe3e8',
	};
	const totalBox: SxProps<Theme> = {
		pl: 2,
		pr: 1,
		py: 0.5,
	};
	return (
		<Box>
			<Box sx={clacBox}>
				<TableContainer>
					<MobileView>
						<Table size="small">
							<TableBody>
								<TableRow sx={rowItem}>
									<TableCell sx={labelCell}>
										<Typography component="span" sx={calclabel}>
											총 상품가격
										</Typography>
									</TableCell>
									<TableCell sx={infoCellSub}>
										<Typography component="span" sx={calcinfo}>
											{totalSalePrice.toLocaleString()}원
										</Typography>
										<Typography component="span" sx={calcinfoSub}>
											({totalDiscountPrice.toLocaleString()}원 할인)
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow sx={rowItem}>
									<TableCell sx={labelCell}>
										<Typography component="span" sx={calclabel}>
											배송비
										</Typography>
									</TableCell>
									<TableCell sx={infoCell}>
										<Typography component="span" sx={calcinfo}>
											{deliveryPrice}원
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow sx={rowItem}>
									<TableCell sx={labelCell}>
										<Typography component="span" sx={calclabel}>
											총 주문 상품수
										</Typography>
									</TableCell>
									<TableCell sx={infoCellSub}>
										<Typography component="span" sx={calcinfo}>
											{totalCount}종 {totalOptionCount}벌
										</Typography>
										<Typography component="span" sx={calcinfoSub}>
											({totalOptionCount}벌)
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow sx={rowItem}>
									<TableCell sx={labelCell}>
										<Typography component="span" sx={calclabel}>
											상품 마일리지
										</Typography>
									</TableCell>
									<TableCell sx={infoCell}>
										<Typography component="span" sx={calcinfo}>
											{productMileage.toLocaleString()}점
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow sx={rowItem}>
									<TableCell sx={labelCell}>
										<Typography component="span" sx={calclabel}>
											멤버십 마일리지
										</Typography>
									</TableCell>
									<TableCell sx={infoCell}>
										<Typography component="span" sx={calcinfo}>
											{membershipMileage.toLocaleString()}점
										</Typography>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</MobileView>
					<BrowserView>
						<Table size="small">
							<TableBody>
								<TableRow>
									<TableCell component="th" scope="row" sx={calcPriceBox}>
										<Table size="small">
											<TableBody>
												<TableRow sx={rowItem}>
													<TableCell sx={labelCell}>
														<Typography component="span" sx={calclabel}>
															총 상품가격
														</Typography>
													</TableCell>
													<TableCell sx={infoCellSub}>
														<Typography component="span" sx={calcinfo}>
															{totalSalePrice.toLocaleString()}원
														</Typography>
														<Typography component="span" sx={calcinfoSub}>
															({totalDiscountPrice.toLocaleString()}원 할인)
														</Typography>
													</TableCell>
												</TableRow>
												<TableRow sx={rowItem}>
													<TableCell sx={labelCell}>
														<Typography component="span" sx={calclabel}>
															배송비
														</Typography>
													</TableCell>
													<TableCell sx={infoCell}>
														<Typography component="span" sx={calcinfo}>
															{deliveryPrice}원
														</Typography>
													</TableCell>
												</TableRow>
												<TableRow sx={rowItem}>
													<TableCell sx={labelCell}>
														<Typography component="span" sx={calclabel}>
															총 주문 상품수
														</Typography>
													</TableCell>
													<TableCell sx={infoCellSub}>
														<Typography component="span" sx={calcinfo}>
															{totalCount}종 {totalOptionCount}벌
														</Typography>
														<Typography component="span" sx={calcinfoSub}>
															({totalOptionCount}벌)
														</Typography>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</TableCell>
									<TableCell component="th" scope="row" sx={calcMileageBox}>
										<Table size="small">
											<TableBody>
												<TableRow sx={rowItem}>
													<TableCell sx={labelCell}>
														<Typography component="span" sx={calclabel}>
															상품 마일리지
														</Typography>
													</TableCell>
													<TableCell sx={infoCell}>
														<Typography component="span" sx={calcinfo}>
															{productMileage.toLocaleString()}점
														</Typography>
													</TableCell>
												</TableRow>
												<TableRow sx={rowItem}>
													<TableCell sx={labelCell}>
														<Typography component="span" sx={calclabel}>
															멤버십 마일리지
														</Typography>
													</TableCell>
													<TableCell sx={infoCell}>
														<Typography component="span" sx={calcinfo}>
															{membershipMileage.toLocaleString()}점
														</Typography>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row" sx={totalPriceBox}>
										<Table size="small">
											<TableBody>
												<TableRow sx={rowItem}>
													<TableCell sx={labelCell}>
														<Typography component="span" sx={totalLabel}>
															총 결제 예상 금액
														</Typography>
													</TableCell>
													<TableCell sx={infoCellSub}>
														<Typography component="span" sx={totalPrice}>
															{totalCalcPrice.toLocaleString()}
														</Typography>
														<Typography component="span" sx={totalInfo}>
															원
														</Typography>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</TableCell>
									<TableCell component="th" scope="row" sx={totalMileageBox}>
										<Table size="small">
											<TableBody>
												<TableRow sx={rowItem}>
													<TableCell sx={labelCell}>
														<Typography component="span" sx={totalLabel}>
															총 적립 예상 마일리지
														</Typography>
													</TableCell>
													<TableCell sx={infoCell}>
														<Typography component="span" sx={totalInfo}>
															{totalCalcMileage.toLocaleString()}점
														</Typography>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</BrowserView>
				</TableContainer>
			</Box>
			<MobileView>
				<Box sx={totalBox}>
					<TableContainer>
						<Table size="small">
							<TableBody>
								<TableRow sx={rowItem}>
									<TableCell sx={labelCell}>
										<Typography component="span" sx={totalLabel}>
											총 결제 예상 금액
										</Typography>
									</TableCell>
									<TableCell sx={infoCellSub}>
										<Typography component="span" sx={totalPrice}>
											{totalCalcPrice.toLocaleString()}
										</Typography>
										<Typography component="span" sx={totalInfo}>
											원
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow sx={rowItem}>
									<TableCell sx={labelCell}>
										<Typography component="span" sx={totalLabel}>
											총 적립 예상 마일리지
										</Typography>
									</TableCell>
									<TableCell sx={infoCell}>
										<Typography component="span" sx={totalInfo}>
											{totalCalcMileage.toLocaleString()}점
										</Typography>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</MobileView>
		</Box>
	);
};

const CartListMobile: FC<CartListProps> = ({
	title,
	description,
	steps,
	setPage,
	cartPageData,
	image,
	onCartUpdate,
	onCartDelete,
}): JSX.Element => {
	const calculateTotalSupplyPrice = (cartData: Array<CartData>) => {
		return cartData.reduce((total, item) => total + (item.supplyPrice ?? 0), 0);
	};

	const calculateTotalOptionCount = (cartData: Array<CartData>) => {
		return cartData.reduce((total, item) => total + (item.amount ?? 0), 0);
	};

	const totalSalePrice = cartPageData.cartTotal ?? 0;
	const totalSupplyPrice = cartPageData.cartList
		? calculateTotalSupplyPrice(cartPageData.cartList)
		: 0;
	const totalCount = cartPageData.cartList ? cartPageData.cartList.length : 0;
	const totalOptionCount = cartPageData.cartList
		? calculateTotalOptionCount(cartPageData.cartList)
		: 0;

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<Box sx={{ mx: 2, my: 2 }}>
				<CartList
					title={title}
					description={description}
					image={image}
					cartData={cartPageData.cartList}
					onCartUpdate={onCartUpdate}
					onCartDelete={onCartDelete}
				/>
				<Box sx={{ mt: 2, display: 'none', justifyContent: 'center' }}>
					<Pagination
						count={1}
						variant="outlined"
						color="primary"
						siblingCount={2}
						boundaryCount={2}
						hidePrevButton
						hideNextButton
						onChange={pageChange}
						size="small"
					/>
				</Box>
			</Box>
			<Box sx={{ mx: 3, my: 2 }}>
				<Box>
					<CartTotal
						totalSalePrice={totalSalePrice}
						totalSupplyPrice={totalSupplyPrice}
						deliveryPrice={0}
						totalCount={totalCount}
						totalOptionCount={totalOptionCount}
						productMileage={1220}
						membershipMileage={263}
					/>
				</Box>
				<Box
					sx={{
						py: isMobile ? 0.5 : 2,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Button
						sx={{
							mr: 0.5,
							py: 1,
							width: '100%',
							fontSize: { xs: '10px', sm: '12px' },
							fontWeight: 'bold',
							bgcolor: '#000',
							border: '1px solid #000',
							borderRadius: 1,
							color: '#fff',
							'&:hover': {
								bgcolor: '#0f0f0f',
							},
						}}
						variant="outlined"
					>
						선택상품구매
					</Button>
					<Button
						sx={{
							ml: 0.5,
							py: 1,
							width: '100%',
							fontSize: { xs: '10px', sm: '12px' },
							fontWeight: 'bold',
							bgcolor: '#7940B6',
							border: '1px solid #757595',
							borderRadius: 1,
							color: '#fff',
							'&:hover': {
								bgcolor: '#9373B5',
							},
						}}
						variant="outlined"
					>
						전체상품구매
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(CartListMobile);
