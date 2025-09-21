import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { CategoryData } from '@/types/api';
import CategoryService from '@services/CategoryService';

interface CategoryInfoProps {
	categoryLevel: 1 | 2 | 3;
	categoryInfo?: string;
	category: ActionCreatorsMapObject;
}

const useCategoryInfo = ({
	categoryLevel,
	categoryInfo,
	category,
}: CategoryInfoProps) => {
	const service = new CategoryService(category);
	return useQuery<CategoryData[]>({
		queryKey: ['categoryInfo', categoryLevel, categoryInfo],
		queryFn: () => service.getCategoryInfo(categoryLevel, categoryInfo),
		staleTime: 60 * 1000,
		placeholderData: keepPreviousData,
	});
};

export default useCategoryInfo;
