import React, { FC } from 'react';
import GoodsRegister from '../components/goods/GoodsRegister';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const GoodsRegisterPC: FC = (): JSX.Element => {
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
					<GoodsRegister />
				</Box>
			)}
		</>
	);
};

const GoodsRegisterMobile: FC = (): JSX.Element => {
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
					<GoodsRegister />
				</Box>
			)}
		</>
	);
};

const GoodsRegisterPage: FC = (): JSX.Element => {
	return (
		<>
			<GoodsRegisterPC />
			<GoodsRegisterMobile />
		</>
	);
};

export default GoodsRegisterPage;
