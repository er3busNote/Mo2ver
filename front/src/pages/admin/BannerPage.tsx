import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../services/api';
import useBannerPageList from '../../hooks/useBannerPageList';
import BannerPC from '../../components/admin/banner/BannerPC';
import BannerMobile from '../../components/admin/banner/BannerMobile';
import { Box } from '@mui/material';
import { BannerPageData } from '../../services/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';

const drawerMenuLimit = 768;

interface BannerProps {
	title: string;
	description: string;
	bannerPageData: BannerPageData;
}

interface BannerDispatchProps {
	title: string;
	description: string;
	banner: ActionCreatorsMapObject;
}

const BannerPagePC: FC<BannerProps> = ({
	title,
	description,
	bannerPageData,
}): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<BannerPC
					title={title}
					description={description}
					bannerPageData={bannerPageData}
				/>
			)}
		</>
	);
};

const BannerPageMobile: FC<BannerProps> = ({
	title,
	description,
	bannerPageData,
}): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<BannerMobile
					title={title}
					description={description}
					bannerPageData={bannerPageData}
				/>
			)}
		</>
	);
};

const BannerPage: FC<BannerDispatchProps> = ({
	title,
	description,
	banner,
}): JSX.Element => {
	const bannerPageData = useBannerPageList({ banner });
	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<BannerPagePC
				title={title}
				description={description}
				bannerPageData={bannerPageData}
			/>
			<BannerPageMobile
				title={title}
				description={description}
				bannerPageData={bannerPageData}
			/>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	banner: bindActionCreators(Api.banner, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerPage);
