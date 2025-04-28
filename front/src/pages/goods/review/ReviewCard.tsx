import React, { FC, useState } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { ReviewData, ReviewRequestData } from '@api/types';
import useImageUrl from '@hooks/useImageUrl';
import ReviewInput from '@components/input/ReviewInput';
import {
	Box,
	Card,
	CardMedia,
	Typography,
	Avatar,
	Rating,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useIsMobile, useIsDesktop } from '@context/MobileContext';
import { isEmpty, get } from 'lodash';

const IMAGE_INFO =
	'https://ix-marketing.imgix.net/autotagging.png?auto=format,compress&w=1246';

interface ReviewCardProps {
	image: ActionCreatorsMapObject;
	reviewData: ReviewData;
	onReplySubmit: (reviewInfo: ReviewRequestData) => void;
	isRoot: boolean;
	depth: number;
}

const ReviewCard: FC<ReviewCardProps> = ({
	image,
	reviewData,
	onReplySubmit,
	isRoot,
	depth,
}) => {
	const isMobile = useIsMobile();
	const isDesktop = useIsDesktop();
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
		ml: depth * 4,
		pt: isRoot ? 2 : 0,
		px: isRoot ? 2 : 0,
		backgroundColor: '#f3e5f5', // 연보라
		borderTop: isRoot ? '2px solid #ce93d8' : 'none',
		borderBottom: isRoot ? '2px solid #ce93d8' : 'none',
		borderLeft: 'none',
		borderRight: 'none',
		boxShadow: 'none',
		borderRadius: 0,
	};
	const infoUser: SxProps<Theme> = {
		fontSize: isMobile ? '13px' : '15px',
	};
	const infoText: SxProps<Theme> = {
		fontSize: isMobile ? '13px' : '15px',
		whiteSpace: 'pre-line',
		textAlign: 'left',
	};
	const infoImg: SxProps<Theme> = {
		width: 80,
		height: 80,
		mb: 1,
		borderRadius: 2,
		overflow: 'hidden',
		backgroundColor: '#ddd',
	};

	return (
		<Card sx={infoCard}>
			<Box display="flex" justifyContent="space-between">
				<Box display="flex" flexDirection="column" flex={1} pr={2}>
					<Box display="flex" alignItems="center">
						{isDesktop && <Avatar />}
						<Box ml={2}>
							<Typography sx={infoUser} variant="subtitle1">
								{reviewData.memberName}
							</Typography>
							<Rating value={reviewData.rating} readOnly size="small" />
						</Box>
					</Box>
					<Box ml={1}>
						<Typography sx={infoText}>{reviewData.reviewContents}</Typography>
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
				</Box>
			</Box>

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
						isRoot={false}
						depth={depth + 1}
					></ReviewCard>
				)
			)}
		</Card>
	);
};

export default ReviewCard;
