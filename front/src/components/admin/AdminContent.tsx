import React, { FC, useState, useEffect, ReactElement } from 'react';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { menuLotate } from '../../store/index';
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

const AdminContent: FC<AdminProps> = ({ children }): JSX.Element => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(menuLotate('admin'));
	}, [dispatch]);

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ flexDirection: 'column' }}>
				<CssBaseline />
				<AdminPC>{children}</AdminPC>
				<AdminMobile>{children}</AdminMobile>
				<AdminFooter />
			</Box>
		</ThemeProvider>
	);
};

export default AdminContent;
