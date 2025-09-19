import { ActionCreatorsMapObject } from 'redux';

interface HomeProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	bannerDisplayData?: Record<string, Record<string, Array<object>>>;
}

interface PopularProps {
	title: string;
	description: string;
	file: ActionCreatorsMapObject;
	bannerDisplayData?: Record<string, Record<string, Array<object>>>;
}

export type { HomeProps, PopularProps };
