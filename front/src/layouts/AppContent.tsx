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
} from '@store/index';
import { TitleState, ToastState } from '@store/types';
import Api from '@api/index';
import useGroupMenuList from '@hooks/cmmn/useGroupMenuList';
import useGoodsRankList from '@hooks/goods/useGoodsRankList';
import useCategoryGroupList from '@hooks/category/useCategoryGroupList';
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
import {
	CssBaseline,
	Box,
	Alert,
	Snackbar,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { contentTheme } from '@utils/theme';
import { GoodsData, CategoryDataGroup } from '@api/types';
import { useIsDesktop } from '@context/MobileContext';

const mdTheme = createTheme(contentTheme);

const drawerMenuWidth = 200;

interface AppProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	search: ActionCreatorsMapObject;
	recommend: ActionCreatorsMapObject;
	goodsRankData: Array<GoodsData>;
	categoryData: CategoryDataGroup;
}

interface LayoutDefaultProps {
	title: string;
	description: string;
	open: boolean;
	type: 'success' | 'info' | 'warning' | 'error' | undefined;
	message: string;
	children?: ReactElement;
	member: ActionCreatorsMapObject;
	menu: ActionCreatorsMapObject;
	goods: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
	search: ActionCreatorsMapObject;
	recommend: ActionCreatorsMapObject;
}

const AppPC: FC<AppProps> = ({
	title,
	description,
	member,
	search,
	recommend,
	goodsRankData,
	categoryData,
}): JSX.Element => {
	const location = useLocation();
	const isDesktop = useIsDesktop();
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
						member={member}
					/>
				)}
				<AppSearchPC
					title={title}
					description={description}
					search={search}
					recommend={recommend}
					goodsRankData={goodsRankData}
				/>
			</Box>
			<AppHeaderMenu
				scrolled={scrolled}
				title={title}
				description={description}
				search={search}
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
	);
};

const AppMobile: FC<AppProps> = ({
	title,
	description,
	member,
	search,
	recommend,
	goodsRankData,
	categoryData,
}): JSX.Element => {
	const isDesktop = useIsDesktop();
	return (
		<>
			{isDesktop && (
				<AppHeader
					width={'100%'}
					title={title}
					description={description}
					member={member}
				/>
			)}
			{/* {isMobile && <AppHeaderBar description={description} />} */}
			<AppSearchMobile
				title={title}
				description={description}
				search={search}
				recommend={recommend}
				goodsRankData={goodsRankData}
			/>
			<AppMenuMobile
				title={title}
				description={description}
				categoryData={categoryData}
			/>
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
	member,
	menu,
	goods,
	category,
	search,
	recommend,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const dispatch = useDispatch();
	const [index, setIndex] = useState<number>(0);
	const menuData = useGroupMenuList({ menuType: 0, menu });
	const goodsRankData = useGoodsRankList({ count: 10, goods });
	const categoryData = useCategoryGroupList({ category });

	useEffect(() => {
		dispatch(menuLotate(menuData)); // 메뉴 변경 : admin → user
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
	}, [dispatch, index, setIndex, menuData]);

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
				{isDesktop && (
					<AppPC
						title={title}
						description={description}
						member={member}
						search={search}
						recommend={recommend}
						goodsRankData={goodsRankData}
						categoryData={categoryData}
					/>
				)}
				{isMobile && (
					<AppMobile
						title={title}
						description={description}
						member={member}
						search={search}
						recommend={recommend}
						goodsRankData={goodsRankData}
						categoryData={categoryData}
					/>
				)}
				<AppMain>{children || <Outlet />}</AppMain>
				<AppFooter
					width={drawerMenuWidth}
					title={title}
					description={description}
					search={search}
					recommend={recommend}
					goodsRankData={goodsRankData}
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
	member: bindActionCreators(Api.member, dispatch),
	menu: bindActionCreators(Api.menu, dispatch),
	goods: bindActionCreators(Api.goods, dispatch),
	category: bindActionCreators(Api.category, dispatch),
	search: bindActionCreators(Api.search, dispatch),
	recommend: bindActionCreators(Api.recommend, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
