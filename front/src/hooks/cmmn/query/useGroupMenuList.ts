import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { SubMenuInfo } from '@/types/store';
import MenuService from '@services/MenuService';

interface GroupMenuProps {
	menu: ActionCreatorsMapObject;
	menuType: number;
}

const useGroupMenuList = ({ menu, menuType }: GroupMenuProps) => {
	const service = new MenuService(menu);
	return useQuery<SubMenuInfo[]>({
		queryKey: ['groupMenuList', menuType],
		queryFn: () => service.getMenuList(menuType),
		staleTime: 5 * 60 * 1000,
	});
};

export default useGroupMenuList;
