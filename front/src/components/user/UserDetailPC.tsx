import React, { FC } from 'react';
import UserSubHeader from './cmmn/UserSubHeader';
import { Box } from '@mui/material';

const UserDetailPC: FC = (): JSX.Element => {
	return (
		<Box>
			<UserSubHeader title={'My 프로파일'} />
			<Box sx={{ mx: 3, my: 2 }}>ss</Box>
		</Box>
	);
};

export default UserDetailPC;
