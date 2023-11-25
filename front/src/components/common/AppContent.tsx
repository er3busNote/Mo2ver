import React, { FC, ReactElement } from 'react';
import { Outlet } from 'react-router';
import AppHeader from './AppHeader';
import AppSearchPC from './AppSearchPC';
import AppSearchMobile from './AppSearchMobile';
import AppMenuPC from './AppMenuPC';
import AppMenuMobile from './AppMenuMobile';
import AppMain from './AppMain';
import AppFooter from './AppFooter';
import { CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { contentTheme } from '../../utils/theme';
import { useMediaQuery } from 'react-responsive';

const mdTheme = createTheme(contentTheme);

const drawerMenuLimit = 768;

interface LayoutDefaultProps {
	children?: ReactElement;
}

const AppPC: FC = (): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<>
					<AppSearchPC />
					<AppMenuPC />
				</>
			)}
		</>
	);
};

const AppMobile: FC = (): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<>
					<AppSearchMobile />
					<AppMenuMobile />
				</>
			)}
		</>
	);
};

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
				<AppPC />
				<AppMobile />
				<AppMain>{children || <Outlet />}</AppMain>
				<AppFooter />
			</Box>
		</ThemeProvider>
	);
};

export default AppContent;
