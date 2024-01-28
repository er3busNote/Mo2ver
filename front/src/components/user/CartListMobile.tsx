import React, {
	FC,
	useState,
	ChangeEvent,
	forwardRef,
	ForwardedRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActive } from '../../store/index';
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

const IMAGE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

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

interface CartListProps {
	description: string;
	steps: string[];
}

const CartList: FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [page, setPage] = useState(0);

	const goodsClick = (code: string) => {
		//dispatch(menuActive('/goods/' + code + '/detail'));
		//navigate('/goods/' + code + '/detail');
	};

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
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
	return (
		<Box>
			<Checkbox sx={checkBox} defaultChecked />
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
											{isBrowser && (
												<TableCell sx={labelCell}>
													<Typography component="span" sx={label}>
														상품명
													</Typography>
												</TableCell>
											)}
											<TableCell sx={infoCell}>
												<Typography component="span" sx={info}>
													스파오
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
													베이직
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
													69,900원
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
								<NumberInput defaultValue={1} min={1} max={99} />
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
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
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
	);
};

const CartTotal: FC = (): JSX.Element => {
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
											12,150원
										</Typography>
										<Typography component="span" sx={calcinfoSub}>
											(1,350원 할인)
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
											0원
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
											1종 1권
										</Typography>
										<Typography component="span" sx={calcinfoSub}>
											(1개)
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
											1,220점
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
											240점
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
															12,150원
														</Typography>
														<Typography component="span" sx={calcinfoSub}>
															(1,350원 할인)
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
															0원
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
															1종 1권
														</Typography>
														<Typography component="span" sx={calcinfoSub}>
															(1개)
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
															1,220점
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
															240점
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
															12,150
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
															1,463점
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
											12,150
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
											1,463점
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
	description,
	steps,
}): JSX.Element => {
	return (
		<Box sx={{ mb: 10 }}>
			<AppSubStepHeader description={description} steps={steps} />
			<Box sx={{ mx: 2, my: 2 }}>
				<CartList />
			</Box>
			<Box sx={{ mx: 3, my: 2 }}>
				<Box>
					<CartTotal />
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

export default CartListMobile;
