import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileData, CSRFData } from '../../api/types';

interface FileProps {
	image: ActionCreatorsMapObject;
	csrfData: CSRFData;
}

const useFileInfo = ({
	image,
	csrfData,
}: FileProps): [Array<FileData>, Dispatch<SetStateAction<FileList>>] => {
	const [files, setFiles] = useState<FileList>(new DataTransfer().files);
	const [data, setData] = useState<Array<FileData>>([
		{
			fileAttachCode: '',
			fileName: '',
			fileType: '',
			fileSize: 0,
			fileExtension: '',
		},
	]);

	const fetchAndSetData = useCallback(async () => {
		if (files && files.length > 0) {
			const formData = new FormData();
			Array.from(files).forEach((file) => {
				formData.append('files', file);
			});
			const data = await image.upload(formData, csrfData);
			setData(data);
		}
	}, [files]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setFiles];
};

export default useFileInfo;
