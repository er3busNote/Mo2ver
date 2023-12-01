import React, { FC, useState, useEffect /*, MouseEventHandler*/ } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
	Box,
	Grid,
	Card,
	Slide,
	Paper,
	IconButton,
	Typography,
	CardMedia,
	Breadcrumbs,
} from '@mui/material';
import {
	SxProps,
	Theme,
	createTheme,
	ThemeProvider,
} from '@mui/material/styles';

const SLIDE_INFO = [
	'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

/*
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
*/

const darkTheme = createTheme({ palette: { mode: 'dark' } });

interface ArrowBoxProps {
	index: number;
	total: number;
	onArrowClick: (direction: 'left' | 'right' | 'down' | 'up') => void;
}

const ArrowBox: FC<ArrowBoxProps> = ({
	index,
	total,
	onArrowClick,
}): JSX.Element => {
	const icon: SxProps<Theme> = {
		mb: 0.3,
		fontSize: '20px',
		fontWeight: 'bold',
	};
	const font: SxProps<Theme> = {
		fontSize: '16px',
		fontWeight: 'bold',
	};
	return (
		<Paper
			elevation={0}
			sx={{
				mr: 20,
				mb: 6,
				bgcolor: '#000',
				opacity: 0.6,
				position: 'absolute',
				alignSelf: 'flex-end',
				borderRadius: 20,
			}}
		>
			<ThemeProvider theme={darkTheme}>
				<Box sx={{ px: '20px', py: '8px' }}>
					<Grid container spacing={1}>
						<Grid item>
							<IconButton onClick={() => onArrowClick('left')} sx={{ p: 0 }}>
								<ArrowBackIosIcon sx={icon} />
							</IconButton>
						</Grid>
						<Grid item>
							<Breadcrumbs sx={font} aria-label="breadcrumb">
								<Typography align="center" sx={{ color: '#fff', ...font }}>
									{index + 1}
								</Typography>
								<Typography align="center" sx={font}>
									{total}
								</Typography>
							</Breadcrumbs>
						</Grid>
						<Grid item>
							<IconButton onClick={() => onArrowClick('right')} sx={{ p: 0 }}>
								<ArrowForwardIosIcon sx={icon} />
							</IconButton>
						</Grid>
					</Grid>
				</Box>
			</ThemeProvider>
		</Paper>
	);
};

interface CarouselSlideProps {
	url: string;
}

const CarouselSlide: FC<CarouselSlideProps> = ({ url }): JSX.Element => {
	return (
		<Card
			sx={{
				height: '450px',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<CardMedia component="img" image={url} alt="Image" />
		</Card>
	);
};

const BannerPC: FC = (): JSX.Element => {
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
			<Box
				sx={{
					width: '100%',
					alignItems: 'center',
					//display: 'inline-flex',
					display: 'flex',
					justifyContent: 'right',
				}}
			>
				{/*<Arrow direction="left" clickFunction={() => onArrowClick('left')} />*/}
				<Slide in={slideIn} direction={slideDirection}>
					<Box sx={{ width: '100%' }}>
						<CarouselSlide url={content} />
					</Box>
				</Slide>
				{/*<Arrow direction="right" clickFunction={() => onArrowClick('right')} />*/}
				<ArrowBox index={index} total={numSlides} onArrowClick={onArrowClick} />
			</Box>
		</React.Fragment>
	);
};

export default BannerPC;
