import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import GoodsRegister from '../components/goods/GoodsRegister';
import { Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const steps = ['상품등록', '등록완료'];

interface GoodsRegisterProps {
	description: string;
}

const GoodsRegisterPC: FC<GoodsRegisterProps> = ({
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
					<GoodsRegister description={description} steps={steps} />
				</Box>
			)}
		</>
	);
};

const GoodsRegisterMobile: FC<GoodsRegisterProps> = ({
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
					<GoodsRegister description={description} steps={steps} />
				</Box>
			)}
		</>
	);
};

const GoodsRegisterPage: FC<GoodsRegisterProps> = ({
	description,
}): JSX.Element => {
	return (
		<>
			<GoodsRegisterPC description={description} />
			<GoodsRegisterMobile description={description} />
		</>
	);
};

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

export default connect(mapStateToProps, null)(GoodsRegisterPage);
