const divideArray = (data: any) => {
	const length = data.length;

	if (length === 1) {
		return [[data[0]], [], []];
	} else if (length === 2) {
		return [[data[0]], [data[1]], []];
	} else if (length === 3) {
		return [[data[0]], [data[1]], [data[2]]];
	} else if (length > 3) {
		const chunkSize = Math.floor(length / 3);
		const firstChunk = data.slice(0, chunkSize);
		const secondChunk = data.slice(chunkSize, chunkSize * 2);
		const thirdChunk = data.slice(chunkSize * 2);
		return [firstChunk, secondChunk, thirdChunk];
	}

	return [[], [], []];
};

export { divideArray };
