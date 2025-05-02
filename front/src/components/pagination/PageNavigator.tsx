import React, { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Pagination } from '@mui/material';

interface PaginationProps {
	count: number;
	setPage: Dispatch<SetStateAction<number>>;
}

const PageNavigator: FC<PaginationProps> = ({ count, setPage }) => {
	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page - 1);
	};

	return (
		<Pagination
			count={count}
			variant="outlined"
			color="primary"
			siblingCount={2}
			boundaryCount={2}
			hidePrevButton
			hideNextButton
			onChange={pageChange}
			size="small"
		/>
	);
};

export default PageNavigator;
