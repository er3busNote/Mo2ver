import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubMenuInfo } from '@/types/store';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import goToMenu from '@navigate/menu/goToMenu';
import MenuDivider from '@components/divider/MenuDivider';

interface AppMenuProps {
	title: string;
	description: string;
	menus: Array<SubMenuInfo>;
}

const AppMenu: FC<AppMenuProps> = ({
	title,
	description,
	menus,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const activeMenuClick = (
		nextTitle: string,
		nextDescription: string,
		path: string
	) => {
		goToMenu({
			title: nextTitle,
			description: nextDescription,
			prevTitle: title,
			prevDescription: description,
			path,
			dispatch,
			navigate,
		});
	};

	return (
		<>
			{menus.map((menu: SubMenuInfo, index: number) => (
				<Grid item key={index}>
					<Grid container spacing={1}>
						<Grid item>
							<Box
								sx={{
									px: { xs: '12px', sm: '20px' },
									py: { xs: '6px', sm: '10px' },
								}}
							>
								<IconButton
									disableRipple
									onClick={() =>
										activeMenuClick(menu.name, menu.description, menu.path)
									}
									sx={{ p: 0 }}
								>
									<Typography
										color="#000"
										align="center"
										sx={{
											fontSize: { xs: '13px', sm: '15px' },
											fontWeight: 'bold',
										}}
									>
										{menu.description}
									</Typography>
								</IconButton>
							</Box>
						</Grid>
						<MenuDivider />
					</Grid>
				</Grid>
			))}
		</>
	);
};

export default AppMenu;
