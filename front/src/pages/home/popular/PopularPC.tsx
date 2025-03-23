import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeNext, menuActive } from '@store/index';
import { TitleInfo } from '@store/types';
import ButtonTag from '@components/button/ButtonTag';
import {
	Box,
	Card,
	Grid,
	Fade,
	//Chip,
	Tab,
	Tabs,
	Divider,
	IconButton,
	CardMedia,
	Typography,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
//import { Swiper, SwiperSlide } from 'swiper/react';
//import 'swiper/css';
//import 'swiper/css/free-mode';

const SLIDE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const KEYWORD_INFO: Array<string> = [
	'#반팔 티셔츠',
	'#반바지',
	'#리넨 팬츠',
	'#슬리퍼',
	'#카드지갑',
];

interface PopularProps {
	title: string;
	description: string;
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

const PopularPC: FC<PopularProps> = ({
	title,
	description,
	bannerDisplayData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [displayIndex, setDisplayIndex] = useState(0);
	const [fadeIn, setFadeIn] = useState(true);
	const content = SLIDE_INFO[displayIndex];
	const slideLength = SLIDE_INFO.length;

	const bannerDisplayMenu = Object.keys(bannerDisplayData);
	const bannerLength = bannerDisplayMenu.length;
	const numSlides = bannerLength > 0 ? bannerLength : slideLength;

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
		if (bannerLength > 0) {
			const titleData: TitleInfo = {
				title: title,
				description: description,
				prevTitle: title,
				prevDescription: description,
			};
			dispatch(changeNext(titleData));
			dispatch(menuActive('/goods/' + code + '/detail'));
			navigate('/goods/' + code + '/detail');
		}
	};

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setDisplayIndex(newValue);
	};

	const displayMenu: SxProps<Theme> = {
		//mt: 1,
		//mb: 1.5,
	};
	/*const chip: SxProps<Theme> = {
		whiteSpace: 'nowrap',
	};*/
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
			{bannerLength > 0 && (
				<Box sx={displayMenu}>
					{/*<Swiper
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
					</Swiper>*/}
					<Tabs
						value={displayIndex}
						onChange={handleChange}
						variant="scrollable"
						scrollButtons="auto"
					>
						{bannerDisplayMenu.map((type, index) => (
							<Tab key={index} label={type} />
						))}
					</Tabs>
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
							{bannerLength > 0 ? bannerDisplayMenu[displayIndex] : '남성패션'}
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
							{KEYWORD_INFO.map((keyword, index) => (
								<Grid key={index} item>
									<ButtonTag
										buttonType="popular"
										device="pc"
										variant="outlined"
									>
										{keyword}
									</ButtonTag>
								</Grid>
							))}
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
					{Array.from(new Array(2)).map((_, i) => (
						<Box key={i}>
							<Grid
								container
								spacing={1}
								justifyContent="center"
								sx={{ pt: 2 }}
							>
								{Array.from(new Array(3)).map((_, j) => (
									<Grid key={j} item>
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
								))}
							</Grid>
							{i == 0 && <Divider variant="middle" sx={{ height: 10 }} />}
						</Box>
					))}
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default PopularPC;
