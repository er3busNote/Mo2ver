import React, {
	useRef,
	useState,
	useCallback,
	ContextType,
	MouseEvent,
} from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

const useDrag = () => {
	const [clicked, setClicked] = useState(false);
	const [dragging, setDragging] = useState(false);
	const position = useRef(0);

	const dragStart = useCallback((ev: MouseEvent) => {
		position.current = ev.clientX;
		setClicked(true);
	}, []);

	const dragStop = useCallback(
		() =>
			// NOTE: need some delay so item under cursor won't be clicked
			window.requestAnimationFrame(() => {
				setDragging(false);
				setClicked(false);
			}),
		[]
	);

	const dragMove = (ev: MouseEvent, cb: (posDif: number) => void) => {
		const newDiff = position.current - ev.clientX;

		const movedEnough = Math.abs(newDiff) > 5;

		if (clicked && movedEnough) {
			setDragging(true);
		}

		if (dragging && movedEnough) {
			position.current = ev.clientX;
			cb(newDiff);
		}
	};

	const handleDrag =
		({ scrollContainer }: scrollVisibilityApiType) =>
		(ev: MouseEvent) =>
			dragMove(ev, (posDiff) => {
				if (scrollContainer.current) {
					scrollContainer.current.scrollLeft += posDiff;
				}
			});

	return {
		dragStart,
		dragStop,
		dragMove,
		handleDrag,
	};
};

export default useDrag;
