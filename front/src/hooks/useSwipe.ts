import React, { useState, ContextType, TouchEvent } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

const useSwipe = () => {
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);

	const minSwipeDistance = 50;

	const onTouchStart = () => (ev: TouchEvent) => {
		setTouchEnd(null);
		setTouchStart(ev.targetTouches[0].clientX);
	};

	const onTouchMove = () => (ev: TouchEvent) => {
		setTouchEnd(ev.targetTouches[0].clientX);
	};

	const onTouchEnd = (apiObj: scrollVisibilityApiType) => () => {
		if (!touchStart || !touchEnd) return false;
		const distance = touchStart - touchEnd;
		const isSwipe = Math.abs(distance) > minSwipeDistance;
		const isLeftSwipe = distance < minSwipeDistance;
		console.log({ isSwipe, isLeftSwipe });
		if (isSwipe) {
			if (isLeftSwipe) {
				apiObj.scrollPrev();
			} else {
				apiObj.scrollNext();
			}
		}
	};

	return { onTouchStart, onTouchEnd, onTouchMove };
};

export default useSwipe;
