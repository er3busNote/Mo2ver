import React, { FC, useState } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { FileData } from '@/types/api';
import useImageUrl from '@services/useImageUrl';
import { Box, Card, CardMedia, CardActionArea } from '@mui/material';
import DialogImage from './dialog/DialogImage';
import { SxProps, Theme } from '@mui/material/styles';
import { fontSize_xs, fontSize_sm, fontSize_lg } from '@utils/style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

interface CarouselSlideProps {
	attachFile: string;
	name: string;
	file: ActionCreatorsMapObject;
	size: string;
}

interface HorizontalScrollProps {
	slidesPerView: number;
	spaceBetween: number;
	file: ActionCreatorsMapObject;
	files: Array<FileData> | undefined;
	type?: 'deault' | 'display';
	size?: 'deault' | 'small';
}

const CarouselSlide: FC<CarouselSlideProps> = ({
	file,
	attachFile,
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
					image={useImageUrl({ file, attachFile })}
					onClick={() => handleOpen()}
					alt="Image"
				/>
			</CardActionArea>
			<DialogImage
				open={open}
				attachFile={attachFile}
				name={name}
				file={file}
				handleClose={handleClose}
			/>
		</Card>
	);
};

const HorizontalScroll: FC<HorizontalScrollProps> = ({
	slidesPerView,
	spaceBetween,
	file,
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
					{files.map((fileData: FileData, index: number) => (
						<SwiperSlide key={index}>
							<CarouselSlide
								file={file}
								attachFile={fileData.fileAttachCode}
								name={fileData.fileName}
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
