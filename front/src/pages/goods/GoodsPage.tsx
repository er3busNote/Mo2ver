import React, { FC, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@store/types';
import { GoodsPageData } from '@api/types';
import useCategoryPageList from '@hooks/category/useCategoryPageList';
import GoodsList from './GoodsList';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface GoodsProps {
	title: string;
	description: string;
	image: ActionCreatorsMapObject;
	goodsData: GoodsPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface GoodsDispatchProps {
	title: string;
	description: string;
	goods: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

const GoodsPC: FC<GoodsProps> = ({
	title,
	description,
	image,
	goodsData,
	setPage,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<GoodsList
				title={title}
				description={description}
				image={image}
				goodsData={goodsData}
				setPage={setPage}
			/>
		</Box>
	);
};

const GoodsMobile: FC<GoodsProps> = ({
	title,
	description,
	image,
	goodsData,
	setPage,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<GoodsList
				title={title}
				description={description}
				image={image}
				goodsData={goodsData}
				setPage={setPage}
			/>
		</Box>
	);
};

const GoodsPage: FC<GoodsDispatchProps> = ({
	title,
	description,
	goods,
	image,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { code, type } = useParams();
	const categoryCode = code ?? '';
	const categoryType = type ?? '';
	const [goodsData, setPage] = useCategoryPageList({
		goods,
		categoryCode,
		categoryType,
	});

	return (
		<>
			{isDesktop && (
				<GoodsPC
					title={title}
					description={description}
					image={image}
					goodsData={goodsData}
					setPage={setPage}
				/>
			)}
			{isMobile && (
				<GoodsMobile
					title={title}
					description={description}
					image={image}
					goodsData={goodsData}
					setPage={setPage}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	goods: bindActionCreators(Api.goods, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsPage);
