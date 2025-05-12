import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@store/types';
import { NoticeData } from '@api/types';
import useNoticeInfo from '@hooks/notice/useNoticeInfo';
import NoticeDetail from './NoticeDetail';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface NoticeDetailProps {
	title: string;
	description: string;
	noticeData: NoticeData;
}

interface NoticeDetailDispatchProps {
	title: string;
	description: string;
	notice: ActionCreatorsMapObject;
}

const NoticeDetailPC: FC<NoticeDetailProps> = ({
	title,
	description,
	noticeData,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<NoticeDetail
				title={title}
				description={description}
				noticeData={noticeData}
			/>
		</Box>
	);
};

const NoticeDetailMobile: FC<NoticeDetailProps> = ({
	title,
	description,
	noticeData,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<NoticeDetail
				title={title}
				description={description}
				noticeData={noticeData}
			/>
		</Box>
	);
};

const NoticeDetailPage: FC<NoticeDetailDispatchProps> = ({
	title,
	description,
	notice,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { id } = useParams();
	const code = id ?? '';
	const noticeData = useNoticeInfo({ notice, code });

	return (
		<>
			{isDesktop && (
				<NoticeDetailPC
					title={title}
					description={description}
					noticeData={noticeData}
				/>
			)}
			{isMobile && (
				<NoticeDetailMobile
					title={title}
					description={description}
					noticeData={noticeData}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	notice: bindActionCreators(Api.notice, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoticeDetailPage);
