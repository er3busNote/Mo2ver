import { SubMenuInfo } from '@/types/store';
import { CategoryDataGroup } from '@/types/api';

interface MenuProps {
	title: string;
	description: string;
	categoryData?: CategoryDataGroup;
	menus?: Array<SubMenuInfo>;
}

export type { MenuProps };
