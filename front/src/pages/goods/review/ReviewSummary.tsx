import React, { FC } from 'react';
import {
	Box,
	Typography,
	Divider,
	Rating,
	LinearProgress,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useIsMobile } from '@context/MobileContext';

const ratingCounts: Record<number, number> = {
	5: 13,
	4: 1,
	3: 1,
	2: 0,
	1: 0,
};

const ReviewSummary: FC = () => {
	const isMobile = useIsMobile();

	const getRatingPercentage = (star: number): number => {
		const total = Object.values(ratingCounts).reduce(
			(sum, count) => sum + count,
			0
		);
		if (total === 0) return 0;
		return Math.round((ratingCounts[star] / total) * 100);
	};

	const infoSummary: SxProps<Theme> = {
		borderTop: '2px #c1c1c1 solid',
		display: isMobile ? 'block' : 'flex',
		gap: 4,
		alignItems: 'center',
		p: 2,
	};

	const infoTotal: SxProps<Theme> = {
		fontSize: isMobile ? '13px' : '15px',
	};

	const infoLikeType: SxProps<Theme> = {
		fontSize: isMobile ? '13px' : '15px',
		width: 50,
	};

	const infoLikeProcess: SxProps<Theme> = {
		height: isMobile ? 15 : 20,
		border: '1.5px #c1c1c1 solid',
		borderRadius: 1,
		backgroundColor: '#ffffff', // 점유하지 않은 부분 흰색
		'& .MuiLinearProgress-bar': {
			backgroundColor: '#9373b5', // 점유한 부분 색상
		},
	};

	const infoLikePercent: SxProps<Theme> = {
		fontSize: isMobile ? '13px' : '15px',
		width: 40,
	};

	return (
		<Box sx={infoSummary}>
			<Box sx={{ minWidth: 150, textAlign: 'center' }}>
				<Typography variant={isMobile ? 'h5' : 'h4'}>3.8</Typography>
				<Rating
					value={3.8}
					readOnly
					precision={0.1}
					size={isMobile ? 'middle' : 'large'}
				/>
				<Typography sx={infoTotal}>총 15명이 리뷰를 달았습니다.</Typography>
			</Box>

			<Divider
				orientation="vertical"
				variant="middle"
				flexItem
				sx={{ borderWidth: '1.5px' }}
			/>

			<Box sx={{ flex: 1 }}>
				{[5, 4, 3, 2, 1].map((star, index) => (
					<Box key={index} display="flex" alignItems="center" my={1}>
						<Typography sx={infoLikeType}>{`별 ${star}개`}</Typography>
						<Box sx={{ flex: 1, mx: 1 }}>
							<LinearProgress
								variant="determinate"
								value={getRatingPercentage(star)}
								sx={infoLikeProcess}
							/>
						</Box>
						<Typography sx={infoLikePercent}>{`${getRatingPercentage(
							star
						)}%`}</Typography>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default ReviewSummary;
