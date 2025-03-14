import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActive } from '../../store/index';
import ButtonTag from '../button/ButtonTag';
import { Box, Grid, IconButton, CardMedia, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

const SLIDE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

interface PopularProps {
	bannerDisplayData: Record<string, Record<string, Array<object>>>;
}

const PopularMobile: FC<PopularProps> = ({
	bannerDisplayData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	const goodsClick = (code: string) => {
		//dispatch(menuActive('/goods/' + code + '/detail'));
		//navigate('/goods/' + code + '/detail');
	};

	const label: SxProps<Theme> = {
		fontSize: '0.8rem',
	};
	const info: SxProps<Theme> = {
		fontSize: '0.9rem',
		fontWeight: 'bold',
	};
	const infoImage: SxProps<Theme> = {
		width: { xs: '90px', sm: '120px' },
		height: { xs: '80px', sm: '100px' },
	};

	return (
		<React.Fragment>
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
							pt: { xs: 3, sm: 3 },
							px: { xs: 2.5, sm: 3 },
							display: 'grid',
						}}
					>
						<Grid container spacing={1}>
							<Grid item>
								<Typography
									variant="subtitle2"
									sx={{
										pl: { xs: 1, sm: 0 },
										fontSize: { xs: '0.8rem', sm: '0.9rem' },
										fontWeight: 'bold',
									}}
								>
									HOT 키워드
								</Typography>
							</Grid>
							<Grid item>
								<ButtonTag
									buttonType="popular"
									device="mobile"
									variant="outlined"
								>
									#반팔 티셔츠
								</ButtonTag>
							</Grid>
							<Grid item>
								<ButtonTag
									buttonType="popular"
									device="mobile"
									variant="outlined"
								>
									#반바지
								</ButtonTag>
							</Grid>
							<Grid item>
								<ButtonTag
									buttonType="popular"
									device="mobile"
									variant="outlined"
								>
									#리넨 팬츠
								</ButtonTag>
							</Grid>
							<Grid item>
								<ButtonTag
									buttonType="popular"
									device="mobile"
									variant="outlined"
								>
									#슬리퍼
								</ButtonTag>
							</Grid>
							<Grid item>
								<ButtonTag
									buttonType="popular"
									device="mobile"
									variant="outlined"
								>
									#카드지갑
								</ButtonTag>
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
									onClick={() => goodsClick(String(index))}
								>
									<CardMedia
										sx={infoImage}
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
									onClick={() => goodsClick(String(index))}
								>
									<CardMedia
										sx={infoImage}
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
							<Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
								<IconButton
									sx={{ display: 'block' }}
									onClick={() => goodsClick(String(index))}
								>
									<CardMedia
										sx={infoImage}
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
									onClick={() => goodsClick(String(index))}
								>
									<CardMedia
										sx={infoImage}
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
									onClick={() => goodsClick(String(index))}
								>
									<CardMedia
										sx={infoImage}
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
							<Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
								<IconButton
									sx={{ display: 'block' }}
									onClick={() => goodsClick(String(index))}
								>
									<CardMedia
										sx={infoImage}
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

export default PopularMobile;
