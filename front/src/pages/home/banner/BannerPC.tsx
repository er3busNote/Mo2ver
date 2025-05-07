import React, { FC, useState, useEffect, ComponentType } from 'react';
import {
	Box,
	Grid,
	Card,
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
import {
	ArrowBackIos as ArrowBackIosIcon,
	ArrowForwardIos as ArrowForwardIosIcon,
} from '@mui/icons-material';
import SwipeableViews, { SwipeableViewsProps } from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { SLIDE_INFO } from '@utils/init';

const AutoPlaySwipeableViews = autoPlay(
	SwipeableViews
) as ComponentType<SwipeableViewsProps>;
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
				mr: 0, // 조금 더 왼쪽에 두어야 할 때 수정..!
				mb: 8,
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
				display: 'block',
				overflow: 'hidden',
			}}
		>
			<CardMedia
				component="img"
				image={url}
				sx={{ height: '100%' }}
				alt="Image"
			/>
		</Card>
	);
};

const BannerPC: FC = (): JSX.Element => {
	const [activeStep, setActiveStep] = useState(0);
	const numSlides = SLIDE_INFO.length;

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
		const newIndex = (activeStep + increment + numSlides) % numSlides;
		setActiveStep(newIndex);
	};

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	return (
		<React.Fragment>
			<Box
				sx={{
					width: '100%',
					alignItems: 'center',
					//display: 'inline-flex',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<AutoPlaySwipeableViews
					index={activeStep}
					onChangeIndex={handleStepChange}
					enableMouseEvents
				>
					{SLIDE_INFO.map((image: string, index: number) => (
						<Box key={index} sx={{ width: '100%' }}>
							<CarouselSlide url={image} />
						</Box>
					))}
				</AutoPlaySwipeableViews>
				<ArrowBox
					index={activeStep}
					total={numSlides}
					onArrowClick={onArrowClick}
				/>
			</Box>
		</React.Fragment>
	);
};

export default BannerPC;
