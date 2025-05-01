import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import useCSRFToken from '@hooks/useCSRFToken';
import useFieInfo from '@hooks/cmmn/useFileInfo';
import { ReviewData, ReviewRequestData } from '@api/types';
import useImageUrl from '@hooks/useImageUrl';
import ReviewInput from '@components/input/ReviewInput';
import {
	Box,
	CardMedia,
	TextField,
	Typography,
	Avatar,
	Rating,
} from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { useIsMobile, useIsDesktop } from '@context/MobileContext';
import { isEmpty, get } from 'lodash';

const HiddenInput = styled('input')({
	display: 'none',
});

const IMAGE_INFO =
	'https://ix-marketing.imgix.net/autotagging.png?auto=format,compress&w=1246';

interface ReviewCardProps {
	member: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
	reviewData: ReviewData;
	onReplySubmit: (reviewInfo: ReviewRequestData) => void;
	isRoot: boolean;
	depth: number;
}

const ReviewCard: FC<ReviewCardProps> = ({
	member,
	image,
	reviewData,
	onReplySubmit,
	isRoot,
	depth,
}) => {
	const isMobile = useIsMobile();
	const isDesktop = useIsDesktop();

	const csrfData = useCSRFToken({ member });
	const [dataFiles, setFiles] = useFieInfo({ image, csrfData });

	const textRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [isEditingRating, setIsEditingRating] = useState(false);
	const [isEditingText, setIsEditingText] = useState<boolean>(false);
	const [reviewContents, setReviewContents] = useState<string>('');

	const [file, setFile] = useState<string>(reviewData.imageAttachFile || '');
	const [rating, setRating] = useState<number>(reviewData.rating || 0);
	const [text, setText] = useState<string>(reviewData.reviewContents || '');
	const [imageUrl, setImageUrl] = useState<string>(IMAGE_INFO);

	useEffect(() => {
		if (!isEmpty(file)) setImageUrl(useImageUrl({ image, file }));
	}, [file, rating, text]);

	useEffect(() => {
		setFile(reviewData.imageAttachFile || '');
		setRating(reviewData.rating || 0);
		setText(reviewData.reviewContents);
		if (!isEmpty(file)) {
			setImageUrl(useImageUrl({ image, file }));
		}
	}, [reviewData]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			const target = event.target as Node;
			if (
				isEditingText &&
				textRef.current &&
				!textRef.current.contains(target)
			) {
				setIsEditingText(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [isEditingText]);

	useEffect(() => {
		if (dataFiles && dataFiles.length > 0 && dataFiles[0].fileSize > 0) {
			setImageUrl(useImageUrl({ image, file: dataFiles[0].fileAttachCode }));
		}
	}, [dataFiles]);

	const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files;
		if (selectedFiles) {
			setFiles(selectedFiles);
		}
	};

	const handleInputClick = () => {
		fileInputRef.current?.click();
	};

	const handleReplySubmit = () => {
		onReplySubmit({
			goodsCode: reviewData.goodsCode,
			upperReviewNo: reviewData.goodsReviewNo,
			reviewImg: '',
			reviewContents: reviewContents,
			rating: 0,
		});
	};

	const infoCard: SxProps<Theme> = {
		ml: depth * 4,
		pt: isRoot ? 2 : 0,
		px: isRoot ? 2 : 0,
		backgroundColor: '#f3e5f5', // 연보라
	};
	const infoUser: SxProps<Theme> = {
		fontSize: isMobile ? '13px' : '15px',
	};
	const infoRating: SxProps<Theme> = {
		cursor: 'pointer',
	};
	const infoText: SxProps<Theme> = {
		fontSize: isMobile ? '13px' : '15px',
		whiteSpace: 'pre-line',
		textAlign: 'left',
		cursor: 'pointer',
	};
	const infoTextEdit: SxProps<Theme> = {
		backgroundColor: '#fff',
		'.MuiInputBase-root': {
			px: isMobile ? 1.5 : 2,
			py: isMobile ? 1 : 2,
		},
	};
	const infoTextEditInput: SxProps<Theme> = {
		fontSize: isMobile ? '11px' : '13px',
	};
	const infoImg: SxProps<Theme> = {
		width: 80,
		height: 80,
		mb: 1,
		borderRadius: 2,
		overflow: 'hidden',
		backgroundColor: '#ddd',
	};
	const infoCardImg: SxProps<Theme> = {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		cursor: 'pointer',
	};

	return (
		<Box sx={infoCard}>
			<Box display="flex" justifyContent="space-between">
				<Box display="flex" flexDirection="column" flex={1} pr={2}>
					<Box display="flex" alignItems="center">
						{isDesktop && <Avatar />}
						<Box ml={2}>
							<Typography sx={infoUser} variant="subtitle1">
								{reviewData.memberName}
							</Typography>
							{isEditingRating ? (
								<Rating
									size="small"
									value={rating}
									onChange={(event, newValue) => {
										event.preventDefault();
										setRating(newValue || 0);
										setIsEditingRating(false);
									}}
									autoFocus
								/>
							) : (
								<>
									{isMobile ? (
										<Rating
											size="small"
											value={rating}
											onChange={(_, newValue) => setRating(newValue || 0)}
										/>
									) : (
										<Box
											onClick={() => setIsEditingRating(true)}
											sx={infoRating}
										>
											<Rating size="small" value={rating} readOnly />
										</Box>
									)}
								</>
							)}
						</Box>
					</Box>
					<Box ml={1} ref={textRef}>
						{isEditingText ? (
							<TextField
								fullWidth
								multiline
								value={text}
								onChange={(event) => setText(event.target.value)}
								autoFocus
								sx={infoTextEdit}
								inputProps={{ sx: infoTextEditInput }}
							/>
						) : (
							<Typography onClick={() => setIsEditingText(true)} sx={infoText}>
								{text}
							</Typography>
						)}
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
							image={imageUrl}
							alt="리뷰 이미지"
							onClick={handleInputClick}
							sx={infoCardImg}
						/>
						<HiddenInput
							ref={fileInputRef}
							type="file"
							accept="image/*"
							style={{ display: 'none' }}
							onChange={handleFiles}
						/>
						<Typography
							variant="caption"
							display="block"
							mt={1}
							color="textSecondary"
						>
							이미지를 클릭하면 변경할 수 있어요
						</Typography>
					</Box>
				</Box>
			</Box>

			<ReviewInput
				setRating={setRating}
				setReviewContents={setReviewContents}
				onReplySubmit={handleReplySubmit}
			></ReviewInput>

			{reviewData.reviewResponseList.map(
				(reviewSubData: ReviewData, index: number) => (
					<ReviewCard
						key={index}
						member={member}
						image={image}
						reviewData={reviewSubData}
						onReplySubmit={onReplySubmit}
						isRoot={false}
						depth={depth + 1}
					></ReviewCard>
				)
			)}
		</Box>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	image: bindActionCreators(Api.image, dispatch),
});

export default connect(null, mapDispatchToProps)(ReviewCard);
