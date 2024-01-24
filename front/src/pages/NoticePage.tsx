import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import NoticeList from '../components/user/NoticeList';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

interface NoticeProps {
	description: string;
}

const NoticePC: FC<NoticeProps> = ({ description }): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<Box
					sx={{
						width: '940px',
						display: 'inline-block',
					}}
				>
					<NoticeList description={description} />
				</Box>
			)}
		</>
	);
};

const NoticeMobile: FC<NoticeProps> = ({ description }): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<Box
					sx={{
						width: '100%',
						display: 'inline-block',
					}}
				>
					<NoticeList description={description} />
				</Box>
			)}
		</>
	);
};

const NoticePage: FC<NoticeProps> = ({ description }): JSX.Element => {
	return (
		<>
			<NoticePC description={description} />
			<NoticeMobile description={description} />
		</>
	);
};

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(NoticePage);
