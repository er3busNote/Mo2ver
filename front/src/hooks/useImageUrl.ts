import { ActionCreatorsMapObject } from 'redux';

interface ImageUrlProps {
	file: string;
	image: ActionCreatorsMapObject;
}

const useImageUrl = ({ image, file }: ImageUrlProps): string =>
	image.info(file);

export default useImageUrl;
