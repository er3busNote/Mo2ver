import React, { FC } from 'react';
import { Box, Card, CardMedia, CardActionArea } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

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

interface CarouselSlideProps {
	url: string;
}

interface HorizontalScrollProps {
	slidesPerView: number;
}

const CarouselSlide: FC<CarouselSlideProps> = ({ url }): JSX.Element => {
	return (
		<Card
			elevation={0}
			sx={{
				m: 1,
				width: { xs: 140, sm: 160, md: 160, lg: 180 },
				border: '2px #f0f0f0f0 solid',
			}}
		>
			<CardActionArea>
				<CardMedia
					component="img"
					sx={{ height: { xs: 120, sm: 140, md: 140, lg: 160 } }}
					image={url}
					alt="Image"
				/>
			</CardActionArea>
		</Card>
	);
};

const HorizontalScroll: FC<HorizontalScrollProps> = ({
	slidesPerView,
}): JSX.Element => {
	return (
		<Box>
			<Swiper
				slidesPerView={slidesPerView}
				spaceBetween={30}
				freeMode={true}
				pagination={{ clickable: true }}
				modules={[FreeMode, Pagination]}
				className="mySwiper"
			>
				{IMAGE_INFO.map((image: string, index: number) => (
					<SwiperSlide key={index}>
						<CarouselSlide url={image} />
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
};

export default HorizontalScroll;
