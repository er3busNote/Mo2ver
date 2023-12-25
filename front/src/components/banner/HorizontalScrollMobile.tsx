import React, { FC, ContextType, WheelEvent } from 'react';
import useSwipe from '../../hooks/useSwipe';
import usePreventBodyScroll from '../../hooks/usePreventBodyScroll';
import { Box, Card, CardMedia, CardActionArea } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

const IMAGE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

interface CarouselSlideProps {
	url: string;
}

const CarouselSlide: FC<CarouselSlideProps> = ({ url }): JSX.Element => {
	return (
		<Card sx={{ m: 2, width: 100, border: '2px #f0f0f0f0 solid' }}>
			<CardActionArea>
				<CardMedia component="img" height="100" image={url} alt="Image" />
			</CardActionArea>
		</Card>
	);
};

const HorizontalScrollMobile: FC = (): JSX.Element => {
	const { onTouchEnd, onTouchMove, onTouchStart } = useSwipe();
	const { disableScroll, enableScroll } = usePreventBodyScroll();

	const onWheel = (apiObj: scrollVisibilityApiType, ev: WheelEvent): void => {
		const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

		if (isThouchpad) {
			ev.stopPropagation();
			return;
		}

		if (ev.deltaY < 0) {
			apiObj.scrollNext();
		} else if (ev.deltaY > 0) {
			apiObj.scrollPrev();
		}
	};

	return (
		<Box onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
			<ScrollMenu
				onWheel={onWheel}
				onTouchEnd={onTouchEnd}
				onTouchMove={onTouchMove}
				onTouchStart={onTouchStart}
			>
				{IMAGE_INFO.map((image: string, index: number) => (
					<Box key={index}>
						<CarouselSlide url={image} />
					</Box>
				))}
			</ScrollMenu>
		</Box>
	);
};

export default HorizontalScrollMobile;
