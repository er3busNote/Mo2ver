import React, { FC } from 'react';
import GoodsList from '../components/goods/GoodsList';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const DiscountPC: FC = (): JSX.Element => {
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
					<GoodsList />
				</Box>
			)}
		</>
	);
};

const DiscountMobile: FC = (): JSX.Element => {
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
					<GoodsList />
				</Box>
			)}
		</>
	);
};

const DiscountPage: FC = (): JSX.Element => {
	return (
		<>
			<DiscountPC />
			<DiscountMobile />
		</>
	);
};

export default DiscountPage;
