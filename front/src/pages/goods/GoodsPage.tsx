import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '@store/types';
import GoodsList from './GoodsList';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface GoodsProps {
	title: string;
	description: string;
}

const GoodsPC: FC<GoodsProps> = ({ title, description }): JSX.Element => {
	return (
		<Box
			sx={{
				width: '940px',
				display: 'inline-block',
			}}
		>
			<GoodsList title={title} description={description} />
		</Box>
	);
};

const GoodsMobile: FC<GoodsProps> = ({ title, description }): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<GoodsList title={title} description={description} />
		</Box>
	);
};

const GoodsPage: FC<GoodsProps> = ({ title, description }): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<>
			{isDesktop && <GoodsPC title={title} description={description} />}
			{isMobile && <GoodsMobile title={title} description={description} />}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(GoodsPage);
