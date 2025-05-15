import React, { FC } from 'react';
import AppSubHeader from '@layouts/AppSubHeader';
import {
	Box,
	List,
	ListItem,
	ListItemText,
	Typography,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { NoticeData, FileData } from '@api/types';
import { SxProps, Theme } from '@mui/material/styles';
import { fontSize_xs, fontSize_sm, fontSize_lg } from '@utils/style';
import { isEmpty } from 'lodash';

interface NoticeDetailProps {
	title: string;
	description: string;
	noticeData: NoticeData;
}

const NoticeDetail: FC<NoticeDetailProps> = ({
	title,
	description,
	noticeData,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const noticeHeader: SxProps<Theme> = {
		px: 2,
		py: 1,
		fontSize: { xs: '14px', sm: '15px', lg: '17px' },
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
		display: 'flex',
		justifyContent: 'space-between',
	};
	const registerDate: SxProps<Theme> = {
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
	};
	const contents: SxProps<Theme> = {
		fontSize: { xs: '14px', sm: '15px', lg: '17px' },
		px: 3,
		py: 1,
		borderBottom: '1px #F0F0F0 solid',
	};
	const fileHeader: SxProps<Theme> = {
		py: 0.5,
		display: 'table-cell',
		width: isMobile ? 'auto' : '100px',
		bgcolor: '#f9f9f9',
		fontWeight: 'bold',
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		textAlign: 'center',
		borderBlock: 'none',
	};
	const fileBody: SxProps<Theme> = {
		px: isMobile ? 0.5 : 2,
		py: 0.5,
		borderBlock: 'none',
	};
	const fileList: SxProps<Theme> = {
		px: 2,
		py: 0.5,
		background: 'white',
	};
	const fileItem: SxProps<Theme> = {
		whiteSpace: 'normal',
		wordBreak: 'break-word',
	};
	const fileSize: SxProps<Theme> = {
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
	};
	const noticeBox: SxProps<Theme> = {
		mx: 3,
		my: 2,
		border: '2px #F0F0F0 solid',
	};

	return (
		<Box>
			<AppSubHeader title={title} description={description} />
			<Box sx={noticeBox}>
				<Box sx={noticeHeader}>
					<Box>{noticeData.subject}</Box>
					<Box sx={registerDate}>{noticeData.registerDate}</Box>
				</Box>
				<Box
					sx={contents}
					dangerouslySetInnerHTML={{ __html: noticeData.contents }}
				/>
				{!isEmpty(noticeData.noticeFileList) && (
					<TableContainer>
						<Table>
							<TableBody>
								{isMobile && <TableRow sx={fileHeader}>첨부파일</TableRow>}
								<TableRow>
									{isDesktop && <TableCell sx={fileHeader}>첨부파일</TableCell>}
									<TableCell sx={fileBody}>
										<List sx={fileList}>
											{noticeData.noticeFileList &&
												noticeData.noticeFileList.map(
													(fileData: FileData, index: number) => (
														<ListItem key={index} disablePadding>
															<ListItemText
																primary={
																	<Typography
																		sx={fileItem}
																		variant="caption"
																		noWrap
																	>
																		{fileData.fileName}{' '}
																		<Typography
																			sx={fileSize}
																			component="span"
																			color="text.secondary"
																		>
																			({(fileData.fileSize / 1024).toFixed(2)}{' '}
																			KB)
																		</Typography>
																	</Typography>
																}
															/>
														</ListItem>
													)
												)}
										</List>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Box>
		</Box>
	);
};

export default NoticeDetail;
