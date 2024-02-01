import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../services/api';
import useCSRFToken from '../../hooks/useCSRFToken';
import GoodsFormDisplayPC from '../../components/form/admin/GoodsFormDisplayPC';
import GoodsFormDisplayMobile from '../../components/form/admin/GoodsFormDisplayMobile';
import { GoodsFormDisplayValues } from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';

const drawerMenuLimit = 768;

interface BannerProps {
	title: string;
	description: string;
	onSubmit: (
		data: GoodsFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface BannerDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
}

const BannerGoodsPC: FC<BannerProps> = ({
	title,
	description,
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
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerGoodsMobile: FC<BannerProps> = ({
	title,
	description,
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
}): JSX.Element => {
	const csrfData = useCSRFToken({ member });
	const submitForm = (
		data: GoodsFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		const goodsFormData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
		};
		console.log(goodsFormData);
		console.log(csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
	return (
		<>
			<BannerGoodsPC
				title={title}
				description={description}
				onSubmit={submitForm}
			/>
			<BannerGoodsMobile
				title={title}
				description={description}
				onSubmit={submitForm}
			/>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerGoodsPage);
