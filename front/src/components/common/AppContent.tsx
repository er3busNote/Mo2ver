import React, { FC, useState, useEffect, ReactElement } from 'react';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { changePrev, menuLotate } from '../../store/index';
import { TitleState } from '../../store/types';
import Api from '../../services/api';
import useCategoryGroupList from '../../hooks/useCategoryGroupList';
import AppHeader from './AppHeader';
import AppHeaderBar from './AppHeaderBar';
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
import { isDesktop, isMobile } from 'react-device-detect';

const mdTheme = createTheme(contentTheme);

const drawerMenuLimit = 768;
const drawerMenuWidth = 200;

interface AppProps {
	description: string;
	categoryData: CategoryDataGroup;
}

interface LayoutDefaultProps {
	children?: ReactElement;
	description: string;
	category: ActionCreatorsMapObject;
}

const AppPC: FC<AppProps> = ({ description, categoryData }): JSX.Element => {
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
						{isDesktop && (
							<AppHeader width={'940px'} description={description} />
						)}
						<AppSearchPC />
					</Box>
					<AppHeaderMenu
						scrolled={scrolled}
						description={description}
						categoryData={categoryData}
					/>
					{location.pathname === '/' ? (
						<AppMenuHomePC
							description={description}
							categoryData={categoryData}
						/>
					) : (
						<AppMenuPC description={description} categoryData={categoryData} />
					)}
				</>
			)}
		</>
	);
};

const AppMobile: FC<AppProps> = ({
	description,
	categoryData,
}): JSX.Element => {
	const isTablet = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isTablet && (
				<>
					{isDesktop && <AppHeader width={'100%'} description={description} />}
					{isMobile && <AppHeaderBar description={description} />}
					<AppSearchMobile />
					<AppMenuMobile
						description={description}
						categoryData={categoryData}
					/>
				</>
			)}
		</>
	);
};

const AppContent: FC<LayoutDefaultProps> = ({
	children,
	description,
	category,
}): JSX.Element => {
	const dispatch = useDispatch();
	const categoryData = useCategoryGroupList({ category });

	useEffect(() => {
		dispatch(menuLotate('user'));
		const handlePopstate = (event: PopStateEvent) => {
			if (event.state) {
				dispatch(changePrev());
			}
		};

		// popstate 이벤트를 구독
		window.addEventListener('popstate', handlePopstate);

		// 컴포넌트가 언마운트될 때 이벤트 구독 해제
		return () => {
			window.removeEventListener('popstate', handlePopstate);
		};
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
				<AppPC description={description} categoryData={categoryData} />
				<AppMobile description={description} categoryData={categoryData} />
				<AppMain>{children || <Outlet />}</AppMain>
				<AppFooter
					width={drawerMenuWidth}
					description={description}
					categoryData={categoryData}
				/>
			</Box>
		</ThemeProvider>
	);
};

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
