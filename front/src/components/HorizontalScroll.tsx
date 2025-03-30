import React, { FC, useState } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileData } from '@api/types';
import useImageUrl from '@hooks/useImageUrl';
import { Box, Card, CardMedia, CardActionArea } from '@mui/material';
import DialogImage from './dialog/DialogImage';
import { SxProps, Theme } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const fontSize_xs = '11px';
const fontSize_sm = '13px';
const fontSize_lg = '13px';

interface CarouselSlideProps {
	file: string;
	name: string;
	image: ActionCreatorsMapObject;
	size: string;
}

interface HorizontalScrollProps {
	slidesPerView: number;
	spaceBetween: number;
	image: ActionCreatorsMapObject;
	files: Array<FileData> | undefined;
	type?: 'deault' | 'display';
	size?: 'deault' | 'small';
}

const CarouselSlide: FC<CarouselSlideProps> = ({
	image,
	file,
	name,
	size,
}): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false); // Dialog 닫기
	};

	return (
		<Card
			elevation={0}
			sx={{
				m: 1,
				width:
					size === 'small'
						? { xs: 80, sm: 100, md: 100, lg: 100 }
						: { xs: 140, sm: 160, md: 160, lg: 180 },
				border: '2px #f0f0f0f0 solid',
			}}
		>
			<CardActionArea>
				<CardMedia
					component="img"
					sx={{
						height:
							size === 'small'
								? { xs: 60, sm: 80, md: 80, lg: 80 }
								: { xs: 120, sm: 140, md: 140, lg: 160 },
					}}
					image={useImageUrl({ image, file })}
					onClick={() => handleOpen()}
					alt="Image"
				/>
			</CardActionArea>
			<DialogImage
				open={open}
				file={file}
				name={name}
				image={image}
				handleClose={handleClose}
			/>
		</Card>
	);
};

const HorizontalScroll: FC<HorizontalScrollProps> = ({
	slidesPerView,
	spaceBetween,
	image,
	files,
	type = 'default',
	size = 'default',
}): JSX.Element => {
	const baseStyle: SxProps<Theme> = {
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
	};

	return (
		<Box>
			{files && files.length > 0 ? (
				<Swiper
					slidesPerView={slidesPerView}
					spaceBetween={spaceBetween}
					freeMode={true}
					pagination={{ clickable: true }}
					modules={[FreeMode, Pagination]}
					className="bannerSwiper"
				>
					{files.map((file: FileData, index: number) => (
						<SwiperSlide key={index}>
							<CarouselSlide
								image={image}
								file={file.fileAttachCode}
								name={file.fileName}
								size={size}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<Box sx={baseStyle}>
					{type === 'display' ? '상품전시정보' : '상품정보'}가 존재하지
					않습니다.
				</Box>
			)}
		</Box>
	);
};

export default HorizontalScroll;
