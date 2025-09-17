import { ActionCreatorsMapObject } from 'redux';
import { SubMenuInfo } from '@/types/store';

export default class MenuService {
	constructor(private menu: ActionCreatorsMapObject) {}

	getMenuList = async (menuType: number): Promise<SubMenuInfo[]> => {
		return await this.menu.list(menuType);
	};
}
