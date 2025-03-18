import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@store/types';
import Api from '@api/index';
import UserDetailPC from './UserDetailPC';
import UserDetailMobile from './UserDetailMobile';
import { Box, Paper, useTheme, useMediaQuery } from '@mui/material';

interface UserProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
}

const UserPC: FC<UserProps> = ({ title, description, member }): JSX.Element => {
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
				<UserDetailPC title={title} description={description} member={member} />
			</Box>
		</>
	);
};

const UserMobile: FC<UserProps> = ({
	title,
	description,
	member,
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
			/>
		</Box>
	);
};

const UserPage: FC<UserProps> = ({
	title,
	description,
	member,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<>
			{isDesktop && (
				<UserPC title={title} description={description} member={member} />
			)}
			{isMobile && (
				<UserMobile title={title} description={description} member={member} />
			)}
		</>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
