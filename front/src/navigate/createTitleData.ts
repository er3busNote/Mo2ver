import { TitleInfo } from '@store/types';

type TitleDataParams = {
	title: string;
	description: string;
	prevTitle?: string;
	prevDescription?: string;
};

const createTitleData = ({
	title,
	description,
	prevTitle,
	prevDescription,
}: TitleDataParams): TitleInfo => {
	return {
		title,
		description,
		prevTitle: prevTitle ?? title,
		prevDescription: prevDescription ?? description,
	};
};

export default createTitleData;
