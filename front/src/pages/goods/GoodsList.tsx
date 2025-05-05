import React, { FC, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import useImageUrl from '@hooks/useImageUrl';
import AppSubHeader from '@layouts/AppSubHeader';
import PageNavigator from '@components/pagination/PageNavigator';
import {
	Box,
	Grid,
	Card,
	Breadcrumbs,
	CardContent,
	CardMedia,
	CardActionArea,
	Typography,
	Skeleton,
} from '@mui/material';
import { GoodsData, GoodsPageData } from '@api/types';
import goToGoodsDetail from '@navigate/goods/goToGoodsDetail';

interface GoodsListProps {
	title: string;
	description: string;
	image: ActionCreatorsMapObject;
	goodsData: GoodsPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface GoodsGridProps {
	title: string;
	description: string;
	image: ActionCreatorsMapObject;
	goodsData: Array<GoodsData>;
}

const GoodsGrid: FC<GoodsGridProps> = ({
	title,
	description,
	image,
	goodsData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (code: string) => {
		goToGoodsDetail({
			code,
			title,
			description,
			dispatch,
			navigate,
		});
	};

	return (
		<Grid container spacing={3}>
			{goodsData
				? goodsData.map((data: GoodsData, index: number) => {
						const file =
							data.imageList.length > 0
								? String(data.imageList[0].goodsImageAttachFile)
								: '';
						//const base64 = data.imageList.length > 0 ? data.imageList[0].base64Image : '';
						return (
							<Grid key={index} item xs={6} md={3} lg={3}>
								<Card
									elevation={0}
									sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
									onClick={() => goodsClick(data.goodsCode)}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											height="140"
											image={useImageUrl({ image, file })}
											//src={`data:image/png;base64, ${base64}`}
										/>
										<CardContent>
											<Typography
												component="div"
												sx={{
													fontSize: { xs: '11px', sm: '12px', lg: '13px' },
													fontWeight: 'bold',
												}}
											>
												{data.goodsName}
											</Typography>
											<Typography
												component="div"
												sx={{
													fontSize: { xs: '10px', sm: '11px', lg: '12px' },
													fontWeight: 'bold',
												}}
											>
												{data.goodsBrand}
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
														{data.supplyPrice.toLocaleString()}원
													</Typography>
													<Typography
														color="text.secondary"
														sx={{
															fontSize: { xs: '11px', sm: '12px', lg: '13px' },
															fontWeight: 'bold',
														}}
													>
														{data.salePrice.toLocaleString()}원
													</Typography>
												</Breadcrumbs>
											</Box>
										</CardContent>
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

const GoodsList: FC<GoodsListProps> = ({
	title,
	description,
	image,
	goodsData,
	setPage,
}): JSX.Element => {
	return (
		<Box>
			<AppSubHeader title={title} description={description} />
			<Box sx={{ mx: 3, my: 2 }}>
				<GoodsGrid
					image={image}
					title={title}
					description={description}
					goodsData={goodsData.content}
				/>
			</Box>
			<Box sx={{ mb: 10, display: 'flex', justifyContent: 'center' }}>
				<PageNavigator count={goodsData.totalPages} setPage={setPage} />
			</Box>
		</Box>
	);
};

export default GoodsList;
