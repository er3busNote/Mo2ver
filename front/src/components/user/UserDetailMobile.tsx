import React, { FC } from 'react';
import UserSubHeaderMobile from './cmmn/UserSubHeaderMobile';
import { Box } from '@mui/material';

const UserDetailMobile: FC = (): JSX.Element => {
	return (
		<Box>
			<UserSubHeaderMobile />
			<Box sx={{ mx: 3, my: 2 }}>ss</Box>
		</Box>
	);
};

export default UserDetailMobile;
