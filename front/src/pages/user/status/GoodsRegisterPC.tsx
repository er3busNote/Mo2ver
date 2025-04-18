import React, { FC, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '@components/input/SearchInput';
import ButtonGoods from '@components/button/ButtonGoods';
import {
	Box,
	Grid,
	Stack,
	IconButton,
	Typography,
	MenuItem,
	InputLabel,
	FormControl,
	Pagination,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

const fontSize_sm = '13px';
const fontSize_lg = '13px';

const UserRegisterDetail: FC = (): JSX.Element => {
	const [page, setPage] = useState(0);
	const [progress, setProgress] = useState('');
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
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

	const periodTh: SxProps<Theme> = {
		px: 2,
		py: 1.5,
		width: 100,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const periodTd: SxProps<Theme> = {
		width: '50%',
		borderBlock: 'none',
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
	};
	const progressTh: SxProps<Theme> = {
		px: 2,
		py: 1.5,
		width: 100,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const progressTd: SxProps<Theme> = {
		borderBlock: 'none',
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
	};
	const dataTh: SxProps<Theme> = {
		px: 2,
		py: 1.5,
		width: 180,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		borderBlock: 'none',
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
	};
	const datePicker: SxProps<Theme> = {
		'.MuiInputBase-input': {
			py: 2,
			width: '80px',
			fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		},
	};
	const selectForm: SxProps<Theme> = {
		width: 120,
		'.MuiInputLabel-shrink': {
			ml: 1,
			mt: 0.5,
		},
	};
	const selectLabel: SxProps<Theme> = {
		mt: -1,
		ml: 1,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
	};
	const selectInput: SxProps<Theme> = {
		'.MuiSelect-select': {
			py: 1.5,
			fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		},
	};
	const menuText: SxProps<Theme> = {
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
	};
	return (
		<Box>
			<TableContainer>
				<Table size="small">
					<TableBody>
						<TableRow>
							<TableCell sx={periodTh} align="center" component="th">
								등록기간
							</TableCell>
							<TableCell sx={periodTd} align="left">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DesktopDatePicker
										label="시작날짜"
										value={startDate}
										onChange={(value) => handleStartChange(value)}
										sx={datePicker}
									/>
									<HorizontalRuleIcon />
									<DesktopDatePicker
										label="만료날짜"
										value={dayjs(endDate)}
										onChange={(value) => handleEndChange(value)}
										sx={datePicker}
									/>
								</LocalizationProvider>
							</TableCell>
							<TableCell sx={progressTh} align="center" component="th">
								진행상태
							</TableCell>
							<TableCell sx={progressTd} align="left">
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
			<Box sx={{ py: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
				<ButtonGoods buttonType="search" device="pc" variant="outlined">
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
								대분류
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								중분류
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								소분류
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								진행상태
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								등록일
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell sx={dataTd} align="center">
								아우터 리밋 크롭 푸퍼 자켓
							</TableCell>
							<TableCell sx={dataTd} align="center">
								엘레강스
							</TableCell>
							<TableCell sx={dataTd} align="center">
								상의/아우터/원피스
							</TableCell>
							<TableCell sx={dataTd} align="center">
								상의
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
						<TableRow>
							<TableCell sx={dataTd} align="center">
								박시 프린트 티셔츠
							</TableCell>
							<TableCell sx={dataTd} align="center">
								엘레강스
							</TableCell>
							<TableCell sx={dataTd} align="center">
								상의/아우터/원피스
							</TableCell>
							<TableCell sx={dataTd} align="center">
								상의
							</TableCell>
							<TableCell sx={dataTd} align="center">
								티셔츠
							</TableCell>
							<TableCell sx={dataTd} align="center">
								판매중
							</TableCell>
							<TableCell sx={dataTd} align="center">
								2012-12-01
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

const GoodsRegisterPC: FC = (): JSX.Element => {
	const [keyword, setKeyword] = useState('');

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		setKeyword(text);
	};
	const searchClick = () => {
		setKeyword('');
	};

	const title: SxProps<Theme> = {
		fontSize: { sm: '15px', lg: '16px' },
		fontWeight: 'bold',
	};
	const registerPreview: SxProps<Theme> = {
		pt: 3,
		pb: 1,
		fontSize: { sm: '14px', lg: '15px' },
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
		fontSize: { sm: '24px', lg: '28px' },
		fontWeight: 'bold',
	};
	const registerDetail: SxProps<Theme> = {
		py: 1,
		bgcolor: '#F8F8F8',
	};
	const registerButton: SxProps<Theme> = {
		pt: '2px',
		px: 1,
		fontSize: { sm: '14px', lg: '15px' },
		fontWeight: 'bold',
	};
	const registerBox: SxProps<Theme> = {
		mr: 2,
		my: 2,
		border: '2px solid #ddd',
		borderRadius: '7px',
	};
	const searchBox: SxProps<Theme> = {
		pt: 2,
	};
	const registerViewBox: SxProps<Theme> = {
		pt: 2,
	};
	return (
		<Box>
			<Box sx={{ display: 'flex' }}>
				<Typography component="h2" sx={title}>
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
									8
								</Typography>
								<Typography component="span">건</Typography>
							</Stack>
						</Box>
						<Box sx={registerDetail}>
							<IconButton component={Link} to="/cart" sx={{ p: 0 }}>
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
									4
								</Typography>
								<Typography component="span">건</Typography>
							</Stack>
						</Box>
						<Box sx={registerDetail}>
							<IconButton component={Link} to="/cart" sx={{ p: 0 }}>
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
									4
								</Typography>
								<Typography component="span">건</Typography>
							</Stack>
						</Box>
						<Box sx={registerDetail}>
							<IconButton component={Link} to="/cart" sx={{ p: 0 }}>
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
									2
								</Typography>
								<Typography component="span">건</Typography>
							</Stack>
						</Box>
						<Box sx={registerDetail}>
							<IconButton component={Link} to="/cart" sx={{ p: 0 }}>
								<RequestPageOutlinedIcon fontSize="small" />
								<Typography component="span" sx={registerButton}>
									판매중
								</Typography>
							</IconButton>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box sx={{ pt: 2, display: 'flex' }}>
				<Typography component="h2" sx={title}>
					상품 목록
				</Typography>
			</Box>
			<Box sx={searchBox}>
				<SearchInput
					placeholder="등록한 상품을 검색할 수 있어요!"
					onChange={searchOnChange}
				/>
			</Box>
			<Box sx={registerViewBox}>
				<UserRegisterDetail />
			</Box>
		</Box>
	);
};

export default GoodsRegisterPC;
