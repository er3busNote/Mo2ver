import React, { FC } from 'react';
import { Paper, Box } from '@mui/material';
import BannerPC from '../components/banner/BannerPC';
import BannerMobile from '../components/banner/BannerMobile';
import PopularPC from '../components/banner/PopularPC';
import PopularMobile from '../components/banner/PopularMobile';
import HorizontalScroll from '../components/banner/HorizontalScroll';
import { BrowserView, MobileView } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const HomePC: FC = (): JSX.Element => {
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
						<PopularPC />
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
							<HorizontalScroll slidesPerView={5} />
						</Box>
					</Box>
				</>
			)}
		</>
	);
};

const HomeMobile: FC = (): JSX.Element => {
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
						<PopularMobile />
					</Box>
					<MobileView>
						<Box sx={{ px: 4, pb: 12, width: '100%', bgcolor: '#fafafa' }}>
							<HorizontalScroll slidesPerView={2} />
						</Box>
					</MobileView>
					<BrowserView>
						<Box sx={{ p: 2, pb: 8, width: '100%', bgcolor: '#fafafa' }}>
							<HorizontalScroll slidesPerView={3} />
						</Box>
					</BrowserView>
				</>
			)}
		</>
	);
};

const HomePage: FC = (): JSX.Element => {
	return (
		<Paper
			sx={{ width: '100%', /*height: '105%',*/ position: 'absolute' }}
			component="div"
			square
			variant="outlined"
		>
			<HomePC />
			<HomeMobile />
		</Paper>
	);
};

export default HomePage;
