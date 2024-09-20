import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import Api from '../api';
import UserDetailPC from '../components/user/UserDetailPC';
import UserDetailMobile from '../components/user/UserDetailMobile';
import { Box, Paper } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

interface UserProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
}

const UserPC: FC<UserProps> = ({ title, description, member }): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
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
						/>
					</Box>
				</>
			)}
		</>
	);
};

const UserMobile: FC<UserProps> = ({
	title,
	description,
	member,
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
					<UserDetailMobile
						title={title}
						description={description}
						member={member}
					/>
				</Box>
			)}
		</>
	);
};

const UserPage: FC<UserProps> = ({
	title,
	description,
	member,
}): JSX.Element => {
	return (
		<>
			<UserPC title={title} description={description} member={member} />
			<UserMobile title={title} description={description} member={member} />
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
