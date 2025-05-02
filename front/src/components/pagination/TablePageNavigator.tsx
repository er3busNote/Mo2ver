import React, {
	FC,
	useState,
	useEffect,
	MouseEvent,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import { TablePagination } from '@mui/material';

interface PaginationProps {
	size: number;
	totalElements: number;
	numberOfElements: number;
	setPage: Dispatch<SetStateAction<number>>;
}

const TablePageNavigator: FC<PaginationProps> = ({
	size,
	totalElements,
	numberOfElements,
	setPage,
}) => {
	const [newPage, setNewPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(0);

	useEffect(() => {
		setRowsPerPage(numberOfElements);
	}, [size]);

	const handleChangePage = (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
		setNewPage(newPage);
	};
	const handleChangeRowsPerPage = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setNewPage(0);
	};

	return (
		<TablePagination
			rowsPerPageOptions={[size]}
			count={totalElements}
			rowsPerPage={rowsPerPage}
			page={newPage}
			SelectProps={{
				inputProps: {
					'aria-label': 'rows per page',
				},
				native: false,
			}}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
};

export default TablePageNavigator;
