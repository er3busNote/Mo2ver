import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { ReviewData, ReviewRequestData } from '@api/types';
import useImageUrl from '@hooks/useImageUrl';
import ReviewInput from '@components/input/ReviewInput';
import {
	Box,
	Card,
	CardMedia,
	Typography,
	Divider,
	Avatar,
	Rating,
	Button,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useIsMobile } from '@context/MobileContext';
import { isEmpty, get } from 'lodash';

const IMAGE_INFO =
	'https://ix-marketing.imgix.net/autotagging.png?auto=format,compress&w=1246';

interface ReviewCardProps {
	image: ActionCreatorsMapObject;
	reviewData: ReviewData;
	onReplySubmit: (reviewInfo: ReviewRequestData) => void;
}

const ReviewCard: FC<ReviewCardProps> = ({
	image,
	reviewData,
	onReplySubmit,
}) => {
	const isMobile = useIsMobile();
	const [reviewContents, setReviewContents] = useState<string>('');

	const handleReplySubmit = () => {
		onReplySubmit({
			goodsCode: reviewData.goodsCode,
			upperReviewNo: reviewData.goodsReviewNo,
			reviewImg: '',
			reviewContents: reviewContents,
			rating: 0,
		});
	};

	const file = String(get(reviewData, 'imageAttachFile', ''));

	const infoCard: SxProps<Theme> = {
		mt: 2,
		mb: 6,
		ml: isEmpty(reviewData.reviewResponseList) ? 0 : 4,
		p: 2,
		backgroundColor: '#f3e5f5', // 연보라
		borderTop: '2px solid #ce93d8',
		borderBottom: '2px solid #ce93d8',
		borderLeft: 'none',
		borderRight: 'none',
		borderRadius: 0,
	};

	const infoImg: SxProps<Theme> = {
		width: 80,
		height: 80,
		mb: 1,
		borderRadius: 2,
		overflow: 'hidden',
		backgroundColor: '#ddd',
	};

	const infoUser: SxProps<Theme> = {
		fontSize: isMobile ? '13px' : '15px',
	};

	const infoText: SxProps<Theme> = {
		fontSize: isMobile ? '13px' : '15px',
		whiteSpace: 'pre-line',
		textAlign: 'left',
	};

	return (
		<Card sx={infoCard}>
			<Box display="flex" justifyContent="space-between">
				<Box display="flex" flexDirection="column" flex={1} pr={2}>
					<Box display="flex" alignItems="center">
						<Avatar />
						<Box ml={2}>
							<Typography sx={infoUser} variant="subtitle1">
								사용자
							</Typography>
							<Rating value={3} readOnly size="small" />
						</Box>
					</Box>
					<Box ml={1}>
						<Typography sx={infoText}>테스트</Typography>
					</Box>
				</Box>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					width={100}
					ml={2}
				>
					<Box sx={infoImg}>
						{!isEmpty(file) ? (
							<CardMedia
								component="img"
								image={useImageUrl({ image, file })}
								alt="리뷰 이미지"
								sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
							/>
						) : (
							<CardMedia
								component="img"
								image={IMAGE_INFO}
								alt="리뷰 이미지"
								sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
							/>
						)}
					</Box>
					<Button variant="text" size="small" color="secondary">
						신고하기
					</Button>
				</Box>
			</Box>

			<Divider sx={{ my: 2 }} />

			<ReviewInput
				setReviewContents={setReviewContents}
				onReplySubmit={handleReplySubmit}
			></ReviewInput>

			{reviewData.reviewResponseList.map(
				(reviewSubData: ReviewData, index: number) => (
					<ReviewCard
						key={index}
						image={image}
						reviewData={reviewSubData}
						onReplySubmit={onReplySubmit}
					></ReviewCard>
				)
			)}
		</Card>
	);
};

export default ReviewCard;
