import React, { FC, useState, Dispatch, SetStateAction } from 'react';
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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NoticeData, NoticePageData } from '@api/types';
import goToNoticeForm from '@navigate/admin/notice/goToNoticeForm';
import moment from 'moment';

const fontSize_sm = '13px';
const fontSize_lg = '14px';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

interface NoticeProps {
	title: string;
	description: string;
	setPage: Dispatch<SetStateAction<number>>;
	noticePageData: NoticePageData;
}

const NoticePC: FC<NoticeProps> = ({
	title,
	description,
	setPage,
	noticePageData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState('');
	const [useyn, setUseyn] = useState('');

	const registerClick = () => {
		goToNoticeForm({ title, description, dispatch, navigate });
	};

	const updateClick = (noticeManageNo: number) => {
		goToNoticeForm({ title, description, dispatch, navigate, noticeManageNo });
	};

	const handleKeywordChange = (event: SelectChangeEvent) => {
		setKeyword(event.target.value as string);
	};
	const handleUseynChange = (event: SelectChangeEvent) => {
		setUseyn(event.target.value as string);
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
								전시여부
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
						{noticePageData.content &&
							noticePageData.content.map((data: NoticeData, index: number) => (
								<TableRow key={index}>
									<TableCell sx={dataTd} align="center">
										{data.noticeManageNo}
									</TableCell>
									<TableCell sx={dataTd} align="center">
										<Link
											component="button"
											variant="body2"
											onClick={() => updateClick(data.noticeManageNo)}
										>
											{data.subject}
										</Link>
									</TableCell>
									<TableCell sx={dataTd} align="center">
										{data.noticeYesNo}
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
							{noticePageData.totalElements && (
								<TablePageNavigator
									size={noticePageData.size}
									totalElements={noticePageData.totalElements}
									numberOfElements={noticePageData.numberOfElements}
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

export default NoticePC;
