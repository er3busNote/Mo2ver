import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '../../api';
import useCSRFToken from '../../hooks/useCSRFToken';
import useCategoryList from '../../hooks/category/useCategoryList';
import CategoryPC from '../../components/admin/category/CategoryPC';
import CategoryMobile from '../../components/admin/category/CategoryMobile';
import { CategoryData } from '../../api/types';
import { CategoryFormValues } from '../../components/form/admin/types';
import { useMediaQuery } from 'react-responsive';

const drawerMenuLimit = 768;

const schema = yup
	.object()
	.shape({
		category: yup
			.string()
			.required('카테고리를 입력해주세요')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		useyn: yup.string().required(),
		level: yup.number().required(),
	})
	.required();

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

const defaultValues: CategoryFormValues = {
	category: '',
	useyn: 'Y',
	level: 1,
};

const CategoryPagePC: FC<CategoryProps> = ({
	onSubmit,
	categoryData,
}): JSX.Element => {
	const isPc = useMediaQuery({
		query: '(min-width:' + String(drawerMenuLimit + 1) + 'px)',
	});
	return (
		<>
			{isPc && <CategoryPC onSubmit={onSubmit} categoryData={categoryData} />}
		</>
	);
};

const CategoryPageMobile: FC<CategoryProps> = ({
	onSubmit,
	categoryData,
}): JSX.Element => {
	const isMobile = useMediaQuery({
		query: '(max-width:' + String(drawerMenuLimit) + 'px)',
	});
	return (
		<>
			{isMobile && (
				<CategoryMobile onSubmit={onSubmit} categoryData={categoryData} />
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
		eventForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const categoryFormData = {
			category: data.category,
			useyn: data.useyn,
			level: data.level,
		};
		console.log(categoryFormData);
		console.log(csrfData);
		if (eventForm) eventForm.preventDefault(); // 새로고침 방지
	};

	const methods = useForm<CategoryFormValues>({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema),
	});

	return (
		<FormProvider {...methods}>
			<CategoryPagePC onSubmit={submitForm} categoryData={categoryData} />
			<CategoryPageMobile onSubmit={submitForm} categoryData={categoryData} />
		</FormProvider>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoryPage);
