import React, { FC, useState, useEffect, MouseEventHandler } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Card, Slide, CardMedia } from '@mui/material';

const SLIDE_INFO = [
	'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

interface ArrowProps {
	direction: string; // enum → (left / right)
	clickFunction: MouseEventHandler<HTMLDivElement>;
}

const Arrow: FC<ArrowProps> = ({ direction, clickFunction }): JSX.Element => {
	const icon =
		direction === 'left' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />;

	return (
		<Box sx={{ width: '2.5%' }} onClick={clickFunction}>
			{icon}
		</Box>
	);
};

interface CarouselSlideProps {
	url: string;
}

const CarouselSlide: FC<CarouselSlideProps> = ({ url }): JSX.Element => {
	return (
		<Card
			sx={{
				height: { xs: '250px', sm: '300px' },
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<CardMedia component="img" image={url} alt="Image" />
		</Card>
	);
};

const BannerMobile: FC = (): JSX.Element => {
	const [index, setIndex] = useState(0);
	const content = SLIDE_INFO[index];
	const numSlides = SLIDE_INFO.length;

	const [slideIn, setSlideIn] = useState(true);
	const [slideDirection, setSlideDirection] = useState<
		'left' | 'right' | 'down' | 'up'
	>('down');

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.keyCode === 39) {
				onArrowClick('right');
			}
			if (e.keyCode === 37) {
				onArrowClick('left');
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	const onArrowClick = (direction: 'left' | 'right' | 'down' | 'up') => {
		const increment = direction === 'left' ? -1 : 1;
		const newIndex = (index + increment + numSlides) % numSlides;

		const oppDirection = direction === 'left' ? 'right' : 'left';
		setSlideDirection(direction);
		setSlideIn(false);

		setTimeout(() => {
			setIndex(newIndex);
			setSlideDirection(oppDirection);
			setSlideIn(true);
		}, 300);
	};

	return (
		<React.Fragment>
			<Box sx={{ width: '100%', alignItems: 'center', display: 'inline-flex' }}>
				<Arrow direction="left" clickFunction={() => onArrowClick('left')} />
				<Slide in={slideIn} direction={slideDirection}>
					<Box sx={{ width: '95%' }}>
						<CarouselSlide url={content} />
					</Box>
				</Slide>
				<Arrow direction="right" clickFunction={() => onArrowClick('right')} />
			</Box>
		</React.Fragment>
	);
};

export default BannerMobile;
