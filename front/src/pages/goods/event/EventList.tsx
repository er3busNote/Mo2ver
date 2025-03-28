import React, { FC, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { changeNext, menuActive } from '@store/index';
import { TitleInfo } from '@store/types';
import Api from '@api/index';
import useImageUrl from '@hooks/useImageUrl';
import useEventPageList from '@hooks/event/useEventPageList';
import AppSubHeader from '@layouts/AppSubHeader';
import {
	Box,
	Grid,
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	Typography,
	Skeleton,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { EventData } from '@api/types';
import moment from 'moment';

interface EventListProps {
	title: string;
	description: string;
	event: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

interface EventGridProps {
	title: string;
	description: string;
	image: ActionCreatorsMapObject;
	eventData: Array<EventData>;
}

const EventGrid: FC<EventGridProps> = ({
	title,
	description,
	image,
	eventData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const eventClick = (code: string) => {
		const titleData: TitleInfo = {
			title: title,
			description: description,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive('/event/' + code + '/detail'));
		navigate('/event/' + code + '/detail');
	};

	return (
		<Grid container spacing={3}>
			{eventData
				? eventData.map((data: EventData, index: number) => {
						const file =
							data.imageList.length > 0
								? String(data.imageList[0].goodsImageAttachFile)
								: '';
						//const base64 = data.imageList.length > 0 ? data.imageList[0].base64Image : '';
						return (
							<Grid key={index} item xs={12} md={6} lg={4}>
								<Card
									elevation={0}
									sx={{ border: '2px #f0f0f0f0 solid' }}
									onClick={() => eventClick(data.eventManageNo.toString())}
								>
									<CardActionArea sx={{ display: 'flex' }}>
										<Box sx={{ display: 'flex', flexDirection: 'column' }}>
											<CardContent sx={{ flex: '1 0 auto' }}>
												<Typography
													component="div"
													sx={{
														fontSize: { xs: '13px', sm: '14px', lg: '18px' },
													}}
												>
													{data.subject}
												</Typography>
												<Typography
													variant="subtitle1"
													color="text.secondary"
													component="div"
													sx={{
														fontSize: { xs: '11px', sm: '12px', lg: '13px' },
													}}
												>
													{moment(data.eventStartDate).format('YYYY-MM-DD')} ~{' '}
													{moment(data.eventEndDate).format('YYYY-MM-DD')}
												</Typography>
											</CardContent>
										</Box>
										<CardMedia
											component="img"
											height="150"
											sx={{ width: 151 }}
											image={useImageUrl({ image, file })}
										/>
									</CardActionArea>
								</Card>
							</Grid>
						);
				  })
				: Array.from(new Array(12)).map((_, index) => (
						<Grid key={index} item xs={6} md={3} lg={3}>
							<Card
								elevation={0}
								sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
							>
								<Skeleton sx={{ height: 140 }} variant="rectangular" />
								<CardContent>
									<Skeleton
										animation="wave"
										height={10}
										style={{ marginBottom: 6 }}
									/>
									<Skeleton height={10} width="80%" />
								</CardContent>
							</Card>
						</Grid>
				  ))}
		</Grid>
	);
};

const EventList: FC<EventListProps> = ({
	title,
	description,
	event,
	image,
}): JSX.Element => {
	const [eventData, setPage] = useEventPageList({ event });

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box>
			<AppSubHeader title={title} description={description} />
			<Box sx={{ mx: 3, my: 2 }}>
				<EventGrid
					image={image}
					title={title}
					description={description}
					eventData={eventData.content}
				/>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={eventData.totalPages - 1}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
	event: bindActionCreators(Api.event, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(EventList);
