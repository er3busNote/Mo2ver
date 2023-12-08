import React, { FC, useEffect, ReactElement } from 'react';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { menuLotate } from '../../store/index';
import Api from '../../services/api';
import useCategoryList from '../../hooks/useCategoryList';
import AppHeader from './AppHeader';
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
import { CategoryData } from '../../services/types';
import { useMediaQuery } from 'react-responsive';

const mdTheme = createTheme(contentTheme);

const drawerMenuLimit = 768;

interface AppProps {
	categoryData: Array<CategoryData>;
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
	return (
		<>
			{isPc && (
				<>
					<AppSearchPC />
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
	const categoryData = useCategoryList({ category });

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
				<AppHeader />
				<AppPC categoryData={categoryData} />
				<AppMobile categoryData={categoryData} />
				<AppMain>{children || <Outlet />}</AppMain>
				<AppFooter />
			</Box>
		</ThemeProvider>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(null, mapDispatchToProps)(AppContent);
