import React, {
	FC,
	useState,
	useEffect,
	MouseEvent,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeNext, menuActive } from '@store/index';
import { TitleInfo } from '@store/types';
import ButtonBase from '@components/button/ButtonBase';
import {
	Box,
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
import { EventData, EventPageData } from '@api/types';
// import _ from 'lodash';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

interface EventProps {
	title: string;
	description: string;
	setPage: Dispatch<SetStateAction<number>>;
	eventPageData: EventPageData;
}

const EventMobile: FC<EventProps> = ({
	title,
	description,
	setPage,
	eventPageData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState('');
	const [useyn, setUseyn] = useState('');
	const [newPage, setNewPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(0);
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

	useEffect(() => {
		setRowsPerPage(eventPageData.numberOfElements);
	}, [eventPageData.size]);

	const registerClick = () => {
		const titleData: TitleInfo = {
			title: title,
			description: description,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive('/admin/event/goods'));
		navigate('/admin/event/goods');
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
		setNewPage(newPage);
	};
	const handleChangeRowsPerPage = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setNewPage(0);
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
		border: tableBorder,
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 2,
		fontSize: { xs: '11px', sm: '13px' },
		border: tableBorder,
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
				<Table size="small" sx={{ border: tableBorder }}>
					<TableBody sx={{ borderTop: tableBorderHeader }}>
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
				<ButtonBase
					type="submit"
					device="mobile"
					buttonType="register"
					variant="outlined"
					onClick={registerClick}
				>
					등록
				</ButtonBase>
				<ButtonBase device="mobile" buttonType="search" variant="outlined">
					검색
				</ButtonBase>
			</Box>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableHead sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								제목
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
						{eventPageData.content &&
							eventPageData.content.map((data: EventData, index: number) => (
								<TableRow key={index}>
									<TableCell sx={dataTd} align="center">
										{data.eventManageNo}
									</TableCell>
									<TableCell sx={dataTd} align="center">
										{moment(data.eventStartDate).format('YYYY-MM-DD')} ~{' '}
										{moment(data.eventEndDate).format('YYYY-MM-DD')}
									</TableCell>
									<TableCell sx={dataTd} align="center">
										마감
									</TableCell>
									<TableCell sx={dataTd} align="center">
										{data.eventYesNo}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
					<TableFooter>
						<TableRow>
							{eventPageData.totalElements && rowsPerPage && (
								<TablePagination
									rowsPerPageOptions={[eventPageData.size]}
									count={eventPageData.totalElements}
									rowsPerPage={rowsPerPage}
									page={newPage}
									SelectProps={{
										inputProps: {
											'aria-label': 'rows per page',
										},
										native: false,
									}}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
								/>
							)}
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default EventMobile;
