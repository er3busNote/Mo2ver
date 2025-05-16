const mergeFile = (fileList1: FileList, fileList2: FileList): FileList => {
	const dataTransfer = new DataTransfer();

	Array.from(fileList1).forEach((file) => dataTransfer.items.add(file));
	Array.from(fileList2).forEach((file) => dataTransfer.items.add(file));

	return dataTransfer.files;
};

const removeFile = (fileList: FileList, indexToRemove: number): FileList => {
	const dataTransfer = new DataTransfer();

	Array.from(fileList).forEach((file, index) => {
		if (index !== indexToRemove) {
			dataTransfer.items.add(file);
		}
	});

	return dataTransfer.files;
};

const toFileList = (files: File[]): FileList => {
	const dataTransfer = new DataTransfer();
	files.forEach((file) => dataTransfer.items.add(file));
	return dataTransfer.files;
};

const downloadFile = (blob: Blob, filename: string) => {
	const url = window.URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
	window.URL.revokeObjectURL(url);
};

export { mergeFile, removeFile, toFileList, downloadFile };
