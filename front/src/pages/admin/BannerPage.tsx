import React, {
	FC,
	useState,
	MouseEvent,
	ChangeEvent,
	BaseSyntheticEvent,
} from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import useCSRFToken from '../../hooks/useCSRFToken';
import {
	Box,
	Button,
	TextField,
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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import BannerForm from '../../components/form/admin/BannerForm';
import { BannerFormValues } from '../../components/form/admin/types';
// import _ from 'lodash';
import moment from 'moment';

interface BannerDispatchProps {
	auth: ActionCreatorsMapObject;
}

const BannerPage: FC<BannerDispatchProps> = ({ auth }): JSX.Element => {
	const [open, setOpen] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [keyword, setKeyword] = useState('');
	const [useyn, setUseyn] = useState('');
	const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
	const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	const submitForm = (
		data: BannerFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		fetchCSRFTokenData();
		const bannerData = {
			title: data.title,
			startDate: moment(data.startDate).format('YYYY-MM-DD'),
			endDate: moment(data.endDate).format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
			bnnrImg: data.bnnrImg,
		};
		console.log(bannerData);
		console.log(csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};

	const registerClick = () => {
		setOpen(false);
	};

	const handleKeywordChange = (event: SelectChangeEvent) => {
		setKeyword(event.target.value as string);
	};
	const handleUseynChange = (event: SelectChangeEvent) => {
		setUseyn(event.target.value as string);
	};

	const handleStartChange = (newValue: string) => {
		setStartDate(newValue);
	};
	const handleEndChange = (newValue: string) => {
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
		px: 5,
		py: 1.5,
		width: 180,
		bgcolor: '#EEEEEE',
		border: '2px solid #d2d2d2',
		fontWeight: 'bold',
	};
	const thBody: SxProps<Theme> = {
		border: '2px solid #d2d2d2',
	};
	const menuStyle: SxProps<Theme> = {
		fontSize: 14,
	};
	return (
		<Box id="banner" sx={{ py: 2, pl: 4, pr: 4 }}>
			{open ? (
				<>
					<TableContainer>
						<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
							<TableBody>
								<TableRow>
									<TableCell sx={thHeader} align="left" component="th">
										키워드 검색
									</TableCell>
									<TableCell colSpan={3} sx={thBody} align="left">
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
									<TableCell sx={thHeader} align="left" component="th">
										전시기간
									</TableCell>
									<TableCell sx={{ ...thBody, width: '35%' }} align="left">
										<LocalizationProvider dateAdapter={AdapterMoment}>
											<DesktopDatePicker
												label="시작날짜"
												inputFormat="MM/DD/YYYY"
												value={startDate}
												onChange={(value) =>
													handleStartChange(moment(value).format('YYYY-MM-DD'))
												}
												renderInput={(params) => <TextField {...params} />}
											/>
											<HorizontalRuleIcon />
											<DesktopDatePicker
												label="만료날짜"
												inputFormat="MM/DD/YYYY"
												value={endDate}
												onChange={(value) =>
													handleEndChange(moment(value).format('YYYY-MM-DD'))
												}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
									</TableCell>
									<TableCell sx={thHeader} align="left" component="th">
										전시여부
									</TableCell>
									<TableCell sx={thBody} align="left">
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
									<TableCell sx={thHeader} align="center" component="th">
										배경이미지여부
									</TableCell>
									<TableCell sx={thHeader} align="center" component="th">
										등록자
									</TableCell>
									<TableCell sx={thHeader} align="center" component="th">
										등록일
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell sx={thBody} align="center">
										메인
									</TableCell>
									<TableCell sx={thBody} align="center">
										배경이미지
									</TableCell>
									<TableCell sx={thBody} align="center">
										2019-08-25 ~ 2019-08-26
									</TableCell>
									<TableCell sx={thBody} align="center">
										마감
									</TableCell>
									<TableCell sx={thBody} align="center">
										Y
									</TableCell>
									<TableCell sx={thBody} align="center">
										Y
									</TableCell>
									<TableCell sx={thBody} align="center">
										관리자
									</TableCell>
									<TableCell sx={thBody} align="center">
										2019.08.25
									</TableCell>
								</TableRow>
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[5, 10, 25]}
										count={10}
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
				<BannerForm onSubmit={submitForm} setOpen={setOpen} />
			)}
		</Box>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	auth: bindActionCreators(Api.auth, dispatch),
});

export default connect(null, mapDispatchToProps)(BannerPage);
