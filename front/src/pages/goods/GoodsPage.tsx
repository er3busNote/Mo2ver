import React, { FC, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { TitleState } from '@/types/store';
import { GoodsPageData } from '@/types/api';
import useCategoryPageList from '@services/category/useCategoryPageList';
import useSearchGoodsList from '@services/search/useSearchGoodsList';
import GoodsList from './GoodsList';
import NotFound from '../NotFound';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface GoodsProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	goodsData: GoodsPageData;
	setPage: Dispatch<SetStateAction<number>>;
}

interface GoodsDispatchProps {
	title: string;
	description: string;
	goods: ActionCreatorsMapObject;
	search: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

const GoodsPC: FC<GoodsProps> = ({
	title,
	description,
	file,
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
				file={file}
				goodsData={goodsData}
				setPage={setPage}
			/>
		</Box>
	);
};

const GoodsMobile: FC<GoodsProps> = ({
	title,
	description,
	file,
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
				file={file}
				goodsData={goodsData}
				setPage={setPage}
			/>
		</Box>
	);
};

const GoodsDataLoaded: FC<GoodsProps> = ({
	title,
	description,
	file,
	goodsData,
	setPage,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<>
			{isDesktop && (
				<GoodsPC
					title={title}
					description={description}
					file={file}
					goodsData={goodsData}
					setPage={setPage}
				/>
			)}
			{isMobile && (
				<GoodsMobile
					title={title}
					description={description}
					file={file}
					goodsData={goodsData}
					setPage={setPage}
				/>
			)}
		</>
	);
};

const GoodsPage: FC<GoodsDispatchProps> = ({
	title,
	description,
	goods,
	search,
	file,
}): JSX.Element => {
	const { code, type, keyword } = useParams();
	if (type && code) {
		const [goodsData, setPage] = useCategoryPageList({
			goods,
			categoryCode: code,
			categoryType: type,
		});
		return (
			<GoodsDataLoaded
				title={title}
				description={description}
				file={file}
				goodsData={goodsData}
				setPage={setPage}
			/>
		);
	} else if (keyword) {
		const [goodsData, setPage] = useSearchGoodsList({
			search,
			keyword,
		});
		return (
			<GoodsDataLoaded
				title={title}
				description={description}
				file={file}
				goodsData={goodsData}
				setPage={setPage}
			/>
		);
	} else {
		return <NotFound />;
	}
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	goods: bindActionCreators(Api.goods, dispatch),
	search: bindActionCreators(Api.search, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsPage);
