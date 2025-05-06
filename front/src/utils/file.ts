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

export { mergeFile, removeFile };
