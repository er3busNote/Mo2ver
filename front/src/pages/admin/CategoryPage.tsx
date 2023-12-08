import React, { FC, BaseSyntheticEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../services/api';
import useCSRFToken from '../../hooks/useCSRFToken';
import useCategoryList from '../../hooks/useCategoryList';
import CategoryPagePC from './pc/CategoryPagePC';
import CategoryPageMobile from './mobile/CategoryPageMobile';
import { CategoryData } from '../../services/types';
import { CategoryFormValues } from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

interface CategoryProps {
	onSubmit: (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
	categoryData: Array<CategoryData>;
}

interface CategoryDispatchProps {
	member: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
}

const CategoryPC: FC<CategoryProps> = ({
	onSubmit,
	categoryData,
}): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && (
				<CategoryPagePC onSubmit={onSubmit} categoryData={categoryData} />
			)}
		</>
	);
};

const CategoryMobile: FC<CategoryProps> = ({
	onSubmit,
	categoryData,
}): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<CategoryPageMobile onSubmit={onSubmit} categoryData={categoryData} />
			)}
		</>
	);
};

const CategoryPage: FC<CategoryDispatchProps> = ({
	member,
	category,
}): JSX.Element => {
	const csrfData = useCSRFToken({ member });
	const categoryData = useCategoryList({ category });
	const submitForm = (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => {
		const categoryFormData = {
			category: data.category,
			useyn: data.useyn,
			level: data.level,
		};
		console.log(categoryFormData);
		console.log(csrfData);
		if (event) event.preventDefault(); // 새로고침 방지
	};
	return (
		<>
			<CategoryPC onSubmit={submitForm} categoryData={categoryData} />
			<CategoryMobile onSubmit={submitForm} categoryData={categoryData} />
		</>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoryPage);
