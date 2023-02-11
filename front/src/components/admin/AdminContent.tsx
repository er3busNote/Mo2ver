import React, { FC, useState, ReactElement } from 'react';
import { Outlet } from 'react-router';
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';
import AdminMain from './AdminMain';
import AdminFooter from './AdminFooter';
import { CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { adminTheme } from '../../utils/theme';

const mdTheme = createTheme(adminTheme);

const drawerMenuWidth = 200;

interface LayoutDefaultProps {
	children?: ReactElement;
}

const AdminContent: FC<LayoutDefaultProps> = ({ children }): JSX.Element => {
	const [open, setOpen] = useState(true);
	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ flexDirection: 'column' }}>
				<CssBaseline />
				<AdminHeader />
				<Box sx={{ display: 'flex' }}>
					<AdminMenu open={open} setOpen={setOpen} width={drawerMenuWidth} />
					<AdminMain>{children || <Outlet />}</AdminMain>
				</Box>
				<AdminFooter />
			</Box>
		</ThemeProvider>
	);
};

export default AdminContent;
