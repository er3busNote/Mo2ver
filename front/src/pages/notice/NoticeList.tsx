import React, { FC, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppSubHeader from '@layouts/AppSubHeader';
import PageNavigator from '@components/pagination/PageNavigator';
import {
	Box,
	Link,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { NoticeData, NoticePageData } from '@api/types';
import { SxProps, Theme } from '@mui/material/styles';
import goToNoticeDetail from '@navigate/notice/goToNoticeDetail';
import moment from 'moment';

interface NoticeListProps {
	title: string;
	description: string;
	noticeData: NoticePageData;
	setPage: Dispatch<SetStateAction<number>>;
}

const NoticeList: FC<NoticeListProps> = ({
	title,
	description,
	noticeData,
	setPage,
}): JSX.Element => {
	const {
		content,
		totalElements,
		totalPages,
		//pageable: { pageNumber, pageSize },
	} = noticeData;
	const pageNumber = noticeData.pageable?.pageNumber ?? 0;
	const pageSize = noticeData.pageable?.pageSize ?? 12;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const noticeClick = (code: number) => {
		goToNoticeDetail({
			code,
			title,
			description,
			dispatch,
			navigate,
		});
	};

	const thHeader: SxProps<Theme> = {
		px: { xs: 0, sm: 2 },
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
	const indexColumn: SxProps<Theme> = {
		width: '10%',
	};
	const registerColumn: SxProps<Theme> = {
		px: { xs: 0, sm: 2 },
		py: 1.5,
		width: '15%',
	};
	const createColumn: SxProps<Theme> = {
		width: '15%',
	};
	return (
		<Box>
			<AppSubHeader title={title} description={description} />
			<Box sx={{ mx: 3, my: 2 }}>
				<TableContainer>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell sx={thHeader} align="center">
									번호
								</TableCell>
								<TableCell sx={thHeader} align="center">
									제목
								</TableCell>
								<TableCell sx={thHeader} align="center">
									작성자
								</TableCell>
								<TableCell sx={thHeader} align="center">
									등록일
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{content &&
								content.map((data: NoticeData, index: number) => {
									const reverseIndex =
										totalElements - pageNumber * pageSize - index;

									return (
										<TableRow key={index} sx={rowItem}>
											<TableCell
												sx={indexColumn}
												component="th"
												scope="row"
												align="center"
											>
												<Link
													component="button"
													variant="body2"
													onClick={() => noticeClick(data.noticeManageNo)}
												>
													{reverseIndex}
												</Link>
											</TableCell>
											<TableCell align="center">{data.subject}</TableCell>
											<TableCell align="center" sx={registerColumn}>
												관리자
											</TableCell>
											<TableCell align="center" sx={createColumn}>
												{moment(data.registerDate).format('YYYY-MM-DD')}
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box sx={{ mb: 10, display: 'flex', justifyContent: 'center' }}>
				<PageNavigator count={totalPages} setPage={setPage} />
			</Box>
		</Box>
	);
};

export default NoticeList;
