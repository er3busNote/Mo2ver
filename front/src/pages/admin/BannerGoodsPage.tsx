import React, {
	FC,
	useState,
	BaseSyntheticEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../services/api';
import {
	CategoryData,
	CategoryPageData,
	GoodsDisplayData,
} from '../../services/types';
import useCSRFToken from '../../hooks/useCSRFToken';
import useCategoryInfo from '../../hooks/useCategoryInfo';
import useGoodsSearchPageList from '../../hooks/useGoodsSearchPageList';
import GoodsFormDisplayPC from '../../components/form/admin/GoodsFormDisplayPC';
import GoodsFormDisplayMobile from '../../components/form/admin/GoodsFormDisplayMobile';
import { Box } from '@mui/material';
import { GoodsFormDisplayValues } from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';

const drawerMenuLimit = 768;

interface BannerProps {
	title: string;
	description: string;
	goodsData: CategoryPageData;
	largeCategoryData: Array<CategoryData>;
	mediumCategoryData: Array<CategoryData>;
	smallCategoryData: Array<CategoryData>;
	setLargeCategoryCode: Dispatch<SetStateAction<string>>;
	setMediumCategoryCode: Dispatch<SetStateAction<string>>;
	setSmallCategoryCode: Dispatch<SetStateAction<string>>;
	setPage: Dispatch<SetStateAction<number>>;
	searchClick: (goodsName: string) => void;
	onSubmit: (
		data: GoodsFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface BannerDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	banner: ActionCreatorsMapObject;
	goods: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
}

const BannerGoodsPC: FC<BannerProps> = ({
	title,
	description,
	goodsData,
	largeCategoryData,
	mediumCategoryData,
	smallCategoryData,
	setLargeCategoryCode,
	setMediumCategoryCode,
	setSmallCategoryCode,
	setPage,
	searchClick,
	onSubmit,
}): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<GoodsFormDisplayPC
					title={title}
					description={description}
					goodsData={goodsData}
					largeCategoryData={largeCategoryData}
					mediumCategoryData={mediumCategoryData}
					smallCategoryData={smallCategoryData}
					setLargeCategoryCode={setLargeCategoryCode}
					setMediumCategoryCode={setMediumCategoryCode}
					setSmallCategoryCode={setSmallCategoryCode}
					setPage={setPage}
					searchClick={searchClick}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerGoodsMobile: FC<BannerProps> = ({
	title,
	description,
	goodsData,
	largeCategoryData,
	mediumCategoryData,
	smallCategoryData,
	setLargeCategoryCode,
	setMediumCategoryCode,
	setSmallCategoryCode,
	setPage,
	searchClick,
	onSubmit,
}): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<GoodsFormDisplayMobile
					title={title}
					description={description}
					goodsData={goodsData}
					largeCategoryData={largeCategoryData}
					mediumCategoryData={mediumCategoryData}
					smallCategoryData={smallCategoryData}
					setLargeCategoryCode={setLargeCategoryCode}
					setMediumCategoryCode={setMediumCategoryCode}
					setSmallCategoryCode={setSmallCategoryCode}
					setPage={setPage}
					searchClick={searchClick}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerGoodsPage: FC<BannerDispatchProps> = ({
	title,
	description,
	member,
	banner,
	goods,
	category,
}): JSX.Element => {
	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const [goodsName, setGoodsName] = useState<string>('');
	const [largeCategoryCode, setLargeCategoryCode] = useState<string>('');
	const [mediumCategoryCode, setMediumCategoryCode] = useState<string>('');
	const [smallCategoryCode, setSmallCategoryCode] = useState<string>('');
	const largeCategoryData = useCategoryInfo({ category, categoryLevel: 1 });
	const mediumCategoryData = useCategoryInfo({
		category,
		categoryLevel: 2,
		categoryInfo: largeCategoryCode,
	});
	const smallCategoryData = useCategoryInfo({
		category,
		categoryLevel: 3,
		categoryInfo: mediumCategoryCode,
	});
	const [goodsData, setPage] = useGoodsSearchPageList({
		goods,
		goodsName,
		largeCategoryCode,
		mediumCategoryCode,
		smallCategoryCode,
	});
	const searchClick = (goodsName: string) => {
		setGoodsName(goodsName);
	};
	const submitForm = async (
		data: GoodsFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		const goodsFormData: GoodsDisplayData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
			goods: data.goods,
		};
		console.log(goodsFormData);
		console.log(csrfData);
		await banner.goods(goodsFormData, csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
		navigate('/admin/banner');
	};
	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<BannerGoodsPC
				title={title}
				description={description}
				goodsData={goodsData}
				largeCategoryData={largeCategoryData}
				mediumCategoryData={mediumCategoryData}
				smallCategoryData={smallCategoryData}
				setLargeCategoryCode={setLargeCategoryCode}
				setMediumCategoryCode={setMediumCategoryCode}
				setSmallCategoryCode={setSmallCategoryCode}
				setPage={setPage}
				searchClick={searchClick}
				onSubmit={submitForm}
			/>
			<BannerGoodsMobile
				title={title}
				description={description}
				goodsData={goodsData}
				largeCategoryData={largeCategoryData}
				mediumCategoryData={mediumCategoryData}
				smallCategoryData={smallCategoryData}
				setLargeCategoryCode={setLargeCategoryCode}
				setMediumCategoryCode={setMediumCategoryCode}
				setSmallCategoryCode={setSmallCategoryCode}
				setPage={setPage}
				searchClick={searchClick}
				onSubmit={submitForm}
			/>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	banner: bindActionCreators(Api.banner, dispatch),
	goods: bindActionCreators(Api.goods, dispatch),
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerGoodsPage);
