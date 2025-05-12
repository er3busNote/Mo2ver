import React, { FC } from 'react';
import AppSubHeader from '@layouts/AppSubHeader';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { NoticeData, FileData } from '@api/types';
import { SxProps, Theme } from '@mui/material/styles';
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
	const subject: SxProps<Theme> = {
		mx: 3,
		my: 2,
		py: 1,
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const contents: SxProps<Theme> = {
		mx: 3,
	};
	const fileList: SxProps<Theme> = {
		p: 2,
		mt: 2,
		background: 'white',
	};

	return (
		<Box>
			<AppSubHeader title={title} description={description} />
			<Box sx={subject}>{noticeData.subject}</Box>
			<Box
				sx={contents}
				dangerouslySetInnerHTML={{ __html: noticeData.contents }}
			/>
			{!isEmpty(noticeData.noticeFileList) && (
				<List sx={fileList}>
					{noticeData.noticeFileList &&
						noticeData.noticeFileList.map(
							(fileData: FileData, index: number) => (
								<ListItem key={index} disablePadding>
									<ListItemText
										primary={
											<Typography variant="body2" noWrap>
												{fileData.fileName}{' '}
												<Typography
													variant="caption"
													component="span"
													color="text.secondary"
												>
													({(fileData.fileSize / 1024).toFixed(2)} KB)
												</Typography>
											</Typography>
										}
									/>
								</ListItem>
							)
						)}
				</List>
			)}
		</Box>
	);
};

export default NoticeDetail;
