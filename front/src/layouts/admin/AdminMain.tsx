import React, { FC, ReactElement } from 'react';
import AdminSubHeader from './AdminSubHeader';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AppMainProps {
	children?: ReactElement;
}

const Main = styled('main', {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(0),
}));

const AdminMain: FC<AppMainProps> = ({ children }): JSX.Element => {
	return (
		<Main>
			<Box
				component="main"
				sx={{
					height: '100vh',
					overflow: 'auto',
					bgcolor: 'background.default',
				}}
			>
				<AdminSubHeader />
				{children}
			</Box>
		</Main>
	);
};

export default AdminMain;
