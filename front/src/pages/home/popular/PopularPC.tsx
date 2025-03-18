import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActive } from '@store/index';
import ButtonTag from '@components/button/ButtonTag';
import {
	Box,
	Card,
	Grid,
	Fade,
	Chip,
	IconButton,
	CardMedia,
	Typography,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';

const SLIDE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

interface PopularProps {
	bannerDisplayData: Record<string, Record<string, Array<object>>>;
}

interface CarouselFadeProps {
	url: string;
}

const CarouselFade: FC<CarouselFadeProps> = ({ url }): JSX.Element => {
	return (
		<Card
			sx={{
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<CardMedia
				sx={{ height: '395px' }}
				component="img"
				image={url}
				alt="Image"
			/>
		</Card>
	);
};

const PopularPC: FC<PopularProps> = ({ bannerDisplayData }): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [displayIndex, setDisplayIndex] = useState(0);
	const [fadeIn, setFadeIn] = useState(true);
	const content = SLIDE_INFO[displayIndex];
	const numSlides = SLIDE_INFO.length;

	const bannerDisplayMenu = Object.keys(bannerDisplayData);

	const onAutoFadeIn = (newIndex: number) => {
		setTimeout(() => {
			setDisplayIndex(newIndex);
			setFadeIn(true);
		}, 300);
	};

	useEffect(() => {
		const rotation = setInterval(() => {
			const newIndex = (displayIndex + 1 + numSlides) % numSlides;
			setFadeIn(false);
			onAutoFadeIn(newIndex);
		}, 5000);
		return () => clearInterval(rotation);
	}, [displayIndex, setDisplayIndex, setFadeIn, onAutoFadeIn]);

	const goodsClick = (code: string) => {
		//dispatch(menuActive('/goods/' + code + '/detail'));
		//navigate('/goods/' + code + '/detail');
	};

	const displayMenu: SxProps<Theme> = {
		mt: 1,
		mb: 1.5,
	};
	const chip: SxProps<Theme> = {
		whiteSpace: 'nowrap',
	};
	const label: SxProps<Theme> = {
		fontSize: '0.8rem',
	};
	const info: SxProps<Theme> = {
		fontSize: '0.9rem',
		fontWeight: 'bold',
	};

	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
				<Typography
					variant="subtitle2"
					sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}
				>
					카테고리별
				</Typography>
				<Typography
					variant="subtitle2"
					sx={{
						pl: 2,
						fontSize: '1.3rem',
						fontWeight: 'bold',
						color: '#4583FF',
					}}
				>
					추천 상품
				</Typography>
			</Box>
			{bannerDisplayMenu.length > 0 && (
				<Box sx={displayMenu}>
					<Swiper
						slidesPerView={10}
						spaceBetween={8}
						freeMode={true}
						grabCursor={true}
						className="displaySwiper"
					>
						{bannerDisplayMenu.map((type, index) => (
							<SwiperSlide key={index}>
								<Chip
									label={type}
									sx={chip}
									clickable
									color="primary"
									size="medium"
									onClick={() => setDisplayIndex(index)}
									variant={displayIndex === index ? 'filled' : 'outlined'}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</Box>
			)}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					borderTop: '2px solid #5868be',
					borderBottom: '1px solid #ddd',
					height: '100%',
				}}
			>
				<Box sx={{ width: '20%' }}>
					<Box>
						<Typography
							variant="subtitle2"
							sx={{
								pt: 8,
								fontSize: '1.3rem',
								fontWeight: 'bold',
								color: '#1992DF',
							}}
						>
							남성패션
						</Typography>
					</Box>
					<Box sx={{ pt: 14, px: 7, display: 'grid' }}>
						<Grid container spacing={1}>
							<Grid item>
								<Typography
									variant="subtitle2"
									sx={{
										fontSize: '1.0rem',
										fontWeight: 'bold',
									}}
								>
									HOT 키워드
								</Typography>
							</Grid>
							<Grid item>
								<ButtonTag buttonType="popular" device="pc" variant="outlined">
									#반팔 티셔츠
								</ButtonTag>
							</Grid>
							<Grid item>
								<ButtonTag buttonType="popular" device="pc" variant="outlined">
									#반바지
								</ButtonTag>
							</Grid>
							<Grid item>
								<ButtonTag buttonType="popular" device="pc" variant="outlined">
									#리넨 팬츠
								</ButtonTag>
							</Grid>
							<Grid item>
								<ButtonTag buttonType="popular" device="pc" variant="outlined">
									#슬리퍼
								</ButtonTag>
							</Grid>
							<Grid item>
								<ButtonTag buttonType="popular" device="pc" variant="outlined">
									#카드지갑
								</ButtonTag>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Box sx={{ width: '30%' }}>
					<Fade in={fadeIn}>
						<Box>
							<CarouselFade url={content} />
						</Box>
					</Fade>
				</Box>
				<Box sx={{ width: '50%' }}>
					<Box sx={{ borderBottom: '1px solid #ddd' }}>
						<Grid container spacing={1} justifyContent="center" sx={{ pt: 2 }}>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									onClick={() => goodsClick(String(displayIndex))}
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={label}>
										남성상의
									</Typography>
									<Typography variant="subtitle2" sx={info}>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									onClick={() => goodsClick(String(displayIndex))}
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={label}>
										남성상의
									</Typography>
									<Typography variant="subtitle2" sx={info}>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									onClick={() => goodsClick(String(displayIndex))}
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={label}>
										남성상의
									</Typography>
									<Typography variant="subtitle2" sx={info}>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
						</Grid>
					</Box>
					<Box>
						<Grid container spacing={1} justifyContent="center" sx={{ pt: 2 }}>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									onClick={() => goodsClick(String(displayIndex))}
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={label}>
										남성상의
									</Typography>
									<Typography variant="subtitle2" sx={info}>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									onClick={() => goodsClick(String(displayIndex))}
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={label}>
										남성상의
									</Typography>
									<Typography variant="subtitle2" sx={info}>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									onClick={() => goodsClick(String(displayIndex))}
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={label}>
										남성상의
									</Typography>
									<Typography variant="subtitle2" sx={info}>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default PopularPC;
