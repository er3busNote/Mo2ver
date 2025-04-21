import React, { FC, useState } from 'react';
import {
	Box,
	Card,
	CardMedia,
	Typography,
	Divider,
	Avatar,
	Rating,
	Button,
	TextField,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { isMobile } from 'react-device-detect';

const ReviewCard: FC = () => {
	const [showReplyInput, setShowReplyInput] = useState(false);
	const [replyText, setReplyText] = useState('');

	const handleReplyToggle = () => {
		setShowReplyInput((prev) => !prev);
	};

	const handleReplySubmit = () => {
		console.log('답글 내용:', replyText);
		// TODO: 실제 답글 전송 로직 추가
		setReplyText('');
		setShowReplyInput(false);
	};

	const infoCard: SxProps<Theme> = {
		mt: 2,
		mb: 6,
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
						<CardMedia
							component="img"
							image={
								'https://ix-marketing.imgix.net/autotagging.png?auto=format,compress&w=1246​'
							}
							alt="리뷰 이미지"
							sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
						/>
					</Box>
					<Button variant="text" size="small" color="secondary">
						신고하기
					</Button>
				</Box>
			</Box>

			<Divider sx={{ my: 2 }} />

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
						value={replyText}
						onChange={(e) => setReplyText(e.target.value)}
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
		</Card>
	);
};

export default ReviewCard;
