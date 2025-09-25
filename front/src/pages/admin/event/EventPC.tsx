import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ButtonBase from '@components/button/ButtonBase';
import TablePageNavigator from '@components/pagination/TablePageNavigator';
import {
	Box,
	Link,
	MenuItem,
	InputLabel,
	FormControl,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableFooter,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { HorizontalRule as HorizontalRuleIcon } from '@mui/icons-material';
import { EventData } from '@/types/api';
import { EventProps } from '@/types/admin/event';
import goToEventForm from '@navigate/admin/event/goToEventForm';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';

const fontSize_sm = '13px';
const fontSize_lg = '14px';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

const EventPC: FC<EventProps> = ({
	title,
	description,
	setPage,
	eventPageData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState('');
	const [useyn, setUseyn] = useState('');
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

	const registerClick = () => {
		goToEventForm({ title, description, dispatch, navigate });
	};

	const updateClick = (eventNo: number) => {
		goToEventForm({ title, description, dispatch, navigate, eventNo });
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

	const periodTh: SxProps<Theme> = {
		px: 2,
		py: 1.5,
		width: 120,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const periodTd: SxProps<Theme> = {
		px: 2,
		pt: 1.2,
		pb: 1,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		border: tableBorder,
	};
	const dataTh: SxProps<Theme> = {
		px: 2,
		py: 1.5,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 2,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		border: tableBorder,
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
			ml: 0.5,
			mt: 0.5,
		},
	};
	const selectLabel: SxProps<Theme> = {
		mt: -1,
		ml: 0.5,
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
				<Table size="small" sx={{ border: tableBorder }}>
					<TableBody sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								키워드 검색
							</TableCell>
							<TableCell colSpan={3} sx={dataTd} align="left">
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
							<TableCell sx={periodTh} align="center" component="th">
								전시기간
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
							<TableCell sx={dataTh} align="center" component="th">
								전시여부
							</TableCell>
							<TableCell sx={dataTd} align="left">
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
			<Box sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}>
				<ButtonBase
					type="submit"
					device="pc"
					buttonType="register"
					variant="outlined"
					onClick={registerClick}
				>
					등록
				</ButtonBase>
				<ButtonBase device="pc" buttonType="search" variant="outlined">
					검색
				</ButtonBase>
			</Box>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableHead sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								번호
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								제목
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								전시기간
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								진행상태
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								전시여부
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								배경이미지여부
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								등록자
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								등록일
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{eventPageData?.content.map((data: EventData, index: number) => (
							<TableRow key={index}>
								<TableCell sx={dataTd} align="center">
									{data.eventNo}
								</TableCell>
								<TableCell sx={dataTd} align="center">
									<Link
										component="button"
										variant="body2"
										onClick={() => updateClick(data.eventNo)}
									>
										{data.subject}
									</Link>
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
								<TableCell sx={dataTd} align="center">
									Y
								</TableCell>
								<TableCell sx={dataTd} align="center">
									{data.register}
								</TableCell>
								<TableCell sx={dataTd} align="center">
									{moment(data.registerDate).format('YYYY-MM-DD')}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							{eventPageData?.totalElements && (
								<TablePageNavigator
									size={eventPageData.size}
									totalElements={eventPageData.totalElements}
									numberOfElements={eventPageData.numberOfElements}
									setPage={setPage}
								/>
							)}
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default EventPC;
