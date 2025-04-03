const not = <T>(source: readonly T[], target: readonly T[]) => {
	return source.filter((value) => target.indexOf(value) === -1);
};
const intersection = <T>(source: readonly T[], target: readonly T[]) => {
	return source.filter((value) => target.indexOf(value) !== -1);
};

const union = <T, K extends keyof T>(
	target: readonly T[],
	source: readonly T[],
	key: K
) => {
	return target.concat(
		source.filter(
			(sourceItem) =>
				!target.some((targetItem) => targetItem[key] === sourceItem[key])
		)
	);
};

export { not, intersection, union };
