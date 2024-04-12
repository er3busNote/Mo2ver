import React, { FC, useState, useEffect, ReactElement } from 'react';
import { Outlet } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import { changePrev, changePrevNext, menuLotate } from '../../store/index';
import { TitleState } from '../../store/types';
import AdminHeader from './AdminHeader';
import AdminMenuPC from './AdminMenuPC';
import AdminMenuMobile from './AdminMenuMobile';
import AdminMain from './AdminMain';
import AdminFooter from './AdminFooter';
import { CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { adminTheme } from '../../utils/theme';
import { useMediaQuery } from 'react-responsive';

const mdTheme = createTheme(adminTheme);

const drawerMenuLimit = 768;
const drawerMenuWidth = 200;

interface AdminProps {
	children?: ReactElement;
}

interface LayoutDefaultProps {
	title: string;
	description: string;
	children?: ReactElement;
}

const AdminPC: FC<AdminProps> = ({ children }): JSX.Element => {
	const [open, setOpen] = useState(true);
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<>
					<AdminHeader isMobile={false} open={open} setOpen={setOpen} />
					<Box sx={{ display: 'flex' }}>
						<AdminMenuPC
							open={open}
							setOpen={setOpen}
							width={drawerMenuWidth}
						/>
						<AdminMain>{children || <Outlet />}</AdminMain>
					</Box>
				</>
			)}
		</>
	);
};

const AdminMobile: FC<AdminProps> = ({ children }): JSX.Element => {
	const [open, setOpen] = useState(true);
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
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
			)}
		</>
	);
};

const AdminContent: FC<LayoutDefaultProps> = ({
	title,
	description,
	children,
}): JSX.Element => {
	const dispatch = useDispatch();
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
				<AdminPC>{children}</AdminPC>
				<AdminMobile>{children}</AdminMobile>
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
