import { ActionCreatorsMapObject } from 'redux';

interface ImageUrlProps {
	attachFile: string;
	file: ActionCreatorsMapObject;
}

const useImageUrl = ({ file, attachFile }: ImageUrlProps): string =>
	file.info(attachFile);

export default useImageUrl;
