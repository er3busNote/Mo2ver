import React, { FC } from 'react';
import UserDetailPC from '../components/user/UserDetailPC';
import UserDetailMobile from '../components/user/UserDetailMobile';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const UserPC: FC = (): JSX.Element => {
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
					<UserDetailPC />
				</Box>
			)}
		</>
	);
};

const UserMobile: FC = (): JSX.Element => {
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
					<UserDetailMobile />
				</Box>
			)}
		</>
	);
};

const UserPage: FC = (): JSX.Element => {
	return (
		<>
			<UserPC />
			<UserMobile />
		</>
	);
};

export default UserPage;
