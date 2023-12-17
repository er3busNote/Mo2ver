import React, { FC } from 'react';
import GoodsDetail from '../components/goods/GoodsDetail';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const GoodsDetailPC: FC = (): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<Box
					sx={{
						width: '940px',
						display: 'inline-block',
					}}
				>
					<GoodsDetail />
				</Box>
			)}
		</>
	);
};

const GoodsDetailMobile: FC = (): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<Box
					sx={{
						width: '100%',
						display: 'inline-block',
					}}
				>
					<GoodsDetail />
				</Box>
			)}
		</>
	);
};

const GoodsDetailPage: FC = (): JSX.Element => {
	return (
		<>
			<GoodsDetailPC />
			<GoodsDetailMobile />
		</>
	);
};

export default GoodsDetailPage;
