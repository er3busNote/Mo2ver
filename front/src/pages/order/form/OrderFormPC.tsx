import React, { FC } from 'react';
import AppSubStepHeader from '@layouts/AppSubStepHeader';
import {
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface OrderProps {
	title: string;
	description: string;
	steps: string[];
}

const OrderFormPC: FC<OrderProps> = ({
	title,
	description,
	steps,
}): JSX.Element => {
	const mainTitle: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: '12px', sm: '13px', lg: '15px' },
		fontWeight: 'bold',
	};
	const mainDescription: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: '#b2b2b2',
	};
	const label: SxProps<Theme> = {
		py: 0.5,
		fontSize: { xs: '11px', sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: '#000',
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
	const modifyButton: SxProps<Theme> = {
		height: '32px',
	};

	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<Box sx={{ mx: 3, my: 2 }}>
				<Grid container spacing={4}>
					{/* Left Side */}
					<Grid item xs={12} md={8}>
						{/* 주문 상품 정보 */}
						<Card variant="outlined">
							<CardContent>
								<Typography component="span" sx={mainTitle}>
									주문 상품 정보
								</Typography>
								<Box display="flex" mt={2}>
									<img src="/images/soap.png" alt="상품 이미지" width={80} />
									<Box display="flex" flexDirection="column" ml={2}>
										<Typography component="span" sx={label}>
											Daily Facial Soap
										</Typography>
										<Typography component="span" sx={label}>
											용량: 80ml - 1개
										</Typography>
										<Typography component="span" sx={label}>
											18,000원
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>

						{/* 주문자 정보 */}
						<Card variant="outlined" sx={{ mt: 2 }}>
							<CardContent>
								<Typography component="span" sx={mainTitle}>
									주문자 정보
								</Typography>
								<Box display="flex" justifyContent="space-between" mt={1}>
									<Box
										display="flex"
										flexDirection="column"
										alignItems="flex-start"
									>
										<Typography component="span" sx={label}>
											홍길동
										</Typography>
										<Typography component="span" sx={label}>
											01012345678
										</Typography>
										<Typography component="span" sx={label}>
											user@inweb.me
										</Typography>
									</Box>
									<Button variant="outlined" sx={modifyButton}>
										수정
									</Button>
								</Box>
							</CardContent>
						</Card>

						{/* 배송 정보 */}
						<Card variant="outlined" sx={{ mt: 2 }}>
							<CardContent>
								<Typography component="span" sx={mainTitle}>
									배송 정보
								</Typography>
								<Box display="flex" justifyContent="space-between" mt={1}>
									<Box
										display="flex"
										flexDirection="column"
										alignItems="flex-start"
									>
										<Typography component="span" sx={label}>
											홍길동
										</Typography>
										<Typography component="span" sx={label}>
											01012345678
										</Typography>
										<Typography component="span" sx={label}>
											서울특별시 서대문구 성산로7길 89-8 (연희동) 주식회사
											야임웹 (03706)
										</Typography>
									</Box>
									<Button variant="outlined" sx={modifyButton}>
										변경
									</Button>
								</Box>
								<TextField
									fullWidth
									label="배송 메모"
									placeholder="배송메모를 선택해 주세요."
									sx={{ mt: 2 }}
								/>
							</CardContent>
						</Card>

						{/* 쿠폰/포인트 */}
						<Card variant="outlined" sx={{ mt: 2 }}>
							<CardContent>
								<Typography component="span" sx={mainTitle}>
									쿠폰/포인트
								</Typography>
								<Box display="flex" alignItems="center" gap={1} mt={2}>
									<TextField label="쿠폰" value="1,000" size="small" />
									<Button variant="contained">쿠폰적용</Button>
								</Box>
								<Box display="flex" alignItems="center" gap={1} mt={2}>
									<TextField label="쿠폰 번호" fullWidth size="small" />
									<Button variant="outlined" sx={{ width: '120px' }}>
										번호확인
									</Button>
								</Box>
								<Box display="flex" alignItems="center" gap={1} mt={2}>
									<TextField label="포인트" fullWidth size="small" />
									<Button variant="outlined" sx={{ width: '120px' }}>
										전액사용
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
					</Grid>

					{/* Right Side */}
					<Grid item xs={12} md={4}>
						{/* 결제 금액 */}
						<Card variant="outlined">
							<CardContent sx={{ pb: '12px !important' }}>
								<Typography component="span" sx={mainTitle}>
									최종 결제금액
								</Typography>
								<Box mt={2}>
									{[
										['상품가격', '18,000원'],
										['쿠폰 할인', '-1,000원'],
										['포인트 사용', '-0원'],
										['배송비', '+2,500원'],
									].map(([label, value]) => (
										<Box
											display="flex"
											justifyContent="space-between"
											key={label}
										>
											<Typography sx={infoSub}>{label}</Typography>
											<Typography sx={info}>{value}</Typography>
										</Box>
									))}
									<Box display="flex" justifyContent="space-between" mt={1}>
										<Typography sx={info}>총 결제금액</Typography>
										<Typography sx={info}>19,500원</Typography>
									</Box>
									<Typography color="primary" mt={1}>
										700 포인트 적립예정
									</Typography>
								</Box>
							</CardContent>
						</Card>

						{/* 결제 방법 */}
						<Card variant="outlined" sx={{ mt: 2 }}>
							<CardContent sx={{ pb: '12px !important' }}>
								<Typography component="span" sx={mainTitle}>
									결제 방법
								</Typography>
								<Box
									display="flex"
									flexDirection="column"
									alignItems="flex-start"
								>
									<FormControl fullWidth sx={{ mt: 2 }}>
										<InputLabel>은행 선택</InputLabel>
										<Select value={'00은행'}>
											<MenuItem value="00은행">
												00은행: 000-00-0000 예금주명
											</MenuItem>
										</Select>
									</FormControl>
									<TextField
										fullWidth
										label="입금자명 (미입력시 주문자명)"
										size="small"
										sx={{ mt: 2 }}
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="현금영수증 신청"
										sx={{ mt: 1 }}
									/>
								</Box>
							</CardContent>
						</Card>

						{/* 결제 동의 및 버튼 */}
						<Card variant="outlined" sx={{ mt: 2 }}>
							<CardContent>
								<Box
									display="flex"
									flexDirection="column"
									alignItems="flex-start"
								>
									<FormControlLabel control={<Checkbox />} label="전체 동의" />
									<FormControlLabel
										control={<Checkbox />}
										label="구매조건 확인 및 결제진행에 동의"
									/>
								</Box>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									sx={{ mt: 2 }}
								>
									결제하기
								</Button>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default OrderFormPC;
