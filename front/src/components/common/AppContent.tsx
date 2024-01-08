import React, { FC, useState, useEffect, ReactElement } from 'react';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { menuLotate } from '../../store/index';
import Api from '../../services/api';
import useCategoryGroupList from '../../hooks/useCategoryGroupList';
import AppHeader from './AppHeader';
import AppHeaderMenu from './AppHeaderMenu';
import AppSearchPC from './AppSearchPC';
import AppSearchMobile from './AppSearchMobile';
import AppMenuPC from './AppMenuPC';
import AppMenuHomePC from './AppMenuHomePC';
import AppMenuMobile from './AppMenuMobile';
import AppMain from './AppMain';
import AppFooter from './AppFooter';
import { CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { contentTheme } from '../../utils/theme';
import { CategoryDataGroup } from '../../services/types';
import { useMediaQuery } from 'react-responsive';
import { isDesktop } from 'react-device-detect';

const mdTheme = createTheme(contentTheme);

const drawerMenuLimit = 768;
const drawerMenuWidth = 200;

interface AppProps {
	categoryData: CategoryDataGroup;
}

interface LayoutDefaultProps {
	children?: ReactElement;
	category: ActionCreatorsMapObject;
}

const AppPC: FC<AppProps> = ({ categoryData }): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	const location = useLocation();
	const [scrolled, setScrolled] = useState(false);

	const handleScroll = () => {
		const isScrolled = window.scrollY > 100;
		setScrolled(isScrolled);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			window.addEventListener('scroll', handleScroll);
		}, 100);
		return () => {
			clearInterval(timer);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			{isPc && (
				<>
					<Box
						component="header"
						sx={{
							width: '100%',
							display: 'block',
						}}
					>
						{isDesktop && <AppHeader />}
						<AppSearchPC />
					</Box>
					<AppHeaderMenu scrolled={scrolled} categoryData={categoryData} />
					{location.pathname === '/' ? (
						<AppMenuHomePC categoryData={categoryData} />
					) : (
						<AppMenuPC categoryData={categoryData} />
					)}
				</>
			)}
		</>
	);
};

const AppMobile: FC<AppProps> = ({ categoryData }): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<>
					{isDesktop && <AppHeader />}
					<AppSearchMobile />
					<AppMenuMobile categoryData={categoryData} />
				</>
			)}
		</>
	);
};

const AppContent: FC<LayoutDefaultProps> = ({
	children,
	category,
}): JSX.Element => {
	const dispatch = useDispatch();
	const categoryData = useCategoryGroupList({ category });

	useEffect(() => {
		dispatch(menuLotate('user'));
	}, [dispatch]);

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
				<AppPC categoryData={categoryData} />
				<AppMobile categoryData={categoryData} />
				<AppMain>{children || <Outlet />}</AppMain>
				<AppFooter width={drawerMenuWidth} categoryData={categoryData} />
			</Box>
		</ThemeProvider>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(null, mapDispatchToProps)(AppContent);
