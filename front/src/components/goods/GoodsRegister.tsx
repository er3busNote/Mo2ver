import React, { FC, useState, MouseEvent, ChangeEvent } from 'react';
import AppSubHeader from '../common/AppSubHeader';
import RegisterForm from '../form/RegisterForm';
import {
	Box,
	Button,
	MenuItem,
	InputLabel,
	FormControl,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableFooter,
	TablePagination,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

const drawerMenuLimit = 768;

const GoodsRegisterPC: FC = (): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	const [progress, setProgress] = useState('');
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

	const handleProgressChange = (event: SelectChangeEvent) => {
		setProgress(event.target.value as string);
	};

	const handleStartChange = (newValue: Dayjs | null) => {
		setStartDate(newValue);
	};
	const handleEndChange = (newValue: Dayjs | null) => {
		setEndDate(newValue);
	};

	const thHeader: SxProps<Theme> = {
		px: 5,
		py: 1.5,
		width: 180,
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const tdHeader: SxProps<Theme> = {
		borderBlock: 'none',
	};
	const menuStyle: SxProps<Theme> = {
		fontSize: 14,
	};

	return (
		<>
			{isPc && (
				<TableBody>
					<TableRow>
						<TableCell sx={thHeader} align="left" component="th">
							등록기간
						</TableCell>
						<TableCell sx={tdHeader} align="left">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DesktopDatePicker
									label="시작날짜"
									value={startDate}
									onChange={(value) => handleStartChange(value)}
								/>
								<HorizontalRuleIcon />
								<DesktopDatePicker
									label="만료날짜"
									value={dayjs(endDate)}
									onChange={(value) => handleEndChange(value)}
								/>
							</LocalizationProvider>
						</TableCell>
						<TableCell sx={thHeader} align="left" component="th">
							진행상태
						</TableCell>
						<TableCell sx={tdHeader} align="left">
							<FormControl>
								<InputLabel id="useyn-select-label">진행상태</InputLabel>
								<Select
									labelId="useyn-select-label"
									value={progress}
									label="진행상태"
									onChange={handleProgressChange}
								>
									<MenuItem sx={menuStyle} value={'10'}>
										등록
									</MenuItem>
									<MenuItem sx={menuStyle} value={'20'}>
										승인요청
									</MenuItem>
									<MenuItem sx={menuStyle} value={'30'}>
										승인완료
									</MenuItem>
									<MenuItem sx={menuStyle} value={'40'}>
										판매중
									</MenuItem>
									<MenuItem sx={menuStyle} value={'50'}>
										일시품절
									</MenuItem>
									<MenuItem sx={menuStyle} value={'60'}>
										품절
									</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
				</TableBody>
			)}
		</>
	);
};

const GoodsRegisterMobile: FC = (): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	const [progress, setProgress] = useState('');
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

	const handleProgressChange = (event: SelectChangeEvent) => {
		setProgress(event.target.value as string);
	};

	const handleStartChange = (newValue: Dayjs | null) => {
		setStartDate(newValue);
	};
	const handleEndChange = (newValue: Dayjs | null) => {
		setEndDate(newValue);
	};

	const thHeader: SxProps<Theme> = {
		px: 5,
		py: 1.5,
		width: 180,
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const tdHeader: SxProps<Theme> = {
		borderBlock: 'none',
	};
	const menuStyle: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
	};

	return (
		<>
			{isMobile && (
				<TableBody>
					<TableRow>
						<TableCell sx={thHeader} align="left" component="th">
							등록기간
						</TableCell>
						<TableCell colSpan={3} sx={tdHeader} align="left">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DesktopDatePicker
									label="시작날짜"
									value={startDate}
									onChange={(value) => handleStartChange(value)}
								/>
								<HorizontalRuleIcon />
								<DesktopDatePicker
									label="만료날짜"
									value={dayjs(endDate)}
									onChange={(value) => handleEndChange(value)}
								/>
							</LocalizationProvider>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={thHeader} align="left" component="th">
							진행상태
						</TableCell>
						<TableCell colSpan={3} sx={tdHeader} align="left">
							<FormControl>
								<InputLabel id="useyn-select-label">진행상태</InputLabel>
								<Select
									labelId="useyn-select-label"
									value={progress}
									label="진행상태"
									onChange={handleProgressChange}
								>
									<MenuItem sx={menuStyle} value={'10'}>
										등록
									</MenuItem>
									<MenuItem sx={menuStyle} value={'20'}>
										승인요청
									</MenuItem>
									<MenuItem sx={menuStyle} value={'30'}>
										승인완료
									</MenuItem>
									<MenuItem sx={menuStyle} value={'40'}>
										판매중
									</MenuItem>
									<MenuItem sx={menuStyle} value={'50'}>
										일시품절
									</MenuItem>
									<MenuItem sx={menuStyle} value={'60'}>
										품절
									</MenuItem>
								</Select>
							</FormControl>
						</TableCell>
					</TableRow>
				</TableBody>
			)}
		</>
	);
};

