import React, { FC } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@/types/store';
import Api from '@api/index';
import useCSRFToken from '@hooks/member/query/useCSRFToken';
import useSearchMyGoodsList from '@hooks/search/query/useSearchMyGoodsList';
import UserDetailPC from './UserDetailPC';
import UserDetailMobile from './UserDetailMobile';
import { Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import { UserProps } from '@/types/user';

interface UserDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	search: ActionCreatorsMapObject;
}

const UserPC: FC<UserProps> = ({
	title,
	description,
	member,
	goodsData,
	setGoodsPage,
	setSearchGoodsData,
}): JSX.Element => {
	return (
		<>
			<Box>
				<Paper
					sx={{
						width: '100%',
						height: '300px',
						position: 'absolute',
						opacity: 0.8,
						background:
							'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(83,10,124,1) 56%, rgba(136,15,148,1) 100%)',
					}}
				/>
			</Box>
			<Box
				sx={{
					width: '940px',
					display: 'inline-block',
				}}
			>
				<UserDetailPC
					title={title}
					description={description}
					member={member}
					goodsData={goodsData}
					setGoodsPage={setGoodsPage}
					setSearchGoodsData={setSearchGoodsData}
				/>
			</Box>
		</>
	);
};

const UserMobile: FC<UserProps> = ({
	title,
	description,
	member,
	goodsData,
	setGoodsPage,
	setSearchGoodsData,
}): JSX.Element => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'inline-block',
			}}
		>
			<UserDetailMobile
				title={title}
				description={description}
				member={member}
				goodsData={goodsData}
				setGoodsPage={setGoodsPage}
				setSearchGoodsData={setSearchGoodsData}
			/>
		</Box>
	);
};

const UserPage: FC<UserDispatchProps> = ({
	title,
	description,
	member,
	search,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { data: csrfData } = useCSRFToken({ member });
	const {
		data: goodsData,
		setPage: setGoodsPage,
		setSearchData: setSearchGoodsData,
	} = useSearchMyGoodsList({ search, csrfData });

	return (
		<>
			{isDesktop && (
				<UserPC
					title={title}
					description={description}
					member={member}
					goodsData={goodsData}
					setGoodsPage={setGoodsPage}
					setSearchGoodsData={setSearchGoodsData}
				/>
			)}
			{isMobile && (
				<UserMobile
					title={title}
					description={description}
					member={member}
					goodsData={goodsData}
					setGoodsPage={setGoodsPage}
					setSearchGoodsData={setSearchGoodsData}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	search: bindActionCreators(Api.search, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
