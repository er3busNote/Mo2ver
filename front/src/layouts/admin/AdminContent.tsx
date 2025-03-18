import React, {
	FC,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	ReactElement,
} from 'react';
import { Outlet } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import { changePrev, changePrevNext, menuLotate } from '@store/index';
import { TitleState } from '@store/types';
import AdminHeader from './AdminHeader';
import AdminMenuPC from './AdminMenuPC';
import AdminMenuMobile from './AdminMenuMobile';
import AdminMain from './AdminMain';
import AdminFooter from './AdminFooter';
import { CssBaseline, Box, useTheme, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { adminTheme } from '@utils/theme';

const mdTheme = createTheme(adminTheme);

const drawerMenuWidth = 200;

interface AdminProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	children?: ReactElement;
}

interface LayoutDefaultProps {
	title: string;
	description: string;
	children?: ReactElement;
}

const AdminPC: FC<AdminProps> = ({ open, setOpen, children }): JSX.Element => {
	return (
		<>
			<AdminHeader isMobile={false} open={open} setOpen={setOpen} />
			<Box sx={{ display: 'flex' }}>
				<AdminMenuPC open={open} setOpen={setOpen} width={drawerMenuWidth} />
				<AdminMain>{children || <Outlet />}</AdminMain>
			</Box>
		</>
	);
};

const AdminMobile: FC<AdminProps> = ({
	open,
	setOpen,
	children,
}): JSX.Element => {
	return (
		<>
			<AdminHeader isMobile={true} open={open} setOpen={setOpen} />
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
	children,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const dispatch = useDispatch();
	const [open, setOpen] = useState<boolean>(true);
	const [index, setIndex] = useState<number>(0);

	useEffect(() => {
		dispatch(menuLotate('admin')); // 메뉴 변경 : user → admin
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

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ flexDirection: 'column' }}>
				<CssBaseline />
				{isDesktop && (
					<AdminPC open={open} setOpen={setOpen}>
						{children}
					</AdminPC>
				)}
				{isMobile && (
					<AdminMobile open={open} setOpen={setOpen}>
						{children}
					</AdminMobile>
				)}
				<AdminFooter title={title} description={description} />
			</Box>
		</ThemeProvider>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(AdminContent);
