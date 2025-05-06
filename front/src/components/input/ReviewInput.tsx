import React, { FC, useState } from 'react';
import { ReviewRequestData } from '@api/types';
import { Box, Button, Divider, TextField, Rating } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useIsMobile } from '@context/MobileContext';
import {
	fontSize_xs,
	fontSize_sm,
	fontSize_md,
	fontSize_lg,
} from '@utils/font';

interface ReviewInputProps {
	goodsCode: string;
	upperReviewNo?: number;
	onReplySubmit: (reviewInfo: ReviewRequestData) => void;
}

const ReviewInput: FC<ReviewInputProps> = ({
	goodsCode,
	upperReviewNo,
	onReplySubmit,
}) => {
	const isMobile = useIsMobile();
	const [rating, setRating] = useState<number>(0);
	const [reviewContents, setReviewContents] = useState<string>('');
	const [showReplyInput, setShowReplyInput] = useState<boolean>(false);

	const handleReplyToggle = () => {
		setShowReplyInput((prev) => !prev);
	};

	const handleReplySubmit = () => {
		const reviewInfo: ReviewRequestData = {
			goodsCode: goodsCode,
			upperReviewNo: upperReviewNo,
			reviewImg: '',
			reviewContents: reviewContents,
			rating: rating,
		};
		onReplySubmit(reviewInfo);
		setShowReplyInput(false);
	};

	const reviewButton: SxProps<Theme> = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	};
	const infoTextEdit: SxProps<Theme> = {
		backgroundColor: '#fff',
		borderRadius: 1,
		'.MuiInputBase-root': {
			px: isMobile ? 1.5 : 2,
			py: isMobile ? 1 : 2,
		},
	};

	return (
		<Box>
			<Box sx={reviewButton}>
				<Box sx={{ flexGrow: 1 }} />
				<Button size="small" onClick={handleReplyToggle}>
					{showReplyInput ? '닫기' : '답글달기'}
				</Button>
				<Button variant="text" size="small" color="secondary">
					신고하기
				</Button>
			</Box>

			<Divider sx={{ mt: 1, mb: 2 }} />

			{showReplyInput && (
				<Box>
					<Rating
						size={isMobile ? 'small' : 'medium'}
						onChange={(_, newValue) => setRating(newValue || 0)}
					/>
					<Box
						mt={0.5}
						mb={2}
						pb={2}
						display="flex"
						alignItems="flex-start"
						gap={1}
					>
						<TextField
							multiline
							rows={isMobile ? 2 : 4}
							fullWidth
							variant="outlined"
							onChange={(event) => setReviewContents(event.target.value)}
							placeholder="답글을 입력하세요"
							sx={infoTextEdit}
							inputProps={{
								sx: {
									fontSize: {
										xs: fontSize_xs,
										sm: fontSize_sm,
										md: fontSize_md,
										lg: fontSize_lg,
									},
								},
							}}
						/>
						<Button
							variant="contained"
							onClick={handleReplySubmit}
							sx={{ height: '100%', whiteSpace: 'nowrap' }}
						>
							확인
						</Button>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default ReviewInput;
