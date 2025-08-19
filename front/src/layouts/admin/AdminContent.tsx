import React, {
	FC,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	ReactElement,
	SyntheticEvent,
} from 'react';
import { Outlet } from 'react-router';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
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
import AdminHeader from './AdminHeader';
import AdminMenuPC from './AdminMenuPC';
import AdminMenuMobile from './AdminMenuMobile';
import AdminMain from './AdminMain';
import AdminFooter from './AdminFooter';
import {
	CssBaseline,
	Box,
	Alert,
	Snackbar,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import {
	unstable_createMuiStrictModeTheme as createTheme,
	ThemeProvider,
} from '@mui/material/styles';
import { adminTheme } from '@utils/theme';

const mdTheme = createTheme(adminTheme);

const drawerMenuWidth = 200;

interface AdminProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	children?: ReactElement;
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
}

const AdminPC: FC<AdminProps> = ({
	title,
	description,
	member,
	open,
	setOpen,
	children,
}): JSX.Element => {
	return (
		<>
			<AdminHeader
				title={title}
				description={description}
				member={member}
				isMobile={false}
				open={open}
				setOpen={setOpen}
			/>
			<Box sx={{ display: 'flex' }}>
				<AdminMenuPC open={open} setOpen={setOpen} width={drawerMenuWidth} />
				<AdminMain>{children || <Outlet />}</AdminMain>
			</Box>
		</>
	);
};

const AdminMobile: FC<AdminProps> = ({
	title,
	description,
	member,
	open,
	setOpen,
	children,
}): JSX.Element => {
	return (
		<>
			<AdminHeader
				title={title}
				description={description}
				member={member}
				isMobile={true}
				open={open}
				setOpen={setOpen}
			/>
			<Box sx={{ display: 'flex' }}>
				<AdminMenuMobile
					open={open}
					setOpen={setOpen}
					width={drawerMenuWidth}
				/>
				<AdminMain>{children || <Outlet />}</AdminMain>
			</Box>
		</>
	);
};

const AdminContent: FC<LayoutDefaultProps> = ({
	title,
	description,
	open,
	type,
	message,
	children,
	member,
	menu,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const dispatch = useDispatch();
	const [menuOpen, setMenuOpen] = useState<boolean>(true);
	const [index, setIndex] = useState<number>(0);
	const menuData = useGroupMenuList({ menuType: 1, menu });

	useEffect(() => {
		dispatch(menuLotate(menuData)); // 메뉴 변경 : user → admin
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
			<Box sx={{ flexDirection: 'column' }}>
				<CssBaseline />
				{isDesktop && (
					<AdminPC
						title={title}
						description={description}
						member={member}
						open={menuOpen}
						setOpen={setMenuOpen}
					>
						{children}
					</AdminPC>
				)}
				{isMobile && (
					<AdminMobile
						title={title}
						description={description}
						member={member}
						open={menuOpen}
						setOpen={setMenuOpen}
					>
						{children}
					</AdminMobile>
				)}
				<AdminFooter title={title} description={description} />
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
					variant="filled"
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

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	menu: bindActionCreators(Api.menu, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent);
