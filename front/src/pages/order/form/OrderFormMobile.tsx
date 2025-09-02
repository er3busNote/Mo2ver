import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import { OrderGoodsData } from '@/types/api';
import useImageUrl from '@hooks/useImageUrl';
import AppSubStepHeader from '@layouts/AppSubStepHeader';
import {
	Box,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActionArea,
	Breadcrumbs,
	Grid,
	Typography,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import DialogAddressForm from '@components/dialog/address/form/DialogAddressForm';
import DialogAddressMobile from '@components/dialog/address/DialogAddressMobile';
import RenderTextField from '@components/field/TextField';
import RenderSelectField from '@components/field/SelectField';
import RenderSelectButtonField from '@components/field/SelectButtonField';
import RenderCheckBoxField from '@components/field/CheckBoxField';
import goToGoodsDetail from '@navigate/goods/goToGoodsDetail';
import { PAYMENT_OPTIONS } from '@/constants/payment';
import { OrderFormValues } from '@/types/form';
import { OrderProps } from '@/types/order';
import { fontSize_xs, fontSize_sm, fontSize_lg } from '@utils/style';
import { get, every, isNil } from 'lodash';

const OrderFormMobile: FC<OrderProps> = ({
	title,
	description,
	steps,
	file,
	memberData,
	addressData,
	orderData,
	setAddressReload,
	onSubmit,
}): JSX.Element => {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useFormContext<OrderFormValues>();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openAddressRegister, setOpenAddressRegister] = useState(false);
	const [openAddressModify, setOpenAddressModify] = useState(false);

	const setField = () => {
		setAddressReload(true);
	};

	const openRegisterAddress = () => setOpenAddressRegister(true);
	const closeRegisterAddress = () => setOpenAddressRegister(false);
	const openModifyAddress = () => setOpenAddressModify(true);
	const closeModifyAddress = () => setOpenAddressModify(false);

	const goodsClick = (code: string) => {
		goToGoodsDetail({
			code,
			title,
			description,
			dispatch,
			navigate,
		});
	};

	const mainTitle: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: '12px', sm: '13px', lg: '15px' },
		fontWeight: 'bold',
	};
	const label: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		fontWeight: 'bold',
		color: '#000',
	};
	const error: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		fontWeight: 'bold',
		color: '#d32f2f',
	};
	const brand: SxProps<Theme> = {
		fontSize: { xs: '10px', sm: '11px', lg: '12px' },
		fontWeight: 'bold',
	};
	const price: SxProps<Theme> = {
		color: '#b2b2b2',
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		textDecoration: 'line-through',
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
		color: '#b2b2b2',
	};
	const modifyButton: SxProps<Theme> = {
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
	};
	const applyButton: SxProps<Theme> = {
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		width: '120px',
	};
	const orderForm: SxProps<Theme> = {
		'& .MuiFormControl-root': {
			width: '100%',
			my: { xs: 0, sm: 0.25 },
			overflowX: 'visible',
		},
		'label[id$="memo-label"], label[id$="coupon-label"], label[id$="couponNumber-label"], label[id$="point-label"]':
			{
				top: { xs: '-1px', sm: '-0.5px' },
				ml: 1,
			},
		'label[id$="memo-label"][data-shrink="true"], label[id$="coupon-label"][data-shrink="true"], label[id$="couponNumber-label"][data-shrink="true"], label[id$="point-label"][data-shrink="true"]':
			{
				top: { xs: '-1px', sm: '0px' },
				ml: 2,
			},
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={orderForm}
		>
			<AppSubStepHeader description={description} steps={steps} />
			<Box sx={{ mx: 2, my: 2 }}>
				<Grid container direction="column">
					{/* 상품 정보 */}
					<Card variant="outlined">
						<CardContent>
							<Typography component="span" sx={mainTitle}>
								상품 정보
							</Typography>
							<Box display="flex" mt={2} gap={2} flexWrap="wrap">
								{orderData.map((data: OrderGoodsData, index: number) => {
									const attachFile = String(
										get(data, ['imageList', 0, 'goodsImageAttachFile'], '')
									);
									return (
										<Card
											key={index}
											elevation={0}
											onClick={() => goodsClick(data.goodsCode)}
										>
											<CardActionArea>
												<CardMedia
													component="img"
													sx={{ display: 'inline', width: 80, height: 80 }}
													image={useImageUrl({ file, attachFile })}
													loading="lazy"
												/>
												<CardContent sx={{ p: 1 }}>
													<Typography component="div" sx={label}>
														{data.goodsName}
													</Typography>
													<Typography component="div" sx={brand}>
														{data.goodsBrand}
													</Typography>
													<Box
														sx={{ display: 'flex', justifyContent: 'center' }}
													>
														<Breadcrumbs
															sx={{ pt: 1 }}
															separator="›"
															aria-label="breadcrumb"
														>
															<Typography color="text.secondary" sx={price}>
																{data.supplyPrice.toLocaleString()}원
															</Typography>
															<Typography color="text.secondary" sx={label}>
																{data.salePrice.toLocaleString()}원
															</Typography>
														</Breadcrumbs>
													</Box>
												</CardContent>
											</CardActionArea>
										</Card>
									);
								})}
							</Box>
						</CardContent>
					</Card>

					{/* 주문자 정보 */}
					<Card variant="outlined" sx={{ mt: 2 }}>
						<CardContent>
							<Box display="flex" justifyContent="space-between">
								<Typography component="span" sx={mainTitle}>
									주문자 정보
								</Typography>
								<Button variant="text" sx={modifyButton}>
									주문자 변경
								</Button>
							</Box>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="flex-start"
							>
								<Typography component="span" sx={label}>
									{memberData.memberName}
								</Typography>
								<Typography component="span" sx={label}>
									{memberData.cellPhoneNumber}
								</Typography>
								<Typography component="span" sx={label}>
									{memberData.email}
								</Typography>
							</Box>
						</CardContent>
					</Card>

					{/* 배송 정보 */}
					<Card variant="outlined" sx={{ mt: 2 }}>
						<CardContent>
							<Box display="flex" justifyContent="space-between">
								<Typography component="span" sx={mainTitle}>
									배송 정보
								</Typography>
								<Box display="flex" gap={1}>
									<Button
										variant="text"
										sx={modifyButton}
										onClick={openRegisterAddress}
									>
										배송지 등록
									</Button>
									<Button
										variant="text"
										sx={modifyButton}
										onClick={openModifyAddress}
									>
										배송지 변경
									</Button>
									<DialogAddressForm
										open={openAddressRegister}
										setField={setField}
										handleClose={closeRegisterAddress}
									/>
									<DialogAddressMobile
										open={openAddressModify}
										setField={setField}
										handleClose={closeModifyAddress}
									/>
								</Box>
							</Box>
							{every(addressData, isNil) ? (
								<Typography component="span" sx={error}>
									배송정보를 입력해주세요
								</Typography>
							) : (
								<Box
									display="flex"
									flexDirection="column"
									alignItems="flex-start"
								>
									<Typography component="span" sx={label}>
										{addressData.memberName}
									</Typography>
									<Typography component="span" sx={label}>
										{addressData.cellPhoneNumber}
									</Typography>
									<Typography component="span" sx={label}>
										{addressData.roadNameBasicAddress}
									</Typography>
								</Box>
							)}
							<Box mt={2}>
								<input
									type="hidden"
									value={addressData.addressNo}
									{...register('addressNo')}
								/>
								<Controller
									name="memo"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="배송 메모를 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</Box>
						</CardContent>
					</Card>

					{/* 쿠폰/포인트 */}
					<Card variant="outlined" sx={{ mt: 2 }}>
						<CardContent>
							<Typography component="span" sx={mainTitle}>
								쿠폰/포인트
							</Typography>
							<Box display="flex" alignItems="center" gap={1} mt={2}>
								<Controller
									name="coupon"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="number"
											label="쿠폰 잔액을 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
								<Button variant="contained" sx={applyButton}>
									쿠폰적용
								</Button>
							</Box>
							<Box display="flex" alignItems="center" gap={1} mt={2}>
								<Controller
									name="point"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="number"
											label="포인트를 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
								<Button variant="outlined" sx={applyButton}>
									전액사용
								</Button>
							</Box>
							<Box display="flex" alignItems="center" gap={1} mt={2}>
								<Controller
									name="couponNumber"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="쿠폰 번호를 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
								<Button variant="outlined" sx={applyButton}>
									번호확인
								</Button>
							</Box>
							<Box mt={1}>
								<Box
									display="flex"
									flexDirection="column"
									alignItems="flex-start"
								>
									<Typography component="span" sx={label}>
										보유 포인트 <b>2,300</b>
									</Typography>
									<Typography component="span" sx={label}>
										5,000 포인트 이상 보유 및 10,000원 이상 구매시 사용 가능
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>

					{/* 결제 방법 */}
					<Card variant="outlined" sx={{ mt: 2 }}>
						<CardContent>
							<Typography component="span" sx={mainTitle}>
								결제 정보
							</Typography>
							<Controller
								name="paymentMethod"
								control={control}
								render={({ field, fieldState, formState }) => (
									<RenderSelectButtonField
										label="일반결제"
										datas={PAYMENT_OPTIONS}
										field={field}
										fieldState={fieldState}
										formState={formState}
									/>
								)}
							/>
						</CardContent>
					</Card>

					{/* 최종 결제금액 */}
					<Card variant="outlined" sx={{ mt: 2 }}>
						<CardContent>
							<Typography component="span" sx={mainTitle}>
								최종 결제 금액
							</Typography>
							<Box display="flex" justifyContent="space-between">
								<Typography sx={infoSub}>상품가격</Typography>
								<Typography sx={info}>18,000원</Typography>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography sx={infoSub}>쿠폰 할인</Typography>
								<Typography sx={info}>-1,000원</Typography>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography sx={infoSub}>포인트 사용</Typography>
								<Typography sx={info}>-0원</Typography>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography sx={infoSub}>배송비</Typography>
								<Typography sx={info}>+2,500원</Typography>
							</Box>
							<Box display="flex" justifyContent="space-between" mt={1}>
								<Typography sx={info}>총 결제금액</Typography>
								<Typography sx={info}>19,500원</Typography>
							</Box>
							<Box
								mt={2}
								gap={1}
								display="flex"
								flexDirection="column"
								alignItems="flex-start"
							>
								<Controller
									name="card"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderSelectField
											label="은행 선택"
											datas={[
												{
													value: '00은행',
													label: '00은행: 000-00-0000 예금주명',
												},
											]}
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
								<Controller
									name="cardOwner"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="입금자명 (미입력시 주문자명)"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
								<Controller
									name="agreeReceipt"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderCheckBoxField
											label="현금영수증 신청"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</Box>
						</CardContent>
					</Card>

					{/* 동의 및 결제 버튼 */}
					<Card variant="outlined" sx={{ mt: 2 }}>
						<CardContent>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="flex-start"
							>
								<Controller
									name="agreeAll"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderCheckBoxField
											label="전체 동의"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
								<Controller
									name="agreePurchase"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderCheckBoxField
											label="구매조건 확인 및 결제진행에 동의"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</Box>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								disabled={isSubmitted && !isValid}
								sx={{ mt: 2 }}
							>
								121,600원 결제하기
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</Box>
	);
};

export default OrderFormMobile;
