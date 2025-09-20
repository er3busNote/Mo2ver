import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { CategoryData } from '@/types/api';
import CategoryService from '@services/CategoryService';

interface CategoryListProps {
	category: ActionCreatorsMapObject;
}

const useCategoryList = ({ category }: CategoryListProps) => {
	const service = new CategoryService(category);
	return useQuery<CategoryData[]>({
		queryKey: ['categoryList'],
		queryFn: () => service.getCategoryList(),
		staleTime: 60 * 1000,
	});
};

export default useCategoryList;
