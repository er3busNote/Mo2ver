import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import NoticeList from '../components/user/NoticeList';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface NoticeProps {
	title: string;
	description: string;
}

const NoticePC: FC<NoticeProps> = ({ title, description }): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<NoticeList title={title} description={description} />
		</Box>
	);
};

const NoticeMobile: FC<NoticeProps> = ({ title, description }): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<NoticeList title={title} description={description} />
		</Box>
	);
};

const NoticePage: FC<NoticeProps> = ({ title, description }): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<>
			{isDesktop && <NoticePC title={title} description={description} />}
			{isMobile && <NoticeMobile title={title} description={description} />}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(NoticePage);
