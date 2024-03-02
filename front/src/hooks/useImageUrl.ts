import { ActionCreatorsMapObject } from 'redux';

interface ImageUrlProps {
	file: string;
	image: ActionCreatorsMapObject;
	path: string;
}

const useImageUrl = ({ image, file, path }: ImageUrlProps): string =>
	image.info(file, path);

export default useImageUrl;
