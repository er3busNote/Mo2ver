import { BaseSyntheticEvent } from 'react';
import { CategoryData } from '@/types/api';
import { CategoryFormValues } from '@/types/admin/form';

interface CategoryProps {
	onSubmit: (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any> | undefined
	) => void;
	categoryData: Array<CategoryData>;
}

export type { CategoryProps };
