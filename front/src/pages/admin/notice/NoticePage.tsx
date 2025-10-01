import React, { FC } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@/types/store';
import Api from '@api/index';
import useNoticePageList from '@hooks/notice/query/useNoticePageList';
import NoticePC from './NoticePC';
import NoticeMobile from './NoticeMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface NoticeDispatchProps {
	title: string;
	description: string;
	notice: ActionCreatorsMapObject;
}

const NoticePage: FC<NoticeDispatchProps> = ({
	title,
	description,
	notice,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { data: noticePageData, setPage } = useNoticePageList({ notice });
	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			{isDesktop && (
				<NoticePC
					title={title}
					description={description}
					setPage={setPage}
					noticePageData={noticePageData}
				/>
			)}
			{isMobile && (
				<NoticeMobile
					title={title}
					description={description}
					setPage={setPage}
					noticePageData={noticePageData}
				/>
			)}
		</Box>
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
