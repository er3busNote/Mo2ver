import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { CategoryDataGroup } from '@/types/api';
import CategoryService from '@services/CategoryService';

interface CategoryListProps {
	category: ActionCreatorsMapObject;
}

const useCategoryGroupList = ({ category }: CategoryListProps) => {
	const service = new CategoryService(category);
	return useQuery<CategoryDataGroup>({
		queryKey: ['categoryGroupList'],
		queryFn: () => service.getCategoryGroupList(),
		staleTime: 60 * 1000,
	});
};

export default useCategoryGroupList;
