import React, { FC } from 'react';
import NoticeList from '../components/user/NoticeList';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const NoticePC: FC = (): JSX.Element => {
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
					<NoticeList />
				</Box>
			)}
		</>
	);
};

const NoticeMobile: FC = (): JSX.Element => {
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
					<NoticeList />
				</Box>
			)}
		</>
	);
};

const NoticePage: FC = (): JSX.Element => {
	return (
		<>
			<NoticePC />
			<NoticeMobile />
		</>
	);
};

export default NoticePage;
