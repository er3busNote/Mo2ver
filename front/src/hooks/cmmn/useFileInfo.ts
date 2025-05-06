import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileData, CSRFData } from '@api/types';

interface FileProps {
	file: ActionCreatorsMapObject;
	csrfData: CSRFData;
}

interface FileResultProps {
	data: Array<FileData>;
	files: FileList;
	setFiles: Dispatch<SetStateAction<FileList>>;
}

const useFileInfo = ({ file, csrfData }: FileProps): FileResultProps => {
	const [files, setFiles] = useState<FileList>(new DataTransfer().files);
	const [data, setData] = useState<Array<FileData>>([]);

	const fetchAndSetData = useCallback(async () => {
		if (files && files.length > 0) {
			const formData = new FormData();
			Array.from(files).forEach((fileData) => {
				formData.append('files', fileData);
			});
			const data = await file.upload(formData, csrfData);
			setData(data);
		} else setData([]);
	}, [files, csrfData.csrfToken]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return { data, files, setFiles };
};

export default useFileInfo;
