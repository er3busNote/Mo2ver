import React, { FC, useState, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import AppSearchItemsMobile from './AppSearchItemsMobile';
import { GoodsData } from '@api/types';
import { isAuthenticated, isAdmin } from '@utils/jwttoken';
import useRecommendRankList from '@hooks/recommend/useRecommendRankList';
import {
	Box,
	Grid,
	Paper,
	Typography,
	Popper,
	IconButton,
	MenuList,
	MenuItem,
	ListItemText,
	ListItemButton,
} from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { useIsMobile } from '@context/MobileContext';
import SearchCard from '@components/card/SearchCard';
import SearchDivider from '@components/divider/SearchDivider';
import MainIcon from '@components/MainIcon';
import { fontSize_sm } from '@utils/style';
import { isEmpty } from 'lodash';

interface AppSearchProps {
	title: string;
	description: string;
	search: ActionCreatorsMapObject;
	recommend: ActionCreatorsMapObject;
	goodsRankData: Array<GoodsData>;
}

interface AppSearchItemsProps {
	goodsRankData: Array<GoodsData>;
}

const AppSearchItemsPC: FC<AppSearchItemsProps> = ({
	goodsRankData,
}): JSX.Element => {
	const [open, setOpen] = useState(false);
	const recentClick = () => {
		setOpen(false);
	};
	const popularClick = () => {
		setOpen(true);
	};
	return (
		<Box>
			<Box sx={{ bgcolor: '#F7F8F9', display: 'inline-flex' }}>
				<ListItemButton
					selected={!open}
					onClick={() => recentClick()}
					sx={{ '&.Mui-selected': { backgroundColor: '#fff' } }}
				>
					<ListItemText
						secondaryTypographyProps={{
							px: 3,
							fontSize: { xs: '11px', sm: '13px' },
						}}
						secondary={'최근검색어'}
					/>
				</ListItemButton>
				<ListItemButton
					selected={open}
					onClick={() => popularClick()}
					sx={{ '&.Mui-selected': { backgroundColor: '#fff' } }}
				>
					<ListItemText
						secondaryTypographyProps={{
							px: 3,
							fontSize: { xs: '11px', sm: '13px' },
						}}
						secondary={'인기상품'}
					/>
				</ListItemButton>
			</Box>
			<Box>
				<MenuList sx={{ px: 0.5, pt: 0.2, pb: 0.2 }}>
					{open &&
						goodsRankData.map((data: GoodsData, index: number) => (
							<MenuItem
								key={index}
								dense
								sx={{
									px: 2,
									minHeight: 20,
								}}
							>
								<ListItemText
									primaryTypographyProps={{
										sx: {
											fontSize: 12,
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											maxWidth: 200,
											display: 'block',
										},
									}}
									primary={index + 1 + '. ' + data.goodsName}
								/>
							</MenuItem>
						))}
				</MenuList>
			</Box>
			<Paper
				sx={{
					bgcolor: '#F7F8F9',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<IconButton sx={{ p: 0 }}>
					<Typography
						color="#000"
						align="center"
						sx={{ p: 1, fontSize: { xs: '12px', sm: '13px' } }}
					>
						최근검색어 전체 삭제
					</Typography>
				</IconButton>
				<IconButton sx={{ p: 0 }}>
					<Typography
						color="#000"
						align="center"
						sx={{ p: 1, fontSize: { xs: '12px', sm: '13px' } }}
					>
						닫기
					</Typography>
				</IconButton>
			</Paper>
		</Box>
	);
};

const AppSearchMobile: FC<AppSearchProps> = ({
	title,
	description,
	search,
	recommend,
	goodsRankData,
}): JSX.Element => {
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);
	const [openSearch, setSearchOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const recommendRankData = useRecommendRankList({
		count: 5,
		isAuthenticated: isAuthenticated() && !isAdmin(),
		recommend,
	});

	const showAnchorEl = (event: ChangeEvent<HTMLInputElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};
	const closeAnchorEl = () => {
		setAnchorEl(null);
		setOpen(false);
	};

	const cancelClick = () => {
		closeAnchorEl();
	};

	const toggleSearch = () => {
		setSearchOpen(!openSearch);
	};

	return (
		<Paper sx={{ width: '100%' }} component="div" square variant="outlined">
			{isMobile ? (
				<Box>
					<Grid container>
						<Grid item sx={{ mt: -2.5, width: '60%', height: '100px' }}>
							<MainIcon title={title} description={description} />
						</Grid>
						<Grid
							item
							sx={{
								pb: 3,
								display: 'grid',
								justifyContent: 'center',
								width: '40%',
							}}
						>
							<Box
								sx={{
									mt: 3,
									mb: -1,
									width: '160px',
									height: '55px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<AppSearchItemsMobile
									title={title}
									description={description}
									search={search}
									recommend={recommend}
									openSearch={openSearch}
									setSearchOpen={setSearchOpen}
									goodsRankData={goodsRankData}
								/>
								<Box>
									<SearchCard
										title={title}
										description={description}
										search={search}
										toggleSearch={toggleSearch}
										readOnly={true}
									/>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			) : (
				<Box>
					<Grid container>
						<Grid item sx={{ mt: -2.5, width: '100%', height: '100px' }}>
							<MainIcon title={title} description={description} />
						</Grid>
						<Grid
							item
							sx={{
								display: 'grid',
								justifyContent: 'center',
								width: '100%',
							}}
						>
							<Box
								sx={{
									height: '40px',
									display: 'inline-flex',
									justifyContent: 'flex-end',
								}}
							>
								<ClickAwayListener onClickAway={cancelClick}>
									<Box>
										<SearchCard
											title={title}
											description={description}
											search={search}
											showAnchorEl={showAnchorEl}
											closeAnchorEl={closeAnchorEl}
										/>
										<Popper
											id={'search'}
											open={open}
											anchorEl={anchorEl}
											placement="bottom-start"
											modifiers={[
												{
													name: 'offset',
													options: {
														offset: [-38, 3],
													},
												},
											]}
										>
											<Paper
												elevation={0}
												sx={{ mt: -1, border: '#ddd 1px solid' }}
											>
												<AppSearchItemsPC goodsRankData={goodsRankData} />
											</Paper>
										</Popper>
									</Box>
								</ClickAwayListener>
							</Box>
						</Grid>
					</Grid>
					<Box sx={{ pb: '10px' }}>
						{isAuthenticated() && !isAdmin() && recommendRankData && (
							<Grid
								container
								spacing={1}
								sx={{ justifyContent: 'center', width: '100%' }}
							>
								<Grid item>
									<Typography
										color="#666"
										align="center"
										sx={{ fontSize: fontSize_sm, fontWeight: 'bold' }}
									>
										추천상품
									</Typography>
								</Grid>
								{isEmpty(recommendRankData) ? (
									<Grid item>
										<Typography
											color="#999"
											align="center"
											sx={{ fontSize: fontSize_sm }}
										>
											추천상품이 없습니다.
										</Typography>
									</Grid>
								) : (
									recommendRankData &&
									recommendRankData.map((data: GoodsData, index: number) => (
										<Grid key={index} item sx={{ display: 'flex' }}>
											<Typography
												color="#999"
												align="center"
												sx={{ fontSize: fontSize_sm }}
											>
												{data.goodsName}
											</Typography>
											{recommendRankData.length - 1 > index && (
												<SearchDivider />
											)}
										</Grid>
									))
								)}
							</Grid>
						)}
					</Box>
				</Box>
			)}
		</Paper>
	);
};

export default AppSearchMobile;
