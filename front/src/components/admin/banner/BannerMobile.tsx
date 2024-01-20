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
import BannerForm from '../../../components/form/admin/BannerForm';
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

	const thHeader: SxProps<Theme> = {
		px: { xs: 1, sm: 2 },
		py: 1,
		width: '12%',
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
		bgcolor: '#EEEEEE',
		border: '2px solid #d2d2d2',
		fontWeight: 'bold',
	};
	const tdHeader: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
		border: '2px solid #d2d2d2',
	};
	const menuStyle: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
	};
	return (
		<Box id="banner" sx={{ py: 2, pl: 4, pr: 4 }}>
			{open ? (
				<>
					<TableContainer>
						<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
							<TableBody>
								<TableRow>
									<TableCell sx={thHeader} align="center" component="th">
										키워드 검색
									</TableCell>
									<TableCell sx={tdHeader} align="left">
										<FormControl>
											<InputLabel id="title-select-label">제목</InputLabel>
											<Select
												labelId="title-select-label"
												value={keyword}
												label="제목"
												onChange={handleKeywordChange}
											>
												<MenuItem sx={menuStyle} value={'A'}>
													전체
												</MenuItem>
												<MenuItem sx={menuStyle} value={'S'}>
													제목
												</MenuItem>
												<MenuItem sx={menuStyle} value={'R'}>
													등록자
												</MenuItem>
											</Select>
										</FormControl>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={thHeader} align="center" component="th">
										전시기간
									</TableCell>
									<TableCell sx={{ ...tdHeader, width: '35%' }} align="left">
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
									<TableCell sx={thHeader} align="center" component="th">
										전시여부
									</TableCell>
									<TableCell sx={tdHeader} align="left">
										<FormControl>
											<InputLabel id="useyn-select-label">전시여부</InputLabel>
											<Select
												labelId="useyn-select-label"
												value={useyn}
												label="전시여부"
												onChange={handleUseynChange}
											>
												<MenuItem sx={menuStyle} value={''}>
													전체
												</MenuItem>
												<MenuItem sx={menuStyle} value={'Y'}>
													예
												</MenuItem>
												<MenuItem sx={menuStyle} value={'N'}>
													아니오
												</MenuItem>
											</Select>
										</FormControl>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<Box sx={{ py: 4, display: 'flex', justifyContent: 'space-between' }}>
						<Button
							type="submit"
							sx={{
								px: 6,
								py: 1,
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
							onClick={registerClick}
						>
							등록
						</Button>
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
						<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
							<TableHead>
								<TableRow>
									<TableCell sx={thHeader} align="center" component="th">
										제목
									</TableCell>
									<TableCell sx={thHeader} align="center" component="th">
										유형
									</TableCell>
									<TableCell sx={thHeader} align="center" component="th">
										전시기간
									</TableCell>
									<TableCell sx={thHeader} align="center" component="th">
										진행상태
									</TableCell>
									<TableCell sx={thHeader} align="center" component="th">
										전시여부
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{bannerPageData.content &&
									bannerPageData.content.map(
										(data: BannerData, index: number) => (
											<TableRow key={index}>
												<TableCell sx={tdHeader} align="center">
													{data.bannerManageNo}
												</TableCell>
												<TableCell sx={tdHeader} align="center">
													배경이미지
												</TableCell>
												<TableCell sx={tdHeader} align="center">
													{moment(data.displayStartDate).format('YYYY-MM-DD')} ~{' '}
													{moment(data.displayEndDate).format('YYYY-MM-DD')}
												</TableCell>
												<TableCell sx={tdHeader} align="center">
													마감
												</TableCell>
												<TableCell sx={tdHeader} align="center">
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
				<BannerForm onSubmit={onSubmit} setOpen={setOpen} />
			)}
		</Box>
	);
};

export default BannerMobile;
