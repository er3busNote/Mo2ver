import { difference, intersection, unionBy } from 'lodash';

const not = <T>(source: readonly T[], target: readonly T[]) => {
	return difference(source, target);
};
const intersect = <T>(source: readonly T[], target: readonly T[]) => {
	return intersection(source, target);
};

const union = <T, K extends keyof T>(
	target: readonly T[],
	source: readonly T[],
	key: K
) => {
	return unionBy(target, source, key);
};

export { not, intersect, union };
