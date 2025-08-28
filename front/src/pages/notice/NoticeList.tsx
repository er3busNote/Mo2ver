import React, { FC } from 'react';
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
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { NoticeData } from '@/types/api';
import { SxProps, Theme } from '@mui/material/styles';
import { AttachFile as AttachFileIcon } from '@mui/icons-material';
import goToNoticeDetail from '@navigate/notice/goToNoticeDetail';
import { NoticeProps } from '@/types/notice/main';

const NoticeList: FC<NoticeProps> = ({
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
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
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
	const rowIndex: SxProps<Theme> = {
		width: '10%',
	};
	const attachFile: SxProps<Theme> = {
		px: { xs: 0, sm: 2 },
		py: 1.5,
		width: '15%',
	};
	const register: SxProps<Theme> = {
		px: { xs: 0, sm: 2 },
		py: 1.5,
		width: '15%',
	};
	const registerDate: SxProps<Theme> = {
		width: isDesktop ? '15%' : '20%',
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
									첨부파일
								</TableCell>
								{isDesktop && (
									<TableCell sx={thHeader} align="center">
										작성자
									</TableCell>
								)}
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
												sx={rowIndex}
												component="th"
												scope="row"
												align="center"
											>
												{reverseIndex}
											</TableCell>
											<TableCell align="center">
												<Link
													component="button"
													variant="body2"
													underline="none"
													onClick={() => noticeClick(data.noticeNo)}
												>
													{data.subject}
												</Link>
											</TableCell>
											<TableCell align="center" sx={attachFile}>
												{data.noticeFileList.length > 0 && (
													<Box
														display="flex"
														alignItems="center"
														justifyContent="center"
													>
														<AttachFileIcon fontSize="small" /> (
														{data.noticeFileList.length})
													</Box>
												)}
											</TableCell>
											{isDesktop && (
												<TableCell align="center" sx={register}>
													{data.memberName}
												</TableCell>
											)}
											<TableCell align="center" sx={registerDate}>
												{data.registerDate}
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
