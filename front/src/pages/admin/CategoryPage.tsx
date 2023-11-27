import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import useCSRFToken from '../../hooks/useCSRFToken';
import CategoryPagePC from './pc/CategoryPagePC';
import CategoryPageMobile from './mobile/CategoryPageMobile';
import { CategoryFormValues } from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

interface CategoryProps {
	onSubmit: (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
}

interface CategoryDispatchProps {
	member: ActionCreatorsMapObject;
}

const CategoryPC: FC<CategoryProps> = ({ onSubmit }): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return <>{isPc && <CategoryPagePC onSubmit={onSubmit} />}</>;
};

const CategoryMobile: FC<CategoryProps> = ({ onSubmit }): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return <>{isMobile && <CategoryPageMobile onSubmit={onSubmit} />}</>;
};

const CategoryPage: FC<CategoryDispatchProps> = ({ member }): JSX.Element => {
	const [csrfData, fetchCSRFTokenData] = useCSRFToken({ member });
	const submitForm = (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		fetchCSRFTokenData();
		const categoryData = {
			category: data.category,
			useyn: data.useyn,
			level: data.level,
		};
		console.log(categoryData);
		console.log(csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
	return (
		<>
			<CategoryPC onSubmit={submitForm} />
			<CategoryMobile onSubmit={submitForm} />
		</>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoryPage);
