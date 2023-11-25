import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Grid,
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

const PopularMobile: FC = (): JSX.Element => {
	const [index, setIndex] = useState(0);
	const content = SLIDE_INFO[index];
	const numSlides = SLIDE_INFO.length;

	const onAutoFadeIn = (newIndex: number) => {
		setTimeout(() => {
			setIndex(newIndex);
		}, 300);
	};

	useEffect(() => {
		const rotation = setInterval(() => {
			const newIndex = (index + 1 + numSlides) % numSlides;
			onAutoFadeIn(newIndex);
		}, 5000);
		return () => clearInterval(rotation);
	}, [index, setIndex, onAutoFadeIn]);

	return (
		<React.Fragment>
			<Typography
				variant="subtitle2"
				sx={{ textAlign: 'left', fontSize: { xs: '1.0rem', sm: '1.2rem' } }}
			>
				Real-Time Ranking!
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
				<Typography
					variant="subtitle2"
					sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' }, fontWeight: 'bold' }}
				>
					카테고리별
				</Typography>
				<Typography
					variant="subtitle2"
					sx={{
						pl: 2,
						fontSize: { xs: '1.1rem', sm: '1.3rem' },
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
					justifyContent: 'flex-start',
					borderTop: '2px solid #5868be',
					borderBottom: '1px solid #ddd',
					height: '100%',
				}}
			>
				<Box sx={{ width: { xs: '30%', sm: '20%' } }}>
					<Box>
						<Typography
							variant="subtitle2"
							sx={{
								pl: { xs: 0, sm: 2 },
								pt: { xs: 4, sm: 6 },
								fontSize: { xs: '1.1rem', sm: '1.3rem' },
								fontWeight: 'bold',
								color: '#1992DF',
							}}
						>
							남성패션
						</Typography>
					</Box>
					<Box
						sx={{
							pt: { xs: 3, sm: 6 },
							px: { xs: 2.5, sm: 7 },
							display: 'grid',
						}}
					>
						<Grid container spacing={1}>
							<Grid item>
								<Typography
									variant="subtitle2"
									sx={{
										pl: { xs: 1, sm: 0 },
										fontSize: { xs: '0.8rem', sm: '1.0rem' },
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
										width: { xs: 'max-content' },
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
										width: { xs: 'max-content' },
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
										width: { xs: 'max-content' },
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
										width: { xs: 'max-content' },
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
										width: { xs: 'max-content' },
									}}
									variant="outlined"
								>
									#카드지갑
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Box sx={{ width: { xs: '70%', sm: '80%' } }}>
					<Box sx={{ borderBottom: '1px solid #ddd' }}>
						<Grid container spacing={1} justifyContent="center" sx={{ pt: 2 }}>
							<Grid item>
								<IconButton
									sx={{ display: 'block' }}
									component={Link}
									to="/auth/signup"
								>
									<CardMedia
										sx={{
											width: { xs: '100px', sm: '120px' },
											height: { xs: '80px', sm: '100px' },
										}}
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
										sx={{
											width: { xs: '100px', sm: '120px' },
											height: { xs: '80px', sm: '100px' },
										}}
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
							<Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
								<IconButton
									sx={{ display: 'block' }}
									component={Link}
									to="/auth/signup"
								>
									<CardMedia
										sx={{
											width: { xs: '100px', sm: '120px' },
											height: { xs: '80px', sm: '100px' },
										}}
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
										sx={{
											width: { xs: '100px', sm: '120px' },
											height: { xs: '80px', sm: '100px' },
										}}
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
										sx={{
											width: { xs: '100px', sm: '120px' },
											height: { xs: '80px', sm: '100px' },
										}}
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
							<Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
								<IconButton
									sx={{ display: 'block' }}
									component={Link}
									to="/auth/signup"
								>
									<CardMedia
										sx={{
											width: { xs: '100px', sm: '120px' },
											height: { xs: '80px', sm: '100px' },
										}}
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

export default PopularMobile;
