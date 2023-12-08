import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import useCSRFToken from '../../hooks/useCSRFToken';
import useBannerPageList from '../../hooks/useBannerPageList';
import BannerPagePC from './pc/BannerPagePC';
import BannerPageMobile from './mobile/BannerPageMobile';
import { BannerPageData } from '../../services/types';
import { BannerFormValues } from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';
import moment from 'moment';

const drawerMenuLimit = 768;

interface BannerProps {
	onSubmit: (
		data: BannerFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
	bannerPageData: BannerPageData;
}

interface BannerDispatchProps {
	member: ActionCreatorsMapObject;
	banner: ActionCreatorsMapObject;
}

const BannerPC: FC<BannerProps> = ({
	onSubmit,
	bannerPageData,
}): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<BannerPagePC onSubmit={onSubmit} bannerPageData={bannerPageData} />
			)}
		</>
	);
};

const BannerMobile: FC<BannerProps> = ({
	onSubmit,
	bannerPageData,
}): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<BannerPageMobile onSubmit={onSubmit} bannerPageData={bannerPageData} />
			)}
		</>
	);
};

const BannerPage: FC<BannerDispatchProps> = ({
	member,
	banner,
}): JSX.Element => {
	const csrfData = useCSRFToken({ member });
	const bannerPageData = useBannerPageList({ banner });
	const submitForm = (
		data: BannerFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		const bannerFormData = {
			title: data.title,
			startDate: moment(data.startDate).format('YYYY-MM-DD'),
			endDate: moment(data.endDate).format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
			bnnrImg: data.bnnrImg,
		};
		console.log(bannerFormData);
		console.log(csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
	return (
		<>
			<BannerPC onSubmit={submitForm} bannerPageData={bannerPageData} />
			<BannerMobile onSubmit={submitForm} bannerPageData={bannerPageData} />
		</>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
	banner: bindActionCreators(Api.banner, dispatch),
});

export default connect(null, mapDispatchToProps)(BannerPage);
