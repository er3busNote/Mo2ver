import React, { FC, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Grid,
	Paper,
	IconButton,
	Typography,
	Popper,
	MenuList,
	MenuItem,
	ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const menuFontSize = '16px';

const AppDetail: FC = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const showClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(open ? null : event.currentTarget);
		setOpen(!open);
	};
	return (
		<Box>
			<IconButton
				onClick={showClick}
				sx={{ p: 0, mt: -1, color: 'secondary.main' }}
			>
				<MenuIcon />
				<Typography color="#000" align="center" sx={{ fontSize: menuFontSize }}>
					전체 카테고리
				</Typography>
			</IconButton>
			<Popper open={open} anchorEl={anchorEl} placement="bottom-start">
				<Paper elevation={24}>
					<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
						<MenuItem dense sx={{ px: 1 }}>
							<ListItemText
								primaryTypographyProps={{ style: { fontSize: 11 } }}
								primary="세부정보"
							/>
						</MenuItem>
						<MenuItem dense sx={{ px: 1 }}>
							<ListItemText
								primaryTypographyProps={{ style: { fontSize: 11 } }}
								primary="삭제"
							/>
						</MenuItem>
					</MenuList>
				</Paper>
			</Popper>
		</Box>
	);
};

const AppMenu: FC = (): JSX.Element => {
	return (
		<Paper
			sx={{ width: '100%', bgcolor: '#F3F3F3' }}
			component="div"
			square
			variant="outlined"
		>
			<Box
				sx={{
					width: '950px',
					display: 'inline-flex',
					justifyContent: 'flex-start',
				}}
			>
				<Grid container spacing={1}>
					<Grid item>
						<AppDetail />
					</Grid>
					<Grid item>
						<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
							<Typography
								color="#000"
								align="center"
								sx={{ fontSize: menuFontSize }}
							>
								이벤트/기획전
							</Typography>
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
							<Typography
								color="#000"
								align="center"
								sx={{ fontSize: menuFontSize }}
							>
								견적문의
							</Typography>
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
							<Typography
								color="#000"
								align="center"
								sx={{ fontSize: menuFontSize }}
							>
								쿠폰존
							</Typography>
						</IconButton>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default AppMenu;
