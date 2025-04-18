import React, { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import { changeNext, menuActive } from '@store/index';
import { TitleInfo } from '@store/types';
import { GoodsData } from '@api/types';
import { isAuthenticated, isAdmin } from '@utils/jwttoken';
import useSearchGoodsList from '@hooks/search/useSearchGoodsList';
import useRecommendRankList from '@hooks/recommend/useRecommendRankList';
import {
	Box,
	Grid,
	Paper,
	Divider,
	SvgIcon,
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
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import MainIcon from '@assets/logo.svg?react';

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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [userInput, setUserInput] = useState('');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [data, setPage, setKeywordData] = useSearchGoodsList({
		search,
		keyword,
		setKeyword,
	});
	const recommendRankData = useRecommendRankList({
		count: 5,
		isAuthenticated: isAuthenticated() && !isAdmin(),
		recommend,
	});

	// (Diff) focus는 focusing하는 boolean값 ↔ open은 list를 출력하는 boolean값
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
			closeAnchorEl(); // → Popper Close
		} else {
			// fetchData(0, text); // 초기화
			setFocus(true);
			showAnchorEl(event); // Popper Open
		}
		setUserInput(text);
		setKeywordData(text);
	};
	const searchOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			closeAnchorEl(); // → Popper Close
			event.preventDefault();
		}
	};

	const cancelClick = () => {
		setUserInput('');
		setKeywordData('');
		setFocus(false);
		closeAnchorEl(); // → Popper 닫기
	};

	const activeClick = (
		nextTitle: string,
		nextDescription: string,
		path: string
	) => {
		const titleData: TitleInfo = {
			title: nextTitle,
			description: nextDescription,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive(path));
		navigate(path);
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
		height: '2rem',
		'& input::placeholder': {
			fontSize: '15px',
		},
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
						<IconButton
							onClick={() => activeClick('홈', '메인', '/')}
							sx={{ p: 0 }}
						>
							<SvgIcon
								component={MainIcon}
								color="primary"
								sx={{ width: '8em', height: '5em' }}
								inheritViewBox
							/>
						</IconButton>
					</Grid>
					<Grid item>
						<Collapse
							sx={{ pt: 6.5 }}
							orientation="horizontal"
							in={focus}
							collapsedSize={420}
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
											height: '40px',
											width: '420px',
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
											<IconButton onClick={cancelClick} sx={{ p: 0, mr: 1 }}>
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
						</Collapse>
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
											sx={{ fontSize: searchFontSize, fontWeight: 'bold' }}
										>
											추천상품
										</Typography>
									</Grid>
									{recommendRankData.length === 0 ? (
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
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default AppSearchPC;
