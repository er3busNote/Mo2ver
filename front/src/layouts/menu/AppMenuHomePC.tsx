import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { SubMenuInfo, MenuState } from '@/types/api';
import AppMenu from './AppMenu';
import AppMenuItem from './AppMenuItem';
import AppMenuSubItem from './AppMenuSubItem';
import {
	Box,
	Grid,
	Paper,
	MenuList,
	IconButton,
	Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import {
	SxProps,
	Theme,
	createTheme,
	ThemeProvider,
} from '@mui/material/styles';
import { CategoryData, CategoryDataGroup } from '@/types/api';
import goToGoodsCategory from '@navigate/goods/goToGoodsCategory';
import { divideArray } from '@utils/divide';
import { submenuWidthSize } from '@utils/style';
import { has } from 'lodash';

const menuFontSize = '15px';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

interface AppMenuProps {
	title: string;
	description: string;
	categoryData: CategoryDataGroup;
	menus?: Array<SubMenuInfo>;
}

const AppDetail: FC<AppMenuProps> = ({
	title,
	description,
	categoryData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const largeCategoryData = categoryData.largeCategoryData;
	const middleCategoryData = categoryData.middleCategoryData;
	const smallCategoryData = categoryData.smallCategoryData;
	const [hover, setHover] = useState<string>('');

	// 중 카테고리 → 3등분
	let divideData: Array<Array<CategoryData>> = [[], [], []];
	if (hover !== '' && middleCategoryData && has(middleCategoryData, hover)) {
		divideData = divideArray(middleCategoryData[hover], 3);
	}

	const onMouseLeave = () => {
		setHover('');
	};

	const menuClick = (nextTitle: string, code: string, type: string) => {
		goToGoodsCategory({
			code,
			type,
			title: nextTitle,
			description: nextTitle,
			prevTitle: title,
			prevDescription: description,
			dispatch,
			navigate,
		});
	};

	const menu: SxProps<Theme> = {
		mt: '7px',
		ml: '-41px',
		position: 'absolute',
		zIndex: 1,
	};
	const overflowParent: SxProps<Theme> = {
		overflow: 'hidden',
		height: '100%',
	};
	return (
		<Box sx={{ px: '40px', pt: '12px', pb: '8px', bgcolor: '#EBEBEB' }}>
			<IconButton
				disableRipple
				sx={{ p: 0, mt: -1, color: 'secondary.main' }}
				disabled
			>
				<MenuIcon sx={{ color: '#86868A' }} />
				<Typography
					color="#000"
					align="center"
					sx={{ pl: '10px', fontSize: menuFontSize, fontWeight: 'bold' }}
				>
					전체 카테고리
				</Typography>
			</IconButton>
			<Box id={'main-menu'} sx={menu} onMouseLeave={onMouseLeave}>
				<Box
					sx={{
						mt: '1px',
						display: 'inline-flex',
						justifyContent: 'flex-start',
						...overflowParent,
					}}
				>
					<Box sx={{ width: submenuWidthSize }}>
						<ThemeProvider theme={darkTheme}>
							<MenuList sx={{ px: 0, pt: 0.2, pb: 0.2 }}>
								{largeCategoryData.map((data: CategoryData, index: number) => (
									<AppMenuItem
										key={index}
										setHover={setHover}
										menuClick={menuClick}
										categoryCode={data.categoryCode}
										categoryName={data.categoryName}
										isMain={true}
									/>
								))}
							</MenuList>
						</ThemeProvider>
					</Box>
					<AppMenuSubItem
						title={title}
						description={description}
						divideData={divideData}
						middleCategoryData={middleCategoryData}
						smallCategoryData={smallCategoryData}
						hover={hover}
					/>
				</Box>
			</Box>
		</Box>
	);
};

const AppMenuHomePC: FC<AppMenuProps> = ({
	title,
	description,
	categoryData,
	menus,
}): JSX.Element => {
	return (
		<Paper sx={{ width: '100%' }} component="div" square variant="outlined">
			<Box
				sx={{
					width: '950px',
					display: 'inline-flex',
					justifyContent: 'flex-start',
				}}
			>
				<Grid container spacing={1}>
					<Grid item>
						<AppDetail
							title={title}
							description={description}
							categoryData={categoryData}
						/>
					</Grid>
					{menus && (
						<AppMenu title={title} description={description} menus={menus} />
					)}
				</Grid>
			</Box>
		</Paper>
	);
};

const mapStateToProps = (state: any) => ({
	menus: (state.menu as MenuState).menus,
});

export default connect(mapStateToProps, null)(AppMenuHomePC);
