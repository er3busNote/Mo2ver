import React, { FC, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	changeTitle,
	changeDescription,
	menuActive,
} from '../../../store/index';
import AppSubHeader from '../../common/AppSubHeader';
import {
	Box,
	Grid,
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

const IMAGE_INFO = [
	'https://upload.wikimedia.org/wikipedia/en/5/5f/Mac_Miller_Live_from_Space.jpg',
];

const EventGrid: FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const eventClick = (title: string, code: string) => {
		dispatch(changeDescription(title));
		dispatch(changeTitle(title));
		dispatch(menuActive('/event/' + code + '/detail'));
		navigate('/event/' + code + '/detail');
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6} lg={4}>
				<Card
					elevation={0}
					sx={{ border: '2px #f0f0f0f0 solid' }}
					onClick={() => eventClick('Live From Space', '0')}
				>
					<CardActionArea sx={{ display: 'flex' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: '1 0 auto' }}>
								<Typography
									component="div"
									sx={{ fontSize: { xs: '13px', sm: '14px', lg: '18px' } }}
								>
									Live From Space
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div"
									sx={{ fontSize: { xs: '11px', sm: '12px', lg: '13px' } }}
								>
									Mac Miller
								</Typography>
							</CardContent>
						</Box>
						<CardMedia
							component="img"
							sx={{ width: 151 }}
							image={IMAGE_INFO[0]}
							alt="Live from space album cover"
						/>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={12} md={6} lg={4}>
				<Card
					elevation={0}
					sx={{ border: '2px #f0f0f0f0 solid' }}
					onClick={() => eventClick('Live From Space', '0')}
				>
					<CardActionArea sx={{ display: 'flex' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: '1 0 auto' }}>
								<Typography
									component="div"
									sx={{ fontSize: { xs: '13px', sm: '14px', lg: '18px' } }}
								>
									Live From Space
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div"
									sx={{ fontSize: { xs: '11px', sm: '12px', lg: '13px' } }}
								>
									Mac Miller
								</Typography>
							</CardContent>
						</Box>
						<CardMedia
							component="img"
							sx={{ width: 151 }}
							image={IMAGE_INFO[0]}
							alt="Live from space album cover"
						/>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={12} md={6} lg={4}>
				<Card
					elevation={0}
					sx={{ border: '2px #f0f0f0f0 solid' }}
					onClick={() => eventClick('Live From Space', '0')}
				>
					<CardActionArea sx={{ display: 'flex' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: '1 0 auto' }}>
								<Typography
									component="div"
									sx={{ fontSize: { xs: '13px', sm: '14px', lg: '18px' } }}
								>
									Live From Space
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div"
									sx={{ fontSize: { xs: '11px', sm: '12px', lg: '13px' } }}
								>
									Mac Miller
								</Typography>
							</CardContent>
						</Box>
						<CardMedia
							component="img"
							sx={{ width: 151 }}
							image={IMAGE_INFO[0]}
							alt="Live from space album cover"
						/>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={12} md={6} lg={4}>
				<Card
					elevation={0}
					sx={{ border: '2px #f0f0f0f0 solid' }}
					onClick={() => eventClick('Live From Space', '0')}
				>
					<CardActionArea sx={{ display: 'flex' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: '1 0 auto' }}>
								<Typography
									component="div"
									sx={{ fontSize: { xs: '13px', sm: '14px', lg: '18px' } }}
								>
									Live From Space
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div"
									sx={{ fontSize: { xs: '11px', sm: '12px', lg: '13px' } }}
								>
									Mac Miller
								</Typography>
							</CardContent>
						</Box>
						<CardMedia
							component="img"
							sx={{ width: 151 }}
							image={IMAGE_INFO[0]}
							alt="Live from space album cover"
						/>
					</CardActionArea>
				</Card>
			</Grid>
		</Grid>
	);
};

const EventList: FC = (): JSX.Element => {
	const [page, setPage] = useState(0);

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box>
			<AppSubHeader />
			<Box sx={{ mx: 3, my: 2 }}>
				<EventGrid />
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

export default EventList;
