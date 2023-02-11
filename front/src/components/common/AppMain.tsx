import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AppMainProps {
	children?: ReactElement;
}

const Main = styled('main', {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
	flexGrow: 1,
	width: '100%',
	padding: theme.spacing(0),
}));

const AppMain: FC<AppMainProps> = ({ children }): JSX.Element => {
	return (
		<Main>
			<Box
				component="main"
				sx={{
					overflow: 'auto',
					bgcolor: 'background.default',
				}}
			>
				{children}
			</Box>
		</Main>
	);
};

export default AppMain;
