import React, {
	FC,
	useState,
	MouseEvent,
	ChangeEvent,
	BaseSyntheticEvent,
} from 'react';
import {
	Box,
	Button,
	MenuItem,
	InputLabel,
	FormControl,
	Typography,
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
import BannerFormMobile from '../../form/admin/BannerFormMobile';
import { BannerData, BannerPageData } from '../../../services/types';
import { BannerFormValues } from '../../../components/form/admin/types';
// import _ from 'lodash';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';

interface BannerProps {
	onSubmit: (
		data: BannerFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
	bannerPageData: BannerPageData;
}

const BannerMobile: FC<BannerProps> = ({
	onSubmit,
	bannerPageData,
}): JSX.Element => {
	const [open, setOpen] = useState(true);
	const [page, setPage] = useState(bannerPageData.number);
	const [rowsPerPage, setRowsPerPage] = useState(
		bannerPageData.numberOfElements
	);
	const [keyword, setKeyword] = useState('');
	const [useyn, setUseyn] = useState('');
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

	const registerClick = () => {
		setOpen(false);
	};

	const handleKeywordChange = (event: SelectChangeEvent) => {
		setKeyword(event.target.value as string);
	};
	const handleUseynChange = (event: SelectChangeEvent) => {
		setUseyn(event.target.value as string);
	};

	const handleStartChange = (newValue: Dayjs | null) => {
		setStartDate(newValue);
	};
	const handleEndChange = (newValue: Dayjs | null) => {
		setEndDate(newValue);
	};

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

	const conditionTh: SxProps<Theme> = {
		px: 1,
		py: 1.5,
		width: '20%',
		fontSize: { xs: '11px', sm: '13px' },
		bgcolor: '#EEEEEE',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const conditionTd: SxProps<Theme> = {
		pl: 1,
		pr: 0,
		borderBlock: 'none',
		fontSize: { xs: '12px', sm: '13px' },
	};
	const dataTh: SxProps<Theme> = {
		px: { xs: 1, sm: 2 },
		py: 1,
		fontSize: { xs: '11px', sm: '13px' },
		bgcolor: '#EEEEEE',
		border: '2px solid #d2d2d2',
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 2,
		fontSize: { xs: '11px', sm: '13px' },
		border: '2px solid #d2d2d2',
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
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			{open ? (
				<>
					<TableContainer>
						<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
							<TableBody>
								<TableRow>
									<TableCell sx={conditionTh} align="center" component="th">
										키워드
									</TableCell>
									<TableCell sx={conditionTd} align="left">
										<FormControl sx={selectForm}>
											<InputLabel sx={selectLabel}>제목</InputLabel>
											<Select
												value={keyword}
												label="제목"
												onChange={handleKeywordChange}
												sx={selectInput}
											>
												<MenuItem sx={menuText} value={'A'}>
													전체
												</MenuItem>
												<MenuItem sx={menuText} value={'S'}>
													제목
												</MenuItem>
												<MenuItem sx={menuText} value={'R'}>
													등록자
												</MenuItem>
											</Select>
										</FormControl>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={conditionTh} align="center" component="th">
										전시기간
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
										전시여부
									</TableCell>
									<TableCell sx={conditionTd} align="left">
										<FormControl sx={selectForm}>
											<InputLabel sx={selectLabel}>전시여부</InputLabel>
											<Select
												value={useyn}
												label="전시여부"
												onChange={handleUseynChange}
												sx={selectInput}
											>
												<MenuItem sx={menuText} value={''}>
													전체
												</MenuItem>
												<MenuItem sx={menuText} value={'Y'}>
													예
												</MenuItem>
												<MenuItem sx={menuText} value={'N'}>
													아니오
												</MenuItem>
											</Select>
										</FormControl>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<Box sx={{ py: 2, display: 'flex', justifyContent: 'space-between' }}>
						<Button
							type="submit"
							sx={{
								px: 6,
								py: 1,
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
							onClick={registerClick}
						>
							등록
						</Button>
						<Button
							sx={{
								px: 6,
								py: 1,
								fontSize: { xs: '10px', sm: '12px' },
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
						<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
							<TableHead>
								<TableRow>
									<TableCell sx={dataTh} align="center" component="th">
										제목
									</TableCell>
									<TableCell sx={dataTh} align="center" component="th">
										유형
									</TableCell>
									<TableCell sx={dataTh} align="center" component="th">
										전시기간
									</TableCell>
									<TableCell sx={dataTh} align="center" component="th">
										상태
									</TableCell>
									<TableCell sx={dataTh} align="center" component="th">
										여부
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{bannerPageData.content &&
									bannerPageData.content.map(
										(data: BannerData, index: number) => (
											<TableRow key={index}>
												<TableCell sx={dataTd} align="center">
													{data.bannerManageNo}
												</TableCell>
												<TableCell sx={dataTd} align="center">
													배경이미지
												</TableCell>
												<TableCell sx={dataTd} align="center">
													{moment(data.displayStartDate).format('YYYY-MM-DD')} ~{' '}
													{moment(data.displayEndDate).format('YYYY-MM-DD')}
												</TableCell>
												<TableCell sx={dataTd} align="center">
													마감
												</TableCell>
												<TableCell sx={dataTd} align="center">
													{data.displayYesNo}
												</TableCell>
											</TableRow>
										)
									)}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[10, 25, 50, 100]}
										count={bannerPageData.totalElements}
										rowsPerPage={rowsPerPage}
										page={page}
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
				</>
			) : (
				<BannerFormMobile onSubmit={onSubmit} setOpen={setOpen} />
			)}
		</Box>
	);
};

export default BannerMobile;
