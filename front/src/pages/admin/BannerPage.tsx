import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import useCSRFToken from '../../hooks/useCSRFToken';
import BannerPagePC from './pc/BannerPagePC';
import BannerPageMobile from './mobile/BannerPageMobile';
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
}

interface BannerDispatchProps {
	auth: ActionCreatorsMapObject;
}

const BannerPC: FC<BannerProps> = ({ onSubmit }): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return <>{isPc && <BannerPagePC onSubmit={onSubmit} />}</>;
};

const BannerMobile: FC<BannerProps> = ({ onSubmit }): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return <>{isMobile && <BannerPageMobile onSubmit={onSubmit} />}</>;
};

const BannerPage: FC<BannerDispatchProps> = ({ auth }): JSX.Element => {
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ auth });
	const submitForm = (
		data: BannerFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		fetchCSRFTokenData();
		const bannerData = {
			title: data.title,
			startDate: moment(data.startDate).format('YYYY-MM-DD'),
			endDate: moment(data.endDate).format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
			bnnrImg: data.bnnrImg,
		};
		console.log(bannerData);
		console.log(csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
	return (
		<>
			<BannerPC onSubmit={submitForm} />
			<BannerMobile onSubmit={submitForm} />
		</>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	auth: bindActionCreators(Api.auth, dispatch),
});

export default connect(null, mapDispatchToProps)(BannerPage);
