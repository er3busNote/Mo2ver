import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { FileData, CSRFData } from '@/types/api';
import FileService from '@services/FileService';

interface FileProps {
	file: ActionCreatorsMapObject;
	csrfData?: CSRFData;
}

interface FileResultProps {
	data: FileData[];
	files: FileList;
	setFiles: Dispatch<SetStateAction<FileList>>;
}

const useFileInfo = ({ file, csrfData }: FileProps): FileResultProps => {
	const [files, setFiles] = useState<FileList>(new DataTransfer().files);

	const service = new FileService(file);
	const { mutate, data = [] } = useMutation<FileData[], Error>({
		mutationFn: () => service.fileUpload(files, csrfData),
	});

	useEffect(() => {
		if (files && files.length > 0) {
			mutate();
		}
	}, [files, mutate]);

	return { data, files, setFiles };
};

export default useFileInfo;
