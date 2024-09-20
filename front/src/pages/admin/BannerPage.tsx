import React, { FC, Dispatch, SetStateAction } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import Api from '../../api';
import useBannerPageList from '../../hooks/banner/useBannerPageList';
import BannerPC from '../../components/admin/banner/BannerPC';
import BannerMobile from '../../components/admin/banner/BannerMobile';
import { Box } from '@mui/material';
import { BannerPageData } from '../../api/types';
import { useMediaQuery } from 'react-responsive';
// import _ from 'lodash';

const drawerMenuLimit = 768;

interface BannerProps {
	title: string;
	description: string;
	setPage: Dispatch<SetStateAction<number>>;
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
	setPage,
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
					setPage={setPage}
					bannerPageData={bannerPageData}
				/>
			)}
		</>
	);
};

const BannerPageMobile: FC<BannerProps> = ({
	title,
	description,
	setPage,
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
					setPage={setPage}
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
	const [bannerPageData, setPage] = useBannerPageList({ banner });
	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			<BannerPagePC
				title={title}
				description={description}
				setPage={setPage}
				bannerPageData={bannerPageData}
			/>
			<BannerPageMobile
				title={title}
				description={description}
				setPage={setPage}
				bannerPageData={bannerPageData}
			/>
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
