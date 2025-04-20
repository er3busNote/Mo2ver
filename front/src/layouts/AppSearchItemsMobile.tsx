import React, {
	FC,
	useState,
	Dispatch,
	SetStateAction,
	ChangeEvent,
	KeyboardEvent,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@api/types';
import { isAuthenticated, isAdmin } from '@utils/jwttoken';
import useSearchGoodsList from '@hooks/search/useSearchGoodsList';
import useRecommendRankList from '@hooks/recommend/useRecommendRankList';
import {
	Box,
	Paper,
	Drawer,
	Breadcrumbs,
	Typography,
	Collapse,
	InputBase,
	IconButton,
	MenuList,
	MenuItem,
	ListItemText,
} from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { isEmpty } from 'lodash';

const drawerSearchLimit = 600;
const drawerSearchWidth = 250;
const drawerSearchHeight = 480;

const RecommendButton = styled(Button)<ButtonProps>(({ theme }) => ({
	boxShadow: 'none',
	textTransform: 'none',
	fontSize: 10,
	padding: '6px 12px',
	border: '1px solid',
	lineHeight: 1.5,
	color: theme.palette.getContrastText(purple[500]),
	backgroundColor: purple[500],
	'&:hover': {
		backgroundColor: purple[700],
	},
}));

interface SearchProps {
	base: SxProps<Theme>;
	header: SxProps<Theme>;
}

interface SearchGoodsProps {
	base: SxProps<Theme>;
	header: SxProps<Theme>;
	goodsData: Array<GoodsData>;
}

interface AppSearchItemsMobileProps {
	search: ActionCreatorsMapObject;
	recommend: ActionCreatorsMapObject;
	openSearch: boolean;
	setSearchOpen: Dispatch<SetStateAction<boolean>>;
	goodsRankData: Array<GoodsData>;
}

const SearchRecent: FC<SearchProps> = ({ base, header }): JSX.Element => {
	return (
		<Paper sx={base}>
			<Typography variant="h2" align="center" sx={header}>
				최근 검색어
			</Typography>
			<Box>
				<Box sx={{ pt: 3, display: 'flex', justifyContent: 'center' }}>
					<IconButton>
						<ErrorIcon color="disabled" sx={{ fontSize: 70 }} />
					</IconButton>
				</Box>
				<Typography
					color="#999"
					align="center"
					sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}
				>
					최근 검색 내역이 없습니다.
				</Typography>
				<Box
					sx={{
						width: drawerSearchWidth - 30,
						bottom: 0,
						position: 'absolute',
						padding: '10px',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<IconButton>
						<DeleteIcon fontSize="small" />
						<Typography
							color="#999"
							align="center"
							sx={{ pl: 1, fontSize: '0.7rem', fontWeight: 'bold' }}
						>
							전체 삭제
						</Typography>
					</IconButton>
				</Box>
			</Box>
		</Paper>
	);
};

const SearchPopular: FC<SearchGoodsProps> = ({
	base,
	header,
	goodsData,
}): JSX.Element => {
	return (
		<Paper sx={base}>
			<Typography variant="h2" align="center" sx={header}>
				인기 상품
			</Typography>
			<Box>
				<MenuList sx={{ px: 0.5, pt: 0.2, pb: 0.2 }}>
					{goodsData &&
						goodsData.map((data: GoodsData, index: number) => (
							<MenuItem key={index} dense>
								<Box
									sx={{
										px: 1,
										py: 1,
										width: '100%',
										borderBottom: '1px solid #EAEAEA',
									}}
								>
									<Breadcrumbs separator="" aria-label="breadcrumb">
										<ListItemText
											primaryTypographyProps={{
												style: { fontSize: 14, fontWeight: 500 },
											}}
											primary={index + 1}
										/>
										<ListItemText
											primaryTypographyProps={{
												sx: {
													fontSize: 14,
													fontWeight: 'bold',
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													maxWidth: 150,
													display: 'block',
												},
											}}
											primary={data.goodsName}
										/>
									</Breadcrumbs>
								</Box>
							</MenuItem>
						))}
				</MenuList>
			</Box>
		</Paper>
	);
};

const SearchRecommend: FC<SearchGoodsProps> = ({
	base,
	header,
	goodsData,
}): JSX.Element => {
	return (
		<Paper sx={base}>
			<Typography variant="h2" align="center" sx={header}>
				추천 상품
			</Typography>
			<Box sx={{ p: 2 }}>
				{isAuthenticated() &&
					!isAdmin() &&
					!isEmpty(goodsData) &&
					goodsData.map((data: GoodsData, index: number) => (
						<RecommendButton key={index} variant="outlined">
							{data.goodsName}
						</RecommendButton>
					))}
			</Box>
		</Paper>
	);
};

const AppSearchItemsMobile: FC<AppSearchItemsMobileProps> = ({
	search,
	recommend,
	openSearch,
	setSearchOpen,
	goodsRankData,
}): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [userInput, setUserInput] = useState('');
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

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		if (text === '') {
			setFocus(false);
			setOpen(false);
		} else {
			// fetchData(0, text); // 초기화
			setFocus(true);
			setOpen(true);
		}
		setUserInput(text);
		setKeywordData(text);
	};
	const searchOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			setOpen(false);
			event.preventDefault();
		}
	};

	const cancelClick = () => {
		setUserInput('');
		setKeywordData('');
		setFocus(false);
		setOpen(false);
	};

	const toggleDrawer = () => {
		setSearchOpen(!openSearch);
	};

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
	const searchBase: SxProps<Theme> = {
		width: drawerSearchWidth,
		height: drawerSearchHeight,
		border: '1px solid #ddd',
	};
	const searchHeader: SxProps<Theme> = {
		color: '#222',
		fontSize: '0.9rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#F8F8F8',
	};

	return (
		<Drawer anchor={'top'} open={openSearch} onClose={toggleDrawer}>
			<Box sx={{ height: drawerSearchLimit }}>
				<Box
					sx={{
						pt: 2,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Collapse orientation="horizontal" in={focus} collapsedSize={150}>
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
									height: '35px',
								}}
							>
								<InputBase
									sx={inputBase}
									placeholder="무슨 옷 입을까?"
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
						</Box>
					</Collapse>
				</Box>
				<Box sx={{ pt: 4, px: 4 }}>
					<Swiper
						slidesPerView={'auto'}
						centeredSlides={true}
						loop={true}
						pagination={{ clickable: true }}
						modules={[Pagination]}
						className="searchSwiper"
					>
						<SwiperSlide>
							<SearchRecent base={searchBase} header={searchHeader} />
						</SwiperSlide>
						<SwiperSlide>
							<SearchPopular
								base={searchBase}
								header={searchHeader}
								goodsData={goodsRankData}
							/>
						</SwiperSlide>
						<SwiperSlide>
							<SearchRecommend
								base={searchBase}
								header={searchHeader}
								goodsData={recommendRankData}
							/>
						</SwiperSlide>
					</Swiper>
				</Box>
			</Box>
		</Drawer>
	);
};

export default AppSearchItemsMobile;
