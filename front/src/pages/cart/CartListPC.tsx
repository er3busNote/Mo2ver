import React, {
	FC,
	ChangeEvent,
	FocusEvent,
	PointerEvent,
	KeyboardEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { changeNext, menuActive } from '@store/index';
import { TitleInfo } from '@store/types';
import { CartData, CartPageData } from '@api/types';
import Api from '@api/index';
import useImageUrl from '@hooks/useImageUrl';
import AppSubStepHeader from '@layouts/AppSubStepHeader';
import NumberInput from '@components/input/NumberInput';
import ButtonCart from '@components/button/ButtonCart';
import PageNavigator from '@components/pagination/PageNavigator';
import {
	Box,
	Card,
	Rating,
	Checkbox,
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
import { red, pink } from '@mui/material/colors';
import { SxProps, Theme } from '@mui/material/styles';
import StarsIcon from '@mui/icons-material/Stars';
import { sumBy } from 'lodash';

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
		newValue: number | null,
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
		px: 0,
		width: '33%',
		justifyContent: 'left',
		textAlign: 'left',
	};
	const priceBox: SxProps<Theme> = {
		px: 0,
		justifyContent: 'center',
		textAlign: 'left',
	};
	const selectBox: SxProps<Theme> = {
		width: '10%',
		textAlign: 'center',
	};
	const emptyBox: SxProps<Theme> = {
		py: 2,
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
						<TableCell sx={thHeader} align="center">
							수량
						</TableCell>
						<TableCell sx={thHeader} align="center">
							선택
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{cartData ? (
						cartData.map((data: CartData, index: number) => {
							const file = String(data.image?.goodsImageAttachFile ?? '');
							return (
								<TableRow key={index} sx={rowItem}>
									<TableCell sx={cardBox} component="th" scope="row">
										<Card
											elevation={0}
											onClick={() => goodsClick(data.goodsCode)}
										>
											<CardActionArea>
												<CardMedia
													component="img"
													height="170"
													image={useImageUrl({ image, file })}
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
																{data.goodsName}
															</Typography>
															<Typography component="span" sx={info}>
																{data.goodsBrand}
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
																{data.goodsYear}
															</Typography>
															<Typography component="span" sx={info}>
																{data.goodsGender}
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
													<TableCell sx={infoCell}>
														<Typography component="span" sx={infoOriginPrice}>
															{data.supplyPrice?.toLocaleString()}원
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
									<TableCell>
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
											<ButtonCart
												buttonType="buynow"
												device="pc"
												variant="outlined"
											>
												바로 구매
											</ButtonCart>
											<ButtonCart
												buttonType="cartremove"
												device="pc"
												variant="outlined"
												onClick={() => removeCartClick(data.goodsCode)}
											>
												장바구니 삭제
											</ButtonCart>
										</Box>
									</TableCell>
									<TableCell sx={selectBox}>
										<Checkbox
											checked={data.check}
											onChange={(event) =>
												handleChange(event, data.goodsCode, data.amount)
											}
										/>
									</TableCell>
								</TableRow>
							);
						})
					) : (
						<TableRow sx={rowItem}>
							<TableCell colSpan={5} sx={emptyBox} align="center">
								장바구니가 비어있습니다.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
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

	const labelCell: SxProps<Theme> = {
		px: 0,
		borderBlock: 'none',
	};
	const infoCell: SxProps<Theme> = {
		px: 0,
		borderBlock: 'none',
	};
	const infoCellSub: SxProps<Theme> = {
		px: 0,
		display: 'flex',
		borderBlock: 'none',
	};
	const calclabel: SxProps<Theme> = {
		pl: 1,
		fontSize: { sm: '14px', lg: '15px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const calcinfo: SxProps<Theme> = {
		px: 2,
		fontSize: { sm: '14px', lg: '15px' },
		fontWeight: 'bold',
		color: '#000',
	};
	const calcinfoSub: SxProps<Theme> = {
		fontSize: { sm: '13px', lg: '14px' },
		fontWeight: 'bold',
		display: 'block',
		color: '#b2b2b2',
	};
	const totalLabel: SxProps<Theme> = {
		fontSize: { sm: '0.9rem', lg: '1.0rem' },
		fontWeight: 'bold',
	};
	const totalPrice: SxProps<Theme> = {
		color: pink[500],
		fontSize: { sm: '0.9rem', lg: '1.0rem' },
		fontWeight: 'bold',
	};
	const totalInfo: SxProps<Theme> = {
		px: 1,
		fontSize: { sm: '0.9rem', lg: '1.0rem' },
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
	const totalBox: SxProps<Theme> = {
		px: 8,
		py: 2,
		bgcolor: '#f9f9f9',
		border: '1px solid #dfe3e8',
		borderRadius: '8px',
	};
	return (
		<Box sx={totalBox}>
			<TableContainer>
				<Table size="small">
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row" sx={calcPriceBox}>
								<Table size="small">
									<TableBody>
										<TableRow>
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
										<TableRow>
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
										<TableRow>
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
										<TableRow>
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
										<TableRow>
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
										<TableRow>
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
										<TableRow>
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
			</TableContainer>
		</Box>
	);
};

const CartListPC: FC<CartListProps> = ({
	title,
	description,
	steps,
	setPage,
	cartPageData,
	image,
	onCartUpdate,
	onCartDelete,
}): JSX.Element => {
	const calculateTotalSupplyPrice = (cartData: Array<CartData>) =>
		sumBy(cartData, (item) => item.supplyPrice ?? 0);

	const calculateTotalOptionCount = (cartData: Array<CartData>) =>
		sumBy(cartData, (item) => item.amount ?? 0);

	const totalSalePrice = cartPageData.cartTotal ?? 0;
	const totalSupplyPrice = cartPageData.cartList
		? calculateTotalSupplyPrice(cartPageData.cartList)
		: 0;
	const totalCount = cartPageData.cartList ? cartPageData.cartList.length : 0;
	const totalOptionCount = cartPageData.cartList
		? calculateTotalOptionCount(cartPageData.cartList)
		: 0;

	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<Box sx={{ mx: 3, my: 2 }}>
				<CartList
					title={title}
					description={description}
					image={image}
					cartData={cartPageData.cartList}
					onCartUpdate={onCartUpdate}
					onCartDelete={onCartDelete}
				/>
				<Box sx={{ mt: 2, display: 'none', justifyContent: 'center' }}>
					<PageNavigator count={1} setPage={setPage} />
				</Box>
			</Box>
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ mx: 2, width: '75%' }}>
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
						pr: 2,
						width: '20%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<ButtonCart buttonType="selectbuynow" device="pc" variant="outlined">
						선택상품구매
					</ButtonCart>
					<ButtonCart buttonType="allbuynow" device="pc" variant="outlined">
						전체상품구매
					</ButtonCart>
				</Box>
			</Box>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(CartListPC);
