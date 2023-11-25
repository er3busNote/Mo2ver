import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Card,
	Grid,
	Fade,
	Button,
	IconButton,
	CardMedia,
	Typography,
} from '@mui/material';

const SLIDE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

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

const PopularPC: FC = (): JSX.Element => {
	const [index, setIndex] = useState(0);
	const content = SLIDE_INFO[index];
	const numSlides = SLIDE_INFO.length;

	const [fadeIn, setFadeIn] = useState(true);

	const onAutoFadeIn = (newIndex: number) => {
		setTimeout(() => {
			setIndex(newIndex);
			setFadeIn(true);
		}, 300);
	};

	useEffect(() => {
		const rotation = setInterval(() => {
			const newIndex = (index + 1 + numSlides) % numSlides;
			setFadeIn(false);
			onAutoFadeIn(newIndex);
		}, 5000);
		return () => clearInterval(rotation);
	}, [index, setIndex, setFadeIn, onAutoFadeIn]);

	return (
		<React.Fragment>
			<Typography
				variant="subtitle2"
				sx={{ textAlign: 'left', fontSize: '1.2rem' }}
			>
				Real-Time Ranking!
			</Typography>
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
								<Button
									sx={{
										fontSize: '10px',
										border: '1px solid #ccc',
										color: '#1992DF',
										'&:hover': {
											color: '#fff',
											bgcolor: '#1992DF',
											border: '1px solid #1992DF',
										},
									}}
									variant="outlined"
								>
									#반팔 티셔츠
								</Button>
							</Grid>
							<Grid item>
								<Button
									sx={{
										fontSize: '10px',
										border: '1px solid #ccc',
										color: '#1992DF',
										'&:hover': {
											color: '#fff',
											bgcolor: '#1992DF',
											border: '1px solid #1992DF',
										},
									}}
									variant="outlined"
								>
									#반바지
								</Button>
							</Grid>
							<Grid item>
								<Button
									sx={{
										fontSize: '10px',
										border: '1px solid #ccc',
										color: '#1992DF',
										'&:hover': {
											color: '#fff',
											bgcolor: '#1992DF',
											border: '1px solid #1992DF',
										},
									}}
									variant="outlined"
								>
									#리넨 팬츠
								</Button>
							</Grid>
							<Grid item>
								<Button
									sx={{
										fontSize: '10px',
										border: '1px solid #ccc',
										color: '#1992DF',
										'&:hover': {
											color: '#fff',
											bgcolor: '#1992DF',
											border: '1px solid #1992DF',
										},
									}}
									variant="outlined"
								>
									#슬리퍼
								</Button>
							</Grid>
							<Grid item>
								<Button
									sx={{
										fontSize: '10px',
										border: '1px solid #ccc',
										color: '#1992DF',
										'&:hover': {
											color: '#fff',
											bgcolor: '#1992DF',
											border: '1px solid #1992DF',
										},
									}}
									variant="outlined"
								>
									#카드지갑
								</Button>
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
									component={Link}
									to="/auth/signup"
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
										남성상의
									</Typography>
									<Typography
										variant="subtitle2"
										sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
									>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									component={Link}
									to="/auth/signup"
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
										남성상의
									</Typography>
									<Typography
										variant="subtitle2"
										sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
									>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									component={Link}
									to="/auth/signup"
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
										남성상의
									</Typography>
									<Typography
										variant="subtitle2"
										sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
									>
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
									component={Link}
									to="/auth/signup"
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
										남성상의
									</Typography>
									<Typography
										variant="subtitle2"
										sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
									>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									component={Link}
									to="/auth/signup"
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
										남성상의
									</Typography>
									<Typography
										variant="subtitle2"
										sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
									>
										29,900원
									</Typography>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									component={Link}
									to="/auth/signup"
								>
									<CardMedia
										sx={{ width: '120px', height: '100px' }}
										component="img"
										image={content}
										alt="Image"
									/>
									<Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
										남성상의
									</Typography>
									<Typography
										variant="subtitle2"
										sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
									>
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
