import React, { FC, useState, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '../store/types';
import Api from '../api';
import useCSRFToken from '../hooks/useCSRFToken';
import GoodsRegister from '../components/goods/GoodsRegister';
import { Box } from '@mui/material';
import { FileData } from '../api/types';
import { RegisterFormValues } from '../components/form/types';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const steps = ['상품등록', '등록완료'];

interface GoodsRegisterProps {
	description: string;
	image: ActionCreatorsMapObject;
	onSubmit: (
		data: RegisterFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface GoodsRegisterDispatchProps {
	description: string;
	member: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
}

const GoodsRegisterPC: FC<GoodsRegisterProps> = ({
	description,
	image,
	onSubmit,
}): JSX.Element => {
	const [files, setFiles] = useState<Array<FileData>>();
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
					<GoodsRegister
						description={description}
						steps={steps}
						image={image}
						setFiles={setFiles}
						onSubmit={onSubmit}
					/>
				</Box>
			)}
		</>
	);
};

const GoodsRegisterMobile: FC<GoodsRegisterProps> = ({
	description,
	image,
	onSubmit,
}): JSX.Element => {
	const [files, setFiles] = useState<Array<FileData>>();
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
					<GoodsRegister
						description={description}
						steps={steps}
						image={image}
						setFiles={setFiles}
						onSubmit={onSubmit}
					/>
				</Box>
			)}
		</>
	);
};

const GoodsRegisterPage: FC<GoodsRegisterDispatchProps> = ({
	description,
	member,
	image,
}): JSX.Element => {
	const navigate = useNavigate();
	const csrfData = useCSRFToken({ member });
	const submitForm = async (
		data: RegisterFormValues,
		registerForm?: BaseSyntheticEvent<object, any, any>
	) => {
		console.log(csrfData);
		if (registerForm) registerForm.preventDefault(); // 새로고침 방지
		navigate('/register');
	};
	return (
		<>
			<GoodsRegisterPC
				description={description}
				image={image}
				onSubmit={submitForm}
			/>
			<GoodsRegisterMobile
				description={description}
				image={image}
				onSubmit={submitForm}
			/>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsRegisterPage);
