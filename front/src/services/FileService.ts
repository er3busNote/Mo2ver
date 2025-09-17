import { ActionCreatorsMapObject } from 'redux';
import { FileData, CSRFData } from '@/types/api';

export default class FileService {
	constructor(private file: ActionCreatorsMapObject) {}

	fileUpload = async (
		files: FileList,
		csrfData?: CSRFData
	): Promise<FileData[]> => {
		const formData = new FormData();
		Array.from(files).forEach((fileData) => formData.append('files', fileData));
		return await this.file.upload(formData, csrfData);
	};
}
