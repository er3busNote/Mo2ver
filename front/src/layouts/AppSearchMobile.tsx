import React, { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import AppSearchItemsMobile from './AppSearchItemsMobile';
import { GoodsData } from '@api/types';
import { isAuthenticated, isAdmin } from '@utils/jwttoken';
import useSearchGoodsList from '@hooks/search/useSearchGoodsDebounceList';
import useRecommendRankList from '@hooks/recommend/useRecommendRankList';
import {
	Box,
	Grid,
	Paper,
	Divider,
	Typography,
	Popper,
	Collapse,
	InputBase,
	IconButton,
	MenuList,
	MenuItem,
	ListItemText,
	ListItemButton,
} from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { SxProps, Theme } from '@mui/material/styles';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import goToGoodsSearch from '@navigate/goods/goToGoodsSearch';
import { useIsMobile } from '@context/MobileContext';
import MainIcon from '@components/MainIcon';
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

const SearchDivider: FC = (): JSX.Element => {
	return (
		<Box sx={{ lineHeight: '20px' }}>
			<Divider
				orientation="vertical"
				variant="middle"
				sx={{
					ml: '5px',
					mb: '1px',
					height: '0.6rem',
					borderColor: '#E1E3E3',
				}}
			/>
		</Box>
	);
};

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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [userInput, setUserInput] = useState('');
	const [openSearch, setSearchOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const { setKeywordData } = useSearchGoodsList({
		search,
		keyword,
		setKeyword,
	});
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

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		if (text === '') {
			setFocus(false);
			closeAnchorEl();
		} else {
			setFocus(true);
			showAnchorEl(event);
		}
		setUserInput(text);
		setKeywordData(text);
	};
	const searchOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			closeAnchorEl();
			event.preventDefault();
			goToGoodsSearch({
				keyword: userInput,
				title: '검색',
				description: '검색',
				prevTitle: title,
				prevDescription: description,
				dispatch,
				navigate,
			});
		}
	};

	const cancelClick = () => {
		setUserInput('');
		setKeywordData('');
		setFocus(false);
		closeAnchorEl();
	};

	const toggleSearch = () => {
		setSearchOpen(!openSearch);
	};

	const searchFontSize = '12px';

	const icon: SxProps<Theme> = {
		fontSize: '1.6rem',
		color: '#72BAF5',
	};
	const inputBase: SxProps<Theme> = {
		ml: 1,
		pt: 0.5,
		flex: 1,
		fontSize: '0.8rem',
		height: { xs: '1.5rem', sm: '2rem' },
		'& input::placeholder': {
			fontSize: { xs: '13px', sm: '14px' },
		},
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
								<Collapse
									orientation="horizontal"
									in={focus}
									collapsedSize={150}
								>
									<AppSearchItemsMobile
										search={search}
										recommend={recommend}
										openSearch={openSearch}
										setSearchOpen={setSearchOpen}
										goodsRankData={goodsRankData}
									/>
									<Box>
										<Paper
											component="form"
											elevation={0}
											sx={{
												mr: 2,
												px: '10px',
												display: 'flex',
												alignItems: 'center',
												borderRadius: 5,
												bgcolor: '#F1F1F1',
												height: { xs: '35px', sm: '40px' },
											}}
										>
											<InputBase
												sx={inputBase}
												placeholder="무슨 옷 입을까?"
												onClick={toggleSearch}
												readOnly={true}
											/>
											<SearchIcon sx={icon} />
										</Paper>
									</Box>
								</Collapse>
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
									width: '420px',
									height: '40px',
									display: 'inline-flex',
									justifyContent: 'flex-end',
								}}
							>
								<Collapse
									orientation="horizontal"
									in={focus}
									collapsedSize={320}
								>
									<ClickAwayListener onClickAway={cancelClick}>
										<Box>
											<Paper
												component="form"
												elevation={0}
												sx={{
													mr: 2,
													px: '10px',
													display: 'flex',
													alignItems: 'center',
													borderRadius: 5,
													bgcolor: '#F1F1F1',
													height: { xs: '35px', sm: '40px' },
												}}
											>
												<InputBase
													sx={inputBase}
													placeholder="오늘 뭐 괜찮은 옷 있을까?"
													value={userInput}
													onChange={searchOnChange}
													onKeyPress={searchOnKeyPress}
												/>
												{focus ? (
													<IconButton
														onClick={cancelClick}
														sx={{ p: 0, mr: 1 }}
													>
														<ClearIcon sx={icon} />
													</IconButton>
												) : (
													<SearchIcon sx={icon} />
												)}
											</Paper>
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
								</Collapse>
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
										sx={{ fontSize: searchFontSize, fontWeight: 'bold' }}
									>
										추천상품
									</Typography>
								</Grid>
								{isEmpty(recommendRankData) ? (
									<Grid item>
										<Typography
											color="#999"
											align="center"
											sx={{ fontSize: searchFontSize }}
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
												sx={{ fontSize: searchFontSize }}
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
