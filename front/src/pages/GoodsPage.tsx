import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import GoodsList from '../components/goods/GoodsList';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

interface GoodsProps {
	description: string;
}

const GoodsPC: FC<GoodsProps> = ({ description }): JSX.Element => {
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
					<GoodsList description={description} />
				</Box>
			)}
		</>
	);
};

const GoodsMobile: FC<GoodsProps> = ({ description }): JSX.Element => {
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
					<GoodsList description={description} />
				</Box>
			)}
		</>
	);
};

const GoodsPage: FC<GoodsProps> = ({ description }): JSX.Element => {
	return (
		<>
			<GoodsPC description={description} />
			<GoodsMobile description={description} />
		</>
	);
};

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(GoodsPage);
