import React, { FC, ReactElement } from 'react';
import { Outlet } from 'react-router';
import AppHeader from './AppHeader';
import AppSearch from './AppSearch';
import AppMenu from './AppMenu';
import AppMain from './AppMain';
import AppFooter from './AppFooter';
import { CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { contentTheme } from '../../utils/theme';

const mdTheme = createTheme(contentTheme);

interface LayoutDefaultProps {
	children?: ReactElement;
}

const AppContent: FC<LayoutDefaultProps> = ({ children }): JSX.Element => {
	return (
		<ThemeProvider theme={mdTheme}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center', // 가로 중앙
				}}
			>
				<CssBaseline />
				<AppHeader />
				<AppSearch />
				<AppMenu />
				<AppMain>{children || <Outlet />}</AppMain>
				<AppFooter />
			</Box>
		</ThemeProvider>
	);
};

export default AppContent;
