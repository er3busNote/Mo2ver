import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@store/types';
import Api from '@api/index';
import { FileData } from '@api/types';
import useBannerDisplayList from '@hooks/banner/useBannerDisplayList';
import { Box, Divider, useTheme, useMediaQuery } from '@mui/material';
import BannerPC from './banner/BannerPC';
import BannerMobile from './banner/BannerMobile';
import PopularPC from './popular/PopularPC';
import PopularMobile from './popular/PopularMobile';
import HorizontalScroll from '@components/HorizontalScroll';
import { BrowserView, MobileView } from 'react-device-detect';

const files: Array<FileData> = [];

interface HomeProps {
	title: string;
	description: string;
	image: ActionCreatorsMapObject;
	bannerDisplayData: Record<string, Record<string, Array<object>>>;
}

interface HomeDispatchProps {
	title: string;
	description: string;
	banner: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

const HomePC: FC<HomeProps> = ({
	title,
	description,
	image,
	bannerDisplayData,
}): JSX.Element => {
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
				}}
			>
				<PopularPC
					title={title}
					description={description}
					image={image}
					bannerDisplayData={bannerDisplayData}
				/>
			</Box>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
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
	);
};

const HomeMobile: FC<HomeProps> = ({
	title,
	description,
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
					height: { xs: 374, sm: 396 },
				}}
			>
				<PopularMobile
					title={title}
					description={description}
					image={image}
					bannerDisplayData={bannerDisplayData}
				/>
			</Box>
			<Divider variant="middle" />
			<MobileView>
				<Box
					sx={{
						p: 2,
						pb: 12,
						width: '100%',
						bgcolor: '#fafafa',
					}}
				>
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
				<Box
					sx={{
						p: 2,
						pb: 8,
						width: '100%',
						bgcolor: '#fafafa',
					}}
				>
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

const HomePage: FC<HomeDispatchProps> = ({
	title,
	description,
	banner,
	image,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const bannerDisplayData = useBannerDisplayList({ banner });
	return (
		<Box sx={{ width: '100%', position: 'absolute' }}>
			{isDesktop && (
				<HomePC
					title={title}
					description={description}
					image={image}
					bannerDisplayData={bannerDisplayData}
				/>
			)}
			{isMobile && (
				<HomeMobile
					title={title}
					description={description}
					image={image}
					bannerDisplayData={bannerDisplayData}
				/>
			)}
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	banner: bindActionCreators(Api.banner, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
