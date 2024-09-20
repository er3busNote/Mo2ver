import React, {
	FC,
	useState,
	useEffect,
	ReactElement,
	SyntheticEvent,
} from 'react';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import {
	changePrev,
	changePrevNext,
	menuLotate,
	toastClose,
} from '../../store/index';
import { TitleState, ToastState } from '../../store/types';
import Api from '../../api';
import useCategoryGroupList from '../../hooks/category/useCategoryGroupList';
import AppHeader from './AppHeader';
//import AppHeaderBar from './AppHeaderBar';
import AppHeaderMenu from './AppHeaderMenu';
import AppSearchPC from './AppSearchPC';
import AppSearchMobile from './AppSearchMobile';
import AppMenuPC from './AppMenuPC';
import AppMenuHomePC from './AppMenuHomePC';
import AppMenuMobile from './AppMenuMobile';
import AppMain from './AppMain';
import AppFooter from './AppFooter';
import { CssBaseline, Box, Alert, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { contentTheme } from '../../utils/theme';
import { CategoryDataGroup } from '../../api/types';
import { useMediaQuery } from 'react-responsive';
import { isDesktop } from 'react-device-detect';

const mdTheme = createTheme(contentTheme);

const drawerMenuLimit = 768;
const drawerMenuWidth = 200;

interface AppProps {
	title: string;
	description: string;
	categoryData: CategoryDataGroup;
}

interface LayoutDefaultProps {
	title: string;
	description: string;
	open: boolean;
	type: 'success' | 'info' | 'warning' | 'error' | undefined;
	message: string;
	children?: ReactElement;
	category: ActionCreatorsMapObject;
}

const AppPC: FC<AppProps> = ({
	title,
	description,
	categoryData,
}): JSX.Element => {
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
							<AppHeader
								width={'940px'}
								title={title}
								description={description}
							/>
						)}
						<AppSearchPC title={title} description={description} />
					</Box>
					<AppHeaderMenu
						scrolled={scrolled}
						title={title}
						description={description}
						categoryData={categoryData}
					/>
					{location.pathname === '/' ? (
						<AppMenuHomePC
							title={title}
							description={description}
							categoryData={categoryData}
						/>
					) : (
						<AppMenuPC
							title={title}
							description={description}
							categoryData={categoryData}
						/>
					)}
				</>
			)}
		</>
	);
};

const AppMobile: FC<AppProps> = ({
	title,
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
					{isDesktop && (
						<AppHeader width={'100%'} title={title} description={description} />
					)}
					{/* {isMobile && <AppHeaderBar description={description} />} */}
					<AppSearchMobile title={title} description={description} />
					<AppMenuMobile
						title={title}
						description={description}
						categoryData={categoryData}
					/>
				</>
			)}
		</>
	);
};

const AppContent: FC<LayoutDefaultProps> = ({
	title,
	description,
	open,
	type,
	message,
	children,
	category,
}): JSX.Element => {
	const dispatch = useDispatch();
	const [index, setIndex] = useState<number>(0);
	const categoryData = useCategoryGroupList({ category });

	useEffect(() => {
		dispatch(menuLotate('user')); // 메뉴 변경 : admin → user
		const handlePopstate = (event: PopStateEvent) => {
			if (event.state) {
				const idx = event.state.idx;
				if (idx - index === 1) {
					dispatch(changePrevNext()); // 브라우저의 앞으로가기 버튼이 클릭되면 실행될 코드
				} else {
					dispatch(changePrev()); // 브라우저의 뒤로가기 버튼이 클릭되면 실행될 코드
				}
				setIndex(idx);
			}
		};

		// popstate 이벤트를 구독
		window.addEventListener('popstate', handlePopstate);

		// 컴포넌트가 언마운트될 때 이벤트 구독 해제
		return () => {
			window.removeEventListener('popstate', handlePopstate);
		};
	}, [dispatch, index, setIndex]);

	const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(toastClose());
	};

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
				<AppPC
					title={title}
					description={description}
					categoryData={categoryData}
				/>
				<AppMobile
					title={title}
					description={description}
					categoryData={categoryData}
				/>
				<AppMain>{children || <Outlet />}</AppMain>
				<AppFooter
					width={drawerMenuWidth}
					title={title}
					description={description}
					categoryData={categoryData}
				/>
			</Box>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={type}
					variant="outlined"
					sx={{ width: '100%' }}
				>
					{message || ''}
				</Alert>
			</Snackbar>
		</ThemeProvider>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
	open: (state.toast as ToastState).open,
	type: (state.toast as ToastState).type,
	message: (state.toast as ToastState).message,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
