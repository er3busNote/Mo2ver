import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { FileData } from '@api/types';
import useBannerDisplayList from '@hooks/banner/useBannerDisplayList';
import { Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import BannerPC from './banner/BannerPC';
import BannerMobile from './banner/BannerMobile';
import PopularPC from './popular/PopularPC';
import PopularMobile from './popular/PopularMobile';
import HorizontalScroll from '@components/HorizontalScroll';
import { BrowserView, MobileView } from 'react-device-detect';

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
	return (
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
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
	);
};

const HomeMobile: FC<HomeProps> = ({
	image,
	bannerDisplayData,
}): JSX.Element => {
	return (
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
	);
};

const HomePage: FC<HomeDispatchProps> = ({ banner, image }): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const bannerDisplayData = useBannerDisplayList({ banner });
	return (
		<Paper
			sx={{ width: '100%', /*height: '105%',*/ position: 'absolute' }}
			component="div"
			square
			variant="outlined"
		>
			{isDesktop && (
				<HomePC image={image} bannerDisplayData={bannerDisplayData} />
			)}
			{isMobile && (
				<HomeMobile image={image} bannerDisplayData={bannerDisplayData} />
			)}
		</Paper>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	banner: bindActionCreators(Api.banner, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(HomePage);
