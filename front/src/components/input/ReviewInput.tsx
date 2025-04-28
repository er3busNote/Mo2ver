import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface ReviewInputProps {
	setReviewContents: Dispatch<SetStateAction<string>>;
	onReplySubmit: () => void;
}

const ReviewInput: FC<ReviewInputProps> = ({
	setReviewContents,
	onReplySubmit,
}) => {
	const [showReplyInput, setShowReplyInput] = useState(false);

	const handleReplyToggle = () => {
		setShowReplyInput((prev) => !prev);
	};

	const handleReplySubmit = () => {
		onReplySubmit();
		setShowReplyInput(false);
	};

	return (
		<Box>
			<Box mt={1}>
				<Button size="small" onClick={handleReplyToggle}>
					{showReplyInput ? '닫기' : '답글달기'}
				</Button>
			</Box>

			{showReplyInput && (
				<Box mt={2} display="flex" alignItems="flex-start" gap={1}>
					<TextField
						multiline
						rows={4}
						fullWidth
						variant="outlined"
						onChange={(e) => setReviewContents(e.target.value)}
						placeholder="답글을 입력하세요"
						sx={{ backgroundColor: '#fff', borderRadius: 1 }}
					/>
					<Button
						variant="contained"
						onClick={handleReplySubmit}
						sx={{ height: '100%', whiteSpace: 'nowrap' }}
					>
						확인
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default ReviewInput;
