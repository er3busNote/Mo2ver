import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useImageUrl from '@hooks/useImageUrl';
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
import goToGoodsDetail from '@navigate/goods/goToGoodsDetail';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { get, slice, map } from 'lodash';

const groupSize = 6;
const subGroupSize = 3;

const SLIDE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const KEYWORD_INFO: Array<string> = [
	'반팔 티셔츠',
	'반바지',
	'리넨 팬츠',
	'슬리퍼',
	'카드지갑',
];

interface PopularProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
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
	file,
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
	const bannerDisplayKey = bannerDisplayMenu[displayIndex];
	const bannerDisplayKeywordInfo =
		slice(
			map(
				get(bannerDisplayData, [bannerDisplayKey, 'keyword'], []),
				(obj) => (obj as Record<string, number>).keyword
			),
			0,
			5
		) || KEYWORD_INFO;
	const bannerDisplayDetailInfo = get(
		bannerDisplayData,
		[bannerDisplayKey, 'detail'],
		''
	);
	const bannerDisplayProductInfo = get(
		bannerDisplayData,
		[bannerDisplayKey, 'product'],
		''
	);

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
			goToGoodsDetail({
				code,
				title,
				description,
				dispatch,
				navigate,
			});
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
	const productLabel: SxProps<Theme> = {
		width: '110px',
		fontSize: '0.8rem',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
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
							{bannerLength > 0 ? bannerDisplayKey : '남성패션'}
						</Typography>
					</Box>
					<Box sx={{ pt: 10, px: 7, display: 'grid' }}>
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
							{bannerDisplayKeywordInfo.map((keyword, index) => (
								<Grid key={index} item>
									<ButtonTag
										buttonType="popular"
										device="pc"
										variant="outlined"
									>
										#{keyword}
									</ButtonTag>
								</Grid>
							))}
						</Grid>
					</Box>
				</Box>
				<Box sx={{ width: '30%' }}>
					<Fade in={fadeIn}>
						<Box>
							{bannerDisplayDetailInfo ? (
								<Swiper
									slidesPerView={1}
									pagination={{ clickable: true }}
									modules={[Pagination]}
								>
									{bannerDisplayDetailInfo.map((detail, index) => (
										<SwiperSlide key={index}>
											<CarouselFade
												url={useImageUrl({
													file: file,
													attachFile: (detail as Record<string, any>)
														.imageAttachFile,
												})}
											/>
										</SwiperSlide>
									))}
								</Swiper>
							) : (
								<CarouselFade url={content} />
							)}
						</Box>
					</Fade>
				</Box>
				<Box sx={{ width: '50%' }}>
					{bannerDisplayProductInfo ? (
						<Swiper
							slidesPerView={1}
							pagination={{ clickable: true }}
							modules={[Pagination]}
							style={{ height: '100%' }}
						>
							{Array.from({
								length: Math.ceil(bannerDisplayProductInfo.length / groupSize),
							}).map((_, groupIndex) => {
								const group = bannerDisplayProductInfo.slice(
									groupIndex * groupSize,
									(groupIndex + 1) * groupSize
								);
								return (
									<SwiperSlide key={groupIndex}>
										{Array.from({
											length: Math.ceil(group.length / subGroupSize),
										}).map((_, subGroupIndex) => (
											<Box key={subGroupIndex}>
												{subGroupIndex == 1 && (
													<Divider variant="middle" sx={{ height: 10 }} />
												)}
												<Grid
													container
													spacing={1}
													justifyContent="center"
													sx={{ pt: 2 }}
												>
													{group
														.slice(
															subGroupIndex * subGroupSize,
															(subGroupIndex + 1) * subGroupSize
														)
														.map((product, itemIndex) => (
															<Grid key={itemIndex} item>
																<IconButton
																	sx={{ borderRadius: '4px', display: 'block' }}
																	onClick={() =>
																		goodsClick(
																			(product as Record<string, any>).goodsCode
																		)
																	}
																>
																	<CardMedia
																		sx={{ width: '120px', height: '100px' }}
																		component="img"
																		image={useImageUrl({
																			file: file,
																			attachFile: (
																				product as Record<string, any>
																			).goodsImageAttachFile,
																		})}
																		alt="Image"
																	/>
																	<Typography
																		variant="subtitle2"
																		sx={productLabel}
																	>
																		{(product as Record<string, any>).goodsName}
																	</Typography>
																	<Typography variant="subtitle2" sx={info}>
																		{(
																			product as Record<string, any>
																		).salePrice.toLocaleString()}
																		원
																	</Typography>
																</IconButton>
															</Grid>
														))}
												</Grid>
											</Box>
										))}
									</SwiperSlide>
								);
							})}
						</Swiper>
					) : (
						Array.from(new Array(2)).map((_, i) => (
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
												sx={{ borderRadius: '4px', display: 'block' }}
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
						))
					)}
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default PopularPC;
