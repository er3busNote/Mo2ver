import React, { FC } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@/types/store';
import useNoticePageList from '@hooks/notice/useNoticePageList';
import NoticeList from './NoticeList';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { NoticeProps } from '@/types/notice/main';

interface NoticeDispatchProps {
	title: string;
	description: string;
	notice: ActionCreatorsMapObject;
}

const NoticePC: FC<NoticeProps> = ({
	title,
	description,
	noticeData,
	setPage,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<NoticeList
				title={title}
				description={description}
				noticeData={noticeData}
				setPage={setPage}
			/>
		</Box>
	);
};

const NoticeMobile: FC<NoticeProps> = ({
	title,
	description,
	noticeData,
	setPage,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<NoticeList
				title={title}
				description={description}
				noticeData={noticeData}
				setPage={setPage}
			/>
		</Box>
	);
};

const NoticePage: FC<NoticeDispatchProps> = ({
	title,
	description,
	notice,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [noticeData, setPage] = useNoticePageList({ notice });

	return (
		<>
			{isDesktop && (
				<NoticePC
					title={title}
					description={description}
					noticeData={noticeData}
					setPage={setPage}
				/>
			)}
			{isMobile && (
				<NoticeMobile
					title={title}
					description={description}
					noticeData={noticeData}
					setPage={setPage}
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

export default connect(mapStateToProps, mapDispatchToProps)(NoticePage);
