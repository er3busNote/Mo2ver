import React, {
	FC,
	useRef,
	useState,
	Dispatch,
	SetStateAction,
	FocusEvent,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@api/types';
import { isAuthenticated, isAdmin } from '@utils/jwttoken';
import useRecommendRankList from '@hooks/recommend/useRecommendRankList';
import {
	Box,
	Paper,
	Drawer,
	Breadcrumbs,
	Typography,
	Collapse,
	IconButton,
	MenuList,
	MenuItem,
	ListItemText,
} from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Error as ErrorIcon, Delete as DeleteIcon } from '@mui/icons-material';
import SearchCard from '@components/card/SearchCard';
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
	title: string;
	description: string;
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
	title,
	description,
	search,
	recommend,
	openSearch,
	setSearchOpen,
	goodsRankData,
}): JSX.Element => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [focus, setFocus] = useState(false);
	const recommendRankData = useRecommendRankList({
		count: 5,
		isAuthenticated: isAuthenticated() && !isAdmin(),
		recommend,
	});

	const handleFocus = () => setFocus(true);
	const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
		const nextTarget = e.relatedTarget as HTMLElement | null;
		if (
			cardRef.current &&
			(!nextTarget || !cardRef.current.contains(nextTarget))
		) {
			setFocus(false);
		}
	};

	const toggleDrawer = () => {
		setSearchOpen(!openSearch);
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
						<Box
							ref={cardRef}
							tabIndex={-1} // 포커스 가능하도록
							onFocus={handleFocus}
							onBlur={handleBlur}
						>
							<SearchCard
								title={title}
								description={description}
								search={search}
							/>
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
