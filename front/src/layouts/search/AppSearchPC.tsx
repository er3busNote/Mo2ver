import React, { FC, useState, ChangeEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@/types/api';
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

const AppSearchItems: FC<AppSearchItemsProps> = ({
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
						secondaryTypographyProps={{ px: 3, fontSize: '14px' }}
						secondary={'최근검색어'}
					/>
				</ListItemButton>
				<ListItemButton
					selected={open}
					onClick={() => popularClick()}
					sx={{ '&.Mui-selected': { backgroundColor: '#fff' } }}
				>
					<ListItemText
						secondaryTypographyProps={{ px: 3, fontSize: '14px' }}
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
											fontSize: 13,
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											maxWidth: 220,
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
						sx={{ p: 1, fontSize: '14px' }}
					>
						최근검색어 전체 삭제
					</Typography>
				</IconButton>
				<IconButton sx={{ p: 0 }}>
					<Typography
						color="#000"
						align="center"
						sx={{ p: 1, fontSize: '14px' }}
					>
						닫기
					</Typography>
				</IconButton>
			</Paper>
		</Box>
	);
};

const AppSearchPC: FC<AppSearchProps> = ({
	title,
	description,
	search,
	recommend,
	goodsRankData,
}): JSX.Element => {
	const [open, setOpen] = useState(false);
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

	return (
		<Paper sx={{ width: '100%' }} component="div" square variant="outlined">
			<Box
				sx={{
					width: '950px',
					display: 'inline-flex',
					justifyContent: 'space-between',
				}}
			>
				<Grid container spacing={10}>
					<Grid item>
						<MainIcon title={title} description={description} />
					</Grid>
					<Grid item>
						<ClickAwayListener onClickAway={cancelClick}>
							<Box sx={{ pt: 6.5 }}>
								<SearchCard
									title={title}
									description={description}
									search={search}
									showAnchorEl={showAnchorEl}
									closeAnchorEl={closeAnchorEl}
									width="420px"
								/>
								<Popper
									id={'search'}
									open={open}
									anchorEl={anchorEl}
									placement="bottom-start"
								>
									<Paper
										elevation={0}
										sx={{ mt: -1, ml: 8, border: '#ddd 1px solid' }}
									>
										<AppSearchItems goodsRankData={goodsRankData} />
									</Paper>
								</Popper>
							</Box>
						</ClickAwayListener>
						<Box
							sx={{
								ml: '-20px',
								width: '420px',
								display: 'inline-flex',
								justifyContent: 'flex-end',
							}}
						>
							{isAuthenticated() && !isAdmin() && recommendRankData && (
								<Grid container spacing={1} sx={{ width: 400 }}>
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
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default AppSearchPC;
