import { difference, intersection, intersectionBy, unionBy } from 'lodash';

const not = <T>(source: readonly T[], target: readonly T[]) => {
	return difference(source, target);
};
const intersect = <T>(source: readonly T[], target: readonly T[]) => {
	return intersection(source, target);
};

const intersectBy = <T, K extends keyof T>(
	source: readonly T[],
	target: readonly T[],
	key: K
) => {
	return intersectionBy(source, target, key);
};
const union = <T, K extends keyof T>(
	target: readonly T[],
	source: readonly T[],
	key: K
) => {
	return unionBy(target, source, key);
};

export { not, intersect, intersectBy, union };