const GoodsRegister: FC = (): JSX.Element => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(0);

	const handleChangePage = (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const thHeaderPC: SxProps<Theme> = {
		px: 1.5,
		py: 1.5,
		width: 180,
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
		bgcolor: '#f9f9f9',
		borderBottom: '1px #F0F0F0 solid',
		fontWeight: 'bold',
	};
	const thHeaderMobile: SxProps<Theme> = {
		px: 1.5,
		py: 1.5,
		width: 180,
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
		bgcolor: '#f9f9f9',
		borderBottom: '1px #F0F0F0 solid',
		fontWeight: 'bold',
		display: { xs: 'none', sm: 'none', md: 'table-cell', lg: 'table-cell' },
	};
	const tdHeaderPC: SxProps<Theme> = {
		borderBlock: 'none',
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
	};
	const tdHeaderMobile: SxProps<Theme> = {
		borderBlock: 'none',
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
		display: { xs: 'none', sm: 'none', md: 'table-cell', lg: 'table-cell' },
	};
	const pagination: SxProps<Theme> = {
		borderBlock: 'none',
	};

	return (
		<Box id="register" sx={{ mb: 10 }}>
			<AppSubHeader />
			<RegisterForm />
			<Box sx={{ mx: 3 }}>
				<TableContainer>
					<Table size="small">
						<GoodsRegisterPC />
						<GoodsRegisterMobile />
					</Table>
				</TableContainer>
				<Box sx={{ py: 4, display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						sx={{
							px: 6,
							py: 1,
							fontSize: '14px',
							fontWeight: 'bold',
							bgcolor: '#363658',
							border: '1px solid #757595',
							borderRadius: 0,
							color: '#fff',
							'&:hover': {
								bgcolor: '#757595',
							},
						}}
						variant="outlined"
					>
						검색
					</Button>
				</Box>
				<TableContainer>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell sx={thHeaderPC} align="center" component="th">
									제품명
								</TableCell>
								<TableCell sx={thHeaderPC} align="center" component="th">
									브랜드
								</TableCell>
								<TableCell sx={thHeaderMobile} align="center" component="th">
									대분류
								</TableCell>
								<TableCell sx={thHeaderMobile} align="center" component="th">
									중분류
								</TableCell>
								<TableCell sx={thHeaderPC} align="center" component="th">
									소분류
								</TableCell>
								<TableCell sx={thHeaderPC} align="center" component="th">
									진행상태
								</TableCell>
								<TableCell sx={thHeaderPC} align="center" component="th">
									등록일
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell sx={tdHeaderPC} align="center">
									아우터 리밋 크롭 푸퍼 자켓
								</TableCell>
								<TableCell sx={tdHeaderPC} align="center">
									엘레강스
								</TableCell>
								<TableCell sx={tdHeaderMobile} align="center">
									상의/아우터/원피스
								</TableCell>
								<TableCell sx={tdHeaderMobile} align="center">
									상의
								</TableCell>
								<TableCell sx={tdHeaderPC} align="center">
									티셔츠
								</TableCell>
								<TableCell sx={tdHeaderPC} align="center">
									승인요청
								</TableCell>
								<TableCell sx={tdHeaderPC} align="center">
									2012-12-01
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell sx={tdHeaderPC} align="center">
									박시 프린트 티셔츠
								</TableCell>
								<TableCell sx={tdHeaderPC} align="center">
									엘레강스
								</TableCell>
								<TableCell sx={tdHeaderMobile} align="center">
									상의/아우터/원피스
								</TableCell>
								<TableCell sx={tdHeaderMobile} align="center">
									상의
								</TableCell>
								<TableCell sx={tdHeaderPC} align="center">
									티셔츠
								</TableCell>
								<TableCell sx={tdHeaderPC} align="center">
									판매중
								</TableCell>
								<TableCell sx={tdHeaderPC} align="center">
									2012-12-01
								</TableCell>
							</TableRow>
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[10, 25, 50, 100]}
									count={10}
									rowsPerPage={rowsPerPage}
									page={page}
									sx={pagination}
									SelectProps={{
										inputProps: {
											'aria-label': 'rows per page',
										},
										native: false,
									}}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
};

export default GoodsRegister;
