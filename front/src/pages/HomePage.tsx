import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../api';
import { FileData } from '../api/types';
import useBannerDisplayList from '../hooks/banner/useBannerDisplayList';
import { Paper, Box } from '@mui/material';
import BannerPC from '../components/banner/BannerPC';
import BannerMobile from '../components/banner/BannerMobile';
import PopularPC from '../components/banner/PopularPC';
import PopularMobile from '../components/banner/PopularMobile';
import HorizontalScroll from '../components/HorizontalScroll';
import { BrowserView, MobileView } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const files: Array<FileData> = [];

interface HomeProps {
	image: ActionCreatorsMapObject;
	bannerDisplayData: Record<string, Record<string, Array<object>>>;
}

interface HomeDispatchProps {
	banner: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

const HomePC: FC<HomeProps> = ({ image, bannerDisplayData }): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<>
					<BannerPC />
					<Box
						sx={{
							p: 2,
							width: '930px',
							display: 'inline-flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							height: 450,
						}}
					>
						<PopularPC bannerDisplayData={bannerDisplayData} />
					</Box>
					<Box
						sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
					>
						<Box
							sx={{
								p: 2,
								pb: 8,
								width: '930px',
								bgcolor: '#fafafa',
							}}
						>
							<HorizontalScroll
								slidesPerView={5}
								spaceBetween={30}
								image={image}
								files={files}
								type="display"
							/>
						</Box>
					</Box>
				</>
			)}
		</>
	);
};

const HomeMobile: FC<HomeProps> = ({
	image,
	bannerDisplayData,
}): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<>
					<BannerMobile />
					<Box
						sx={{
							p: 2,
							width: '100%',
							display: 'inline-flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							height: { xs: 362, sm: 396 },
						}}
					>
						<PopularMobile bannerDisplayData={bannerDisplayData} />
					</Box>
					<MobileView>
						<Box sx={{ p: 2, pb: 12, width: '100%', bgcolor: '#fafafa' }}>
							<HorizontalScroll
								slidesPerView={2}
								spaceBetween={30}
								image={image}
								files={files}
								type="display"
							/>
						</Box>
					</MobileView>
					<BrowserView>
						<Box sx={{ p: 2, pb: 8, width: '100%', bgcolor: '#fafafa' }}>
							<HorizontalScroll
								slidesPerView={3}
								spaceBetween={30}
								image={image}
								files={files}
								type="display"
							/>
						</Box>
					</BrowserView>
				</>
			)}
		</>
	);
};

const HomePage: FC<HomeDispatchProps> = ({ banner, image }): JSX.Element => {
	const bannerDisplayData = useBannerDisplayList({ banner });
	return (
		<Paper
			sx={{ width: '100%', /*height: '105%',*/ position: 'absolute' }}
			component="div"
			square
			variant="outlined"
		>
			<HomePC image={image} bannerDisplayData={bannerDisplayData} />
			<HomeMobile image={image} bannerDisplayData={bannerDisplayData} />
		</Paper>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	banner: bindActionCreators(Api.banner, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(HomePage);
