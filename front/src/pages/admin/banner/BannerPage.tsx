import React, { FC } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@store/types';
import Api from '@api/index';
import useBannerPageList from '@hooks/banner/useBannerPageList';
import BannerPC from './BannerPC';
import BannerMobile from './BannerMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
// import _ from 'lodash';

interface BannerDispatchProps {
	title: string;
	description: string;
	banner: ActionCreatorsMapObject;
}

const BannerPage: FC<BannerDispatchProps> = ({
	title,
	description,
	banner,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [bannerPageData, setPage] = useBannerPageList({ banner });
	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			{isDesktop && (
				<BannerPC
					title={title}
					description={description}
					setPage={setPage}
					bannerPageData={bannerPageData}
				/>
			)}
			{isMobile && (
				<BannerMobile
					title={title}
					description={description}
					setPage={setPage}
					bannerPageData={bannerPageData}
				/>
			)}
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	banner: bindActionCreators(Api.banner, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerPage);
