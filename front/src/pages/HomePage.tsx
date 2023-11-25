import React, { FC } from 'react';
import { Paper, Box } from '@mui/material';
import BannerPC from '../components/banner/BannerPC';
import BannerMobile from '../components/banner/BannerMobile';
import PopularPC from '../components/banner/PopularPC';
import PopularMobile from '../components/banner/PopularMobile';
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
							height: 450,
						}}
					>
						<PopularMobile />
					</Box>
				</>
			)}
		</>
	);
};

const HomePage: FC = (): JSX.Element => {
	return (
		<Paper sx={{ height: '100%' }} component="div" square variant="outlined">
			<HomePC />
			<HomeMobile />
		</Paper>
	);
};

export default HomePage;
