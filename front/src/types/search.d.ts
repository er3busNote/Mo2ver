import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@/types/api';

interface SearchItemsProps {
	goodsRankData?: Array<GoodsData>;
}

interface SearchProps extends SearchItemsProps {
	title: string;
	description: string;
	search: ActionCreatorsMapObject;
	recommend: ActionCreatorsMapObject;
}

interface SearchItemsMobileProps extends SearchProps {
	openSearch: boolean;
	setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

export type { SearchProps, SearchItemsProps, SearchItemsMobileProps };
