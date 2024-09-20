import React, { FC, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../api';
import { BannerImageData, BannerImageDetailData } from '../../api/types';
import useCSRFToken from '../../hooks/useCSRFToken';
import BannerFormImagePC from '../../components/form/admin/BannerFormImagePC';
import BannerFormImageMobile from '../../components/form/admin/BannerFormImageMobile';
import { Box } from '@mui/material';
import {
	BannerFormImageValues,
	BannerImageDetailValues,
} from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';

const drawerMenuLimit = 768;

interface BannerProps {
	title: string;
	description: string;
	onSubmit: (
		data: BannerFormImageValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface BannerDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	banner: ActionCreatorsMapObject;
}

const BannerImagePC: FC<BannerProps> = ({
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
				<BannerFormImagePC
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerImageMobile: FC<BannerProps> = ({
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
				<BannerFormImageMobile
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
};

const BannerImagePage: FC<BannerDispatchProps> = ({
	title,
	description,
	member,
	banner,
}): JSX.Element => {
	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const submitForm = async (
		data: BannerFormImageValues,
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const bnnrImg = data.bnnrImg as Array<BannerImageDetailValues>;
		const paramBnnrImg = new Array<BannerImageDetailData>();
		const formData = new FormData();
		bnnrImg.map((item: BannerImageDetailValues) => {
			if (item.bnnrImg) formData.append('files', item.bnnrImg);
			else {
				const textContent = 'This is the error content of the file.';
				const blob = new Blob([textContent], { type: 'text/plain' });
				const file = new File([blob], 'error.txt', { type: 'text/plain' });
				formData.append('files', file);
			}
			paramBnnrImg.push({
				title: item.title,
				cnntUrl: item.cnntUrl,
				useyn: item.useyn,
			});
		});
		const bannerFormData: BannerImageData = {
			title: data.title,
			startDate: data.startDate.format('YYYY-MM-DD'),
			endDate: data.endDate.format('YYYY-MM-DD'),
			position: data.position,
			type: data.type,
			useyn: data.useyn,
			bnnrImg: paramBnnrImg,
		};
		formData.append(
			'bannerImage',
			new Blob([JSON.stringify(bannerFormData)], { type: 'application/json' })
		);
		console.log('bannerImage');
		console.log(bannerFormData);
		console.log(csrfData);
		await banner.upload(formData, csrfData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
		navigate('/admin/banner');
	};
	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<BannerImagePC
				title={title}
				description={description}
				onSubmit={submitForm}
			/>
			<BannerImageMobile
				title={title}
				description={description}
				onSubmit={submitForm}
			/>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
	banner: bindActionCreators(Api.banner, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerImagePage);
