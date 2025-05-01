import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { Box, Button, Divider, TextField } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useIsMobile } from '@context/MobileContext';

const fontSize_xs = '11px';
const fontSize_sm = '12px';
const fontSize_md = '13px';
const fontSize_lg = '13px';

interface ReviewInputProps {
	setReviewContents: Dispatch<SetStateAction<string>>;
	onReplySubmit: () => void;
}

const ReviewInput: FC<ReviewInputProps> = ({
	setReviewContents,
	onReplySubmit,
}) => {
	const isMobile = useIsMobile();
	const [showReplyInput, setShowReplyInput] = useState(false);

	const handleReplyToggle = () => {
		setShowReplyInput((prev) => !prev);
	};

	const handleReplySubmit = () => {
		onReplySubmit();
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
				<Box my={2} display="flex" alignItems="flex-start" gap={1}>
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
			)}
		</Box>
	);
};

export default ReviewInput;
