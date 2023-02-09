import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DrawerProps {
	open?: boolean;
}

interface AppMainProps {
	open?: boolean;
	children?: ReactElement;
}

const Main = styled('main', {
	shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => ({
	flexGrow: 1,
	width: '100%',
	padding: theme.spacing(0),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: 0,
	}),
}));

const AppMain: FC<AppMainProps> = ({ open, children }): JSX.Element => {
	return (
		<Main open={open}>
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
