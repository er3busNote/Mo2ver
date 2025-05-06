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
import { useIsMobile } from '@context/MobileContext';

const files: Array<FileData> = [];

interface HomeProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	bannerDisplayData: Record<string, Record<string, Array<object>>>;
}

interface HomeDispatchProps {
	title: string;
	description: string;
	banner: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

const HomePC: FC<HomeProps> = ({
	title,
	description,
	file,
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
					file={file}
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
						file={file}
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
	file,
	bannerDisplayData,
}): JSX.Element => {
	const isMobile = useIsMobile();
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
					file={file}
					bannerDisplayData={bannerDisplayData}
				/>
			</Box>
			<Divider variant="middle" />
			{isMobile ? (
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
						file={file}
						files={files}
						type="display"
					/>
				</Box>
			) : (
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
						file={file}
						files={files}
						type="display"
					/>
				</Box>
			)}
		</>
	);
};

const HomePage: FC<HomeDispatchProps> = ({
	title,
	description,
	banner,
	file,
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
					file={file}
					bannerDisplayData={bannerDisplayData}
				/>
			)}
			{isMobile && (
				<HomeMobile
					title={title}
					description={description}
					file={file}
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
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
