import React, { FC, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { menuActive } from '../../store/index';
import Api from '../../services/api';
import useImageUrl from '../../hooks/useImageUrl';
import useCategoryPageList from '../../hooks/useCategoryPageList';
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
	Skeleton,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { GoodsData } from '../../services/types';

interface GoodsListProps {
	goods: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

interface GoodsGridProps {
	image: ActionCreatorsMapObject;
	goodsData: Array<GoodsData>;
}

const GoodsGrid: FC<GoodsGridProps> = ({ image, goodsData }): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goodsClick = (title: string, code: string) => {
		dispatch(menuActive('/goods/detail/' + code));
		navigate('/goods/detail/' + code);
	};

	return (
		<Grid container spacing={3}>
			{goodsData
				? goodsData.map((data: GoodsData, index: number) => {
						const file =
							data.imageList.length > 0
								? String(data.imageList[0].goodsImageAttachFile) +
								  '.' +
								  data.imageList[0].goodsImageExtension
								: '';
						//const base64 = data.imageList.length > 0 ? data.imageList[0].base64Image : '';
						return (
							<Grid key={index} item xs={6} md={3} lg={3}>
								<Card
									elevation={0}
									sx={{ maxWidth: 345, border: '2px #f0f0f0f0 solid' }}
									onClick={() => goodsClick(data.goodsName, data.goodsCode)}
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

const GoodsList: FC<GoodsListProps> = ({ goods, image }): JSX.Element => {
	const { code, type } = useParams();
	const categoryCode = code ?? '';
	const categoryType = type ?? '';
	const [goodsData, setPage] = useCategoryPageList({
		goods,
		categoryCode,
		categoryType,
	});

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	return (
		<Box>
			<AppSubHeader />
			<Box sx={{ mx: 3, my: 2 }}>
				<GoodsGrid image={image} goodsData={goodsData.content} />
			</Box>
			<Box sx={{ mb: 10, display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={goodsData.totalPages}
					variant="outlined"
					color="primary"
					siblingCount={2}
					boundaryCount={2}
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
	goods: bindActionCreators(Api.goods, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(GoodsList);
