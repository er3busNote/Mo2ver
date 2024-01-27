import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import GoodsDetail from '../components/goods/GoodsDetail';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

interface GoodsDetailProps {
	title: string;
	description: string;
}

const GoodsDetailPC: FC<GoodsDetailProps> = ({
	title,
	description,
}): JSX.Element => {
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
					<GoodsDetail title={title} description={description} />
				</Box>
			)}
		</>
	);
};

const GoodsDetailMobile: FC<GoodsDetailProps> = ({
	title,
	description,
}): JSX.Element => {
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
					<GoodsDetail title={title} description={description} />
				</Box>
			)}
		</>
	);
};

const GoodsDetailPage: FC<GoodsDetailProps> = ({
	title,
	description,
}): JSX.Element => {
	return (
		<>
			<GoodsDetailPC title={title} description={description} />
			<GoodsDetailMobile title={title} description={description} />
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(GoodsDetailPage);
