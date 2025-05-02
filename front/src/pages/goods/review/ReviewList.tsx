import React, { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ReviewData, ReviewPageData, ReviewRequestData } from '@api/types';
import ReviewCard from '@components/card/ReviewCard';
import ReviewInput from '@components/input/ReviewInput';
import { Box, Pagination } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { isEmpty } from 'lodash';

interface ReviewListProps {
	goodsCode: string;
	reviewPageData: ReviewPageData;
	setPage: Dispatch<SetStateAction<number>>;
	onReviewAdd: (reviewInfo: ReviewRequestData) => void;
	onReviewMod: (reviewInfo: ReviewRequestData) => void;
}

const ReviewList: FC<ReviewListProps> = ({
	goodsCode,
	reviewPageData,
	setPage,
	onReviewAdd,
	onReviewMod,
}) => {
	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page - 1);
	};

	const infoCard: SxProps<Theme> = {
		borderTop: '2px solid #ce93d8',
		borderBottom: '2px solid #ce93d8',
	};

	return (
		<>
			<ReviewInput
				goodsCode={goodsCode}
				onReplySubmit={onReviewAdd}
			></ReviewInput>
			{!isEmpty(reviewPageData.content) && (
				<Box sx={infoCard}>
					{reviewPageData.content &&
						reviewPageData.content.map(
							(reviewData: ReviewData, index: number) => (
								<ReviewCard
									key={index}
									reviewData={reviewData}
									onReplySubmit={onReviewAdd}
									onReplyModify={onReviewMod}
									isRoot={true}
									depth={0}
								></ReviewCard>
							)
						)}
					<Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
						{reviewPageData.totalPages && (
							<Pagination
								count={reviewPageData.totalPages}
								variant="outlined"
								color="primary"
								siblingCount={0}
								boundaryCount={1}
								hidePrevButton
								hideNextButton
								onChange={pageChange}
								size="small"
							/>
						)}
					</Box>
				</Box>
			)}
		</>
	);
};

export default ReviewList;
