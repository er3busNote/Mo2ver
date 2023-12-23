import React, { FC, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeTitle, changeDescription, menuActive } from '../../store/index';
import AppSubHeader from '../common/AppSubHeader';
import {
	Box,
	Grid,
	Card,
	Breadcrumbs,
	CardContent,
	CardMedia,
	CardActionArea,
	Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

const IMAGE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const GoodsGrid: FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (title: string, code: string) => {
		dispatch(changeDescription(title));
		dispatch(changeTitle(title));
		dispatch(menuActive('/goods/' + code + '/detail'));
		navigate('/goods/' + code + '/detail');
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={6} md={3} lg={3}>
				<Card
					elevation={0}
					sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
					onClick={() => goodsClick('스파오', '0')}
				>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image={IMAGE_INFO[0]}
							alt="green iguana"
						/>
						<CardContent>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '11px', sm: '12px', lg: '13px' },
									fontWeight: 'bold',
								}}
							>
								스파오
							</Typography>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '10px', sm: '11px', lg: '12px' },
									fontWeight: 'bold',
								}}
							>
								베이직
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Breadcrumbs
									sx={{ pt: 1 }}
									separator="›"
									aria-label="breadcrumb"
								>
									<Typography
										color="text.secondary"
										sx={{
											color: '#b2b2b2',
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											textDecoration: 'line-through',
										}}
									>
										69,900원
									</Typography>
									<Typography
										color="text.secondary"
										sx={{
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											fontWeight: 'bold',
										}}
									>
										64,900원
									</Typography>
								</Breadcrumbs>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={6} md={3} lg={3}>
				<Card
					elevation={0}
					sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
					onClick={() => goodsClick('코드그라피', '1')}
				>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image={IMAGE_INFO[1]}
							alt="green iguana"
						/>
						<CardContent>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '11px', sm: '12px', lg: '13px' },
									fontWeight: 'bold',
								}}
							>
								코드그라피
							</Typography>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '10px', sm: '11px', lg: '12px' },
									fontWeight: 'bold',
								}}
							>
								내피분리형
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Breadcrumbs
									sx={{ pt: 1 }}
									separator="›"
									aria-label="breadcrumb"
								>
									<Typography
										color="text.secondary"
										sx={{
											color: '#b2b2b2',
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											textDecoration: 'line-through',
										}}
									>
										139,000원
									</Typography>
									<Typography
										color="text.secondary"
										sx={{
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											fontWeight: 'bold',
										}}
									>
										79,900원
									</Typography>
								</Breadcrumbs>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={6} md={3} lg={3}>
				<Card
					elevation={0}
					sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
					onClick={() => goodsClick('집시', '2')}
				>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image={IMAGE_INFO[2]}
							alt="green iguana"
						/>
						<CardContent>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '11px', sm: '12px', lg: '13px' },
									fontWeight: 'bold',
								}}
							>
								집시
							</Typography>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '10px', sm: '11px', lg: '12px' },
									fontWeight: 'bold',
								}}
							>
								마스터 구스다운 숏패딩
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Breadcrumbs
									sx={{ pt: 1 }}
									separator="›"
									aria-label="breadcrumb"
								>
									<Typography
										color="text.secondary"
										sx={{
											color: '#b2b2b2',
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											textDecoration: 'line-through',
										}}
									>
										349,900원
									</Typography>
									<Typography
										color="text.secondary"
										sx={{
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											fontWeight: 'bold',
										}}
									>
										199,000원
									</Typography>
								</Breadcrumbs>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={6} md={3} lg={3}>
				<Card
					elevation={0}
					sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
					onClick={() => goodsClick('키뮤어', '3')}
				>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image={IMAGE_INFO[3]}
							alt="green iguana"
						/>
						<CardContent>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '11px', sm: '12px', lg: '13px' },
									fontWeight: 'bold',
								}}
							>
								키뮤어
							</Typography>
							<Typography
								component="div"
								sx={{
									fontSize: { xs: '10px', sm: '11px', lg: '12px' },
									fontWeight: 'bold',
								}}
							>
								서플러스 울 (WOOL)
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Breadcrumbs
									sx={{ pt: 1 }}
									separator="›"
									aria-label="breadcrumb"
								>
									<Typography
										color="text.secondary"
										sx={{
											color: '#b2b2b2',
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											textDecoration: 'line-through',
										}}
									>
										159,000원
									</Typography>
									<Typography
										color="text.secondary"
										sx={{
											fontSize: { xs: '11px', sm: '12px', lg: '13px' },
											fontWeight: 'bold',
										}}
									>
										82,240원
									</Typography>
								</Breadcrumbs>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		</Grid>
	);
};

const GoodsList: FC = (): JSX.Element => {
	const [page, setPage] = useState(0);

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box>
			<AppSubHeader />
			<Box sx={{ mx: 3, my: 2 }}>
				<GoodsGrid />
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={1}
					variant="outlined"
					color="primary"
					siblingCount={0}
					boundaryCount={1}
					hidePrevButton
					hideNextButton
					onChange={pageChange}
					size="small"
				/>
			</Box>
		</Box>
	);
};

export default GoodsList;
