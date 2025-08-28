import React, { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoodsData, SearchGoodsResuqestData } from '@/types/api';
import SearchInput from '@components/input/SearchInput';
import ButtonGoods from '@components/button/ButtonGoods';
import PageNavigator from '@components/pagination/PageNavigator';
import {
	Box,
	Link,
	Grid,
	Stack,
	Divider,
	IconButton,
	Typography,
	MenuItem,
	InputLabel,
	FormControl,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';
import {
	ArrowForwardIos as ArrowForwardIosIcon,
	CheckroomOutlined as CheckroomOutlinedIcon,
	CurrencyExchangeOutlined as CurrencyExchangeOutlinedIcon,
	PriceCheckOutlined as PriceCheckOutlinedIcon,
	RequestPageOutlined as RequestPageOutlinedIcon,
	BallotOutlined as BallotOutlinedIcon,
	ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import goToGoodsForm from '@navigate/goods/goToGoodsForm';
import { GoodsRegisterProps } from '@/types/user';
import dayjs, { Dayjs } from 'dayjs';

const UserRegisterDetail: FC<
	Omit<GoodsRegisterProps, 'type' | 'setSearchGoodsData'>
> = ({ title, description, goodsData, setGoodsPage }): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [progress, setProgress] = useState('');
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

	const goodsRegisterClick = (code: string) => {
		goToGoodsForm({
			title,
			description,
			dispatch,
			navigate,
			goodsCode: code,
		});
	};

	const handleProgressChange = (event: SelectChangeEvent) => {
		setProgress(event.target.value as string);
	};

	const handleStartChange = (newValue: Dayjs | null) => {
		setStartDate(newValue);
	};
	const handleEndChange = (newValue: Dayjs | null) => {
		setEndDate(newValue);
	};

	const conditionTh: SxProps<Theme> = {
		py: 1.5,
		width: 80,
		fontSize: { xs: '11px', sm: '13px' },
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const conditionTd: SxProps<Theme> = {
		pl: 2,
		pr: 0,
		borderBlock: 'none',
		fontSize: { xs: '12px', sm: '13px' },
	};
	const dataTh: SxProps<Theme> = {
		px: 2,
		py: 1.5,
		width: 80,
		fontSize: { xs: '11px', sm: '13px' },
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 0,
		borderBlock: 'none',
		fontSize: { xs: '11px', sm: '13px' },
	};
	const datePicker: SxProps<Theme> = {
		height: '37px',
		'.MuiInputBase-input': {
			pl: 1.5,
			py: 2,
			width: '60px',
			fontSize: { xs: '12px', sm: '13px' },
		},
		'.MuiFormLabel-root': {
			ml: 1,
			mt: 0.5,
			fontSize: { xs: '12px', sm: '13px' },
		},
		'.MuiInputAdornment-root': {
			overflowX: 'visible',
		},
		'.MuiIconButton-root': {
			pr: 0.5,
			pl: 0,
		},
		overflowX: 'visible',
	};
	const dateHorizonIcon: SxProps<Theme> = {
		px: 0.5,
	};
	const selectForm: SxProps<Theme> = {
		width: 120,
		'.MuiInputLabel-shrink': {
			ml: 1,
			mt: 0.5,
		},
		overflowX: 'visible',
	};
	const selectLabel: SxProps<Theme> = {
		mt: -1,
		ml: 1,
		fontSize: { xs: '11px', sm: '12px' },
	};
	const selectInput: SxProps<Theme> = {
		'.MuiSelect-select': {
			py: 1,
			fontSize: { xs: '11px', sm: '12px' },
		},
	};
	const menuText: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '13px' },
	};
	return (
		<Box>
			<TableContainer>
				<Table size="small">
					<TableBody>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								등록기간
							</TableCell>
							<TableCell sx={conditionTd} align="left">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DesktopDatePicker
										label="시작날짜"
										value={startDate}
										onChange={(value) => handleStartChange(value)}
										sx={datePicker}
									/>
									<Typography component="span" sx={dateHorizonIcon}>
										-
									</Typography>
									<DesktopDatePicker
										label="만료날짜"
										value={dayjs(endDate)}
										onChange={(value) => handleEndChange(value)}
										sx={datePicker}
									/>
								</LocalizationProvider>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								진행상태
							</TableCell>
							<TableCell sx={conditionTd} align="left">
								<FormControl sx={selectForm}>
									<InputLabel sx={selectLabel}>진행상태</InputLabel>
									<Select
										value={progress}
										label="진행상태"
										onChange={handleProgressChange}
										sx={selectInput}
									>
										<MenuItem sx={menuText} value={'10'}>
											등록
										</MenuItem>
										<MenuItem sx={menuText} value={'20'}>
											승인요청
										</MenuItem>
										<MenuItem sx={menuText} value={'30'}>
											승인완료
										</MenuItem>
										<MenuItem sx={menuText} value={'40'}>
											판매중
										</MenuItem>
										<MenuItem sx={menuText} value={'50'}>
											일시품절
										</MenuItem>
										<MenuItem sx={menuText} value={'60'}>
											품절
										</MenuItem>
									</Select>
								</FormControl>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ py: 2 }}>
				<ButtonGoods buttonType="search" device="mobile" variant="outlined">
					검색
				</ButtonGoods>
			</Box>
			<TableContainer>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								제품명
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								브랜드
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								소분류
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								상태
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								등록일
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{goodsData &&
							goodsData.content &&
							goodsData.content.map((data: GoodsData, index: number) => (
								<TableRow key={index}>
									<TableCell sx={dataTd} align="center">
										<Link
											component="button"
											variant="body2"
											underline="none"
											onClick={() => goodsRegisterClick(data.goodsCode)}
										>
											{data.goodsName}
										</Link>
									</TableCell>
									<TableCell sx={dataTd} align="center">
										{data.goodsBrand}
									</TableCell>
									<TableCell sx={dataTd} align="center">
										티셔츠
									</TableCell>
									<TableCell sx={dataTd} align="center">
										승인요청
									</TableCell>
									<TableCell sx={dataTd} align="center">
										2012-12-01
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
				{goodsData.totalPages && (
					<PageNavigator count={goodsData.totalPages} setPage={setGoodsPage} />
				)}
			</Box>
		</Box>
	);
};

const GoodsRegisterMobile: FC<GoodsRegisterProps> = ({
	title,
	description,
	type,
	goodsData,
	setGoodsPage,
	setSearchGoodsData,
	setSwitch,
}): JSX.Element => {
	const [keyword, setKeyword] = useState('');

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		setKeyword(text);
	};
	const searchOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			const searchData: SearchGoodsResuqestData = {
				keyword: keyword,
			};
			setGoodsPage(0);
			setSearchGoodsData(searchData);
		}
	};

	const registerTitle: SxProps<Theme> = {
		fontSize: { xs: '14px', sm: '15px' },
		fontWeight: 'bold',
	};
	const registerPreview: SxProps<Theme> = {
		pt: 3,
		pb: 1,
		fontSize: { xs: '10px', sm: '14px' },
		color: '#adadad',
		fontWeight: 'bold',
	};
	const registerCount: SxProps<Theme> = {
		pb: 3,
		display: 'flex',
		justifyContent: 'center',
	};
	const registerText: SxProps<Theme> = {
		alignItems: 'center',
	};
	const registerInfo: SxProps<Theme> = {
		fontSize: { xs: '18px', sm: '24px' },
		fontWeight: 'bold',
	};
	const registerDetail: SxProps<Theme> = {
		py: 1,
		bgcolor: '#F8F8F8',
	};
	const registerButton: SxProps<Theme> = {
		pt: '2px',
		px: 1,
		fontSize: { xs: '10px', sm: '14px' },
		fontWeight: 'bold',
	};
	const registerBox: SxProps<Theme> = {
		mx: 1,
		my: 2,
		border: '1px solid #ddd',
		borderRadius: '7px',
	};
	const searchBox: SxProps<Theme> = {
		pt: 0,
	};
	const registerViewBox: SxProps<Theme> = {
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
		case 'RS':
			return (
				<Box>
					<Box sx={{ display: 'flex' }}>
						<Typography component="h2" sx={registerTitle}>
							나의 상품등록 현황
						</Typography>
					</Box>
					<Box sx={registerBox}>
						<Grid container rowSpacing={1}>
							<Grid item xs={3}>
								<Box sx={registerPreview}>상품등록</Box>
								<Box sx={registerCount}>
									<Stack direction="row" spacing={1} sx={registerText}>
										<Typography component="span" sx={registerInfo}>
											32
										</Typography>
										<Typography component="span">건</Typography>
									</Stack>
								</Box>
								<Box sx={registerDetail}>
									<IconButton sx={{ p: 0 }}>
										<CheckroomOutlinedIcon fontSize="small" />
										<Typography component="span" sx={registerButton}>
											상품등록
										</Typography>
									</IconButton>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box sx={registerPreview}>승인요청</Box>
								<Box sx={registerCount}>
									<Stack direction="row" spacing={1} sx={registerText}>
										<Typography component="span" sx={registerInfo}>
											24
										</Typography>
										<Typography component="span">건</Typography>
									</Stack>
								</Box>
								<Box sx={registerDetail}>
									<IconButton sx={{ p: 0 }}>
										<CurrencyExchangeOutlinedIcon fontSize="small" />
										<Typography component="span" sx={registerButton}>
											승인요청
										</Typography>
									</IconButton>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box sx={registerPreview}>승인완료</Box>
								<Box sx={registerCount}>
									<Stack direction="row" spacing={1} sx={registerText}>
										<Typography component="span" sx={registerInfo}>
											28
										</Typography>
										<Typography component="span">건</Typography>
									</Stack>
								</Box>
								<Box sx={registerDetail}>
									<IconButton sx={{ p: 0 }}>
										<PriceCheckOutlinedIcon fontSize="small" />
										<Typography component="span" sx={registerButton}>
											승인완료
										</Typography>
									</IconButton>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box sx={registerPreview}>판매중</Box>
								<Box sx={registerCount}>
									<Stack direction="row" spacing={1} sx={registerText}>
										<Typography component="span" sx={registerInfo}>
											10
										</Typography>
										<Typography component="span">건</Typography>
									</Stack>
								</Box>
								<Box sx={registerDetail}>
									<IconButton sx={{ p: 0 }}>
										<RequestPageOutlinedIcon fontSize="small" />
										<Typography component="span" sx={registerButton}>
											판매중
										</Typography>
									</IconButton>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Box>
			);
		case 'RA':
			return (
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="order-content"
						id="order-header"
						sx={itemSummary}
					>
						<BallotOutlinedIcon />
						<Typography sx={itemText}>상품목록</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={searchBox}>
							<SearchInput
								placeholder="등록한 상품을 검색할 수 있어요!"
								onChange={searchOnChange}
								onKeyPress={searchOnKeyPress}
							/>
						</Box>
						<Box sx={registerViewBox}>
							<UserRegisterDetail
								title={title}
								description={description}
								goodsData={goodsData}
								setGoodsPage={setGoodsPage}
							/>
						</Box>
					</AccordionDetails>
				</Accordion>
			);
		case 'RL':
			return (
				<Box>
					<ListItem disablePadding>
						<ListItemButton onClick={setSwitch}>
							<ListItemIcon sx={itemIcon}>
								<CheckroomOutlinedIcon />
							</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{
									style: { fontSize: 14, fontWeight: 'bold' },
								}}
								primary="상품등록내역"
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

export default GoodsRegisterMobile;
