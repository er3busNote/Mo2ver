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
import { SxProps, Theme } from '@mui/material/styles';
import { GoodsData, GoodsPageData } from '@api/types';
import goToGoodsDetail from '@navigate/goods/goToGoodsDetail';
import { fontSize_xs, fontSize_sm, fontSize_lg } from '@utils/style';
import { get } from 'lodash';

interface GoodsListProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	goodsData: GoodsPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface GoodsGridProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	goodsData: Array<GoodsData>;
}

const GoodsGrid: FC<GoodsGridProps> = ({
	title,
	description,
	file,
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

	const label: SxProps<Theme> = {
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		fontWeight: 'bold',
	};

	const brand: SxProps<Theme> = {
		fontSize: { xs: '10px', sm: '11px', lg: '12px' },
		fontWeight: 'bold',
	};

	const price: SxProps<Theme> = {
		color: '#b2b2b2',
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		textDecoration: 'line-through',
	};

	return (
		<Grid container spacing={3}>
			{goodsData
				? goodsData.map((data: GoodsData, index: number) => {
						const attachFile = String(
							get(data, ['imageList', 0, 'goodsImageAttachFile'], '')
						);
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
											image={useImageUrl({ file, attachFile })}
											//src={`data:image/png;base64, ${base64}`}
											loading="lazy"
										/>
										<CardContent>
											<Typography component="div" sx={label}>
												{data.goodsName}
											</Typography>
											<Typography component="div" sx={brand}>
												{data.goodsBrand}
											</Typography>
											<Box sx={{ display: 'flex', justifyContent: 'center' }}>
												<Breadcrumbs
													sx={{ pt: 1 }}
													separator="›"
													aria-label="breadcrumb"
												>
													<Typography color="text.secondary" sx={price}>
														{data.supplyPrice.toLocaleString()}원
													</Typography>
													<Typography color="text.secondary" sx={label}>
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
	file,
	goodsData,
	setPage,
}): JSX.Element => {
	return (
		<Box>
			<AppSubHeader title={title} description={description} />
			<Box sx={{ mx: 3, my: 2 }}>
				<GoodsGrid
					file={file}
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
