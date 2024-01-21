import React, { FC, forwardRef, ForwardedRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActive } from '../../store/index';
import CartSubHeader from './cmmn/CartSubHeader';
import {
	Box,
	Card,
	Button,
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
import {
	Unstable_NumberInput as BaseNumberInput,
	NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { red, blue, grey, pink } from '@mui/material/colors';
import { SxProps, Theme, styled } from '@mui/material/styles';
import StarsIcon from '@mui/icons-material/Stars';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

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
	border-radius: 8px;
	margin: 0 8px;
	padding: 10px 12px;
	outline: 0;
	min-width: 0;
	width: 4rem;
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
	border-radius: 999px;
	border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
	background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
	color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
	width: 32px;
	height: 32px;
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
		width: '33%',
		justifyContent: 'left',
		textAlign: 'left',
	};
	const priceBox: SxProps<Theme> = {
		justifyContent: 'center',
		textAlign: 'left',
	};
	const selectBox: SxProps<Theme> = {
		width: '10%',
		textAlign: 'center',
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
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={label}>
													상품명
												</Typography>
												<Typography component="span" sx={label}>
													브랜드
												</Typography>
											</Breadcrumbs>
										</TableCell>
										<TableCell sx={infoCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
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
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={label}>
													등록연도
												</Typography>
												<Typography component="span" sx={label}>
													성별
												</Typography>
											</Breadcrumbs>
										</TableCell>
										<TableCell sx={infoCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
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
						<TableCell>
							<NumberInput defaultValue={1} min={1} max={99} />
							<Box>
								<Button
									sx={{
										mt: 2,
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
								<Button
									sx={{
										mt: 0.5,
										py: 1,
										width: '100%',
										fontSize: '14px',
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
						<TableCell sx={selectBox}>
							<Checkbox defaultChecked />
						</TableCell>
					</TableRow>
					<TableRow sx={rowItem}>
						<TableCell sx={cardBox} component="th" scope="row">
							<Card elevation={0} onClick={() => goodsClick('1')}>
								<CardActionArea>
									<CardMedia
										component="img"
										image={IMAGE_INFO[1]}
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
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={label}>
													상품명
												</Typography>
												<Typography component="span" sx={label}>
													브랜드
												</Typography>
											</Breadcrumbs>
										</TableCell>
										<TableCell sx={infoCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={info}>
													코드그라피
												</Typography>
												<Typography component="span" sx={info}>
													내피분리형
												</Typography>
											</Breadcrumbs>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={labelCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={label}>
													등록연도
												</Typography>
												<Typography component="span" sx={label}>
													성별
												</Typography>
											</Breadcrumbs>
										</TableCell>
										<TableCell sx={infoCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
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
						<TableCell>
							<NumberInput defaultValue={1} min={1} max={99} />
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
								<Button
									sx={{
										mt: 0.5,
										py: 1,
										width: '100%',
										fontSize: '14px',
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
						<TableCell sx={selectBox}>
							<Checkbox defaultChecked />
						</TableCell>
					</TableRow>
					<TableRow sx={rowItem}>
						<TableCell sx={cardBox} component="th" scope="row">
							<Card elevation={0} onClick={() => goodsClick('2')}>
								<CardActionArea>
									<CardMedia
										component="img"
										image={IMAGE_INFO[2]}
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
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={label}>
													상품명
												</Typography>
												<Typography component="span" sx={label}>
													브랜드
												</Typography>
											</Breadcrumbs>
										</TableCell>
										<TableCell sx={infoCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={info}>
													집시
												</Typography>
												<Typography component="span" sx={info}>
													마스터 구스다운 숏패딩
												</Typography>
											</Breadcrumbs>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={labelCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={label}>
													등록연도
												</Typography>
												<Typography component="span" sx={label}>
													성별
												</Typography>
											</Breadcrumbs>
										</TableCell>
										<TableCell sx={infoCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
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
						<TableCell>
							<NumberInput defaultValue={1} min={1} max={99} />
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
								<Button
									sx={{
										mt: 0.5,
										py: 1,
										width: '100%',
										fontSize: '14px',
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
						<TableCell sx={selectBox}>
							<Checkbox defaultChecked />
						</TableCell>
					</TableRow>
					<TableRow sx={rowItem}>
						<TableCell sx={cardBox} component="th" scope="row">
							<Card elevation={0} onClick={() => goodsClick('3')}>
								<CardActionArea>
									<CardMedia
										component="img"
										image={IMAGE_INFO[3]}
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
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={label}>
													상품명
												</Typography>
												<Typography component="span" sx={label}>
													브랜드
												</Typography>
											</Breadcrumbs>
										</TableCell>
										<TableCell sx={infoCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={info}>
													키뮤어
												</Typography>
												<Typography component="span" sx={info}>
													서플러스 울 (WOOL)
												</Typography>
											</Breadcrumbs>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={labelCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
												<Typography component="span" sx={label}>
													등록연도
												</Typography>
												<Typography component="span" sx={label}>
													성별
												</Typography>
											</Breadcrumbs>
										</TableCell>
										<TableCell sx={infoCell}>
											<Breadcrumbs sx={infoBreadcrumbs} aria-label="breadcrumb">
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
						<TableCell>
							<NumberInput defaultValue={1} min={1} max={99} />
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
								<Button
									sx={{
										mt: 0.5,
										py: 1,
										width: '100%',
										fontSize: '14px',
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
						<TableCell sx={selectBox}>
							<Checkbox defaultChecked />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const CartTotal: FC = (): JSX.Element => {
	const totalBox: SxProps<Theme> = {
		px: 8,
		py: 2,
		bgcolor: '#f9f9f9',
		border: '1px solid #dfe3e8',
		borderRadius: '8px',
	};
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
													12,150원
												</Typography>
												<Typography component="span" sx={calcinfoSub}>
													(1,350원 할인)
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
													0원
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
										<TableRow>
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
										<TableRow>
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
										<TableRow>
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
										<TableRow>
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
			</TableContainer>
		</Box>
	);
};

const CartListPC: FC = (): JSX.Element => {
	return (
		<Box sx={{ mb: 10 }}>
			<CartSubHeader title={'장바구니'} />
			<Box sx={{ mx: 3, my: 2 }}>
				<CartList />
			</Box>
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ mx: 2, width: '75%' }}>
					<CartTotal />
				</Box>
				<Box sx={{ pr: 2, width: '20%' }}>
					<Button
						sx={{
							width: '100%',
							height: '100%',
							fontSize: '18px',
							fontWeight: 'bold',
							bgcolor: '#000',
							border: '1px solid #000',
							borderRadius: 2,
							color: '#fff',
							'&:hover': {
								bgcolor: '#0f0f0f',
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

export default CartListPC;
