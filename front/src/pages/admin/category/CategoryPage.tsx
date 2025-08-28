import React, { FC, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import useCSRFToken from '@hooks/useCSRFToken';
import useCategoryList from '@hooks/category/useCategoryList';
import CategoryPC from './CategoryPC';
import CategoryMobile from './CategoryMobile';
import { useTheme, useMediaQuery } from '@mui/material';
import { CategoryFormValues } from '../../../types/admin/form';

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

interface CategoryDispatchProps {
	member: ActionCreatorsMapObject;
	category: ActionCreatorsMapObject;
}

const defaultValues: CategoryFormValues = {
	category: '',
	useyn: 'Y',
	level: 1,
};

const CategoryPage: FC<CategoryDispatchProps> = ({
	member,
	category,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
			{isDesktop && (
				<CategoryPC onSubmit={submitForm} categoryData={categoryData} />
			)}
			{isMobile && (
				<CategoryMobile onSubmit={submitForm} categoryData={categoryData} />
			)}
		</FormProvider>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	member: bindActionCreators(Api.member, dispatch),
	category: bindActionCreators(Api.category, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoryPage);
