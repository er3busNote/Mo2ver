const divideArray = <T>(data: T[], count: number): T[][] => {
	const result: T[][] = [];
	const baseSize = Math.floor(data.length / count);
	let remainder = data.length % count;

	let start = 0;

	for (let i = 0; i < count; i++) {
		const extra = remainder > 0 ? 1 : 0;
		const end = start + baseSize + extra;
		result.push(data.slice(start, end));
		start = end;
		remainder--;
	}

	return result;
};

export { divideArray };
