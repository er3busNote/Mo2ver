import React, { FC, useContext, ContextType, WheelEvent } from 'react';
import useDrag from '../../hooks/useDrag';
import {
	Box,
	Card,
	CardMedia,
	CardActionArea,
	IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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

const LeftArrow = () => {
	const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

	return (
		<IconButton disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
			<ArrowBackIosIcon />
		</IconButton>
	);
};

const RightArrow = () => {
	const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

	return (
		<IconButton disabled={isLastItemVisible} onClick={() => scrollNext()}>
			<ArrowForwardIosIcon />
		</IconButton>
	);
};

const CarouselSlide: FC<CarouselSlideProps> = ({ url }): JSX.Element => {
	return (
		<Card
			sx={{
				m: 1,
				width: { xs: 120, sm: 140, md: 160, lg: 180 },
				border: '2px #f0f0f0f0 solid',
			}}
		>
			<CardActionArea>
				<CardMedia
					component="img"
					sx={{ height: { xs: 100, sm: 120, md: 140, lg: 160 } }}
					image={url}
					alt="Image"
				/>
			</CardActionArea>
		</Card>
	);
};

const HorizontalScrollPC: FC = (): JSX.Element => {
	const { dragStart, dragStop, handleDrag } = useDrag();

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
		<Box onMouseLeave={dragStop}>
			<ScrollMenu
				LeftArrow={LeftArrow}
				RightArrow={RightArrow}
				onWheel={onWheel}
				onMouseDown={() => dragStart}
				onMouseUp={() => dragStop}
				onMouseMove={handleDrag}
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

export default HorizontalScrollPC;
