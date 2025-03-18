import React, { FC, useState, ChangeEvent } from 'react';
import AppSubHeader from '@layouts/AppSubHeader';
import {
	Box,
	Pagination,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface NoticeListProps {
	title: string;
	description: string;
}

const NoticeList: FC<NoticeListProps> = ({
	title,
	description,
}): JSX.Element => {
	const [page, setPage] = useState(0);

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	const thHeader: SxProps<Theme> = {
		px: { xs: 0, sm: 2 },
		py: 1.5,
		width: 180,
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const rowItem: SxProps<Theme> = {
		py: 0.5,
		display: 'table-row',
		borderBottom: '1px #F0F0F0 solid',
	};
	const indexColumn: SxProps<Theme> = {
		width: '10%',
	};
	const registerColumn: SxProps<Theme> = {
		px: { xs: 0, sm: 2 },
		py: 1.5,
		width: '15%',
	};
	const createColumn: SxProps<Theme> = {
		width: '15%',
	};
	return (
		<Box>
			<AppSubHeader title={title} description={description} />
			<Box sx={{ mx: 3, my: 2 }}>
				<TableContainer>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell sx={thHeader} align="center">
									번호
								</TableCell>
								<TableCell sx={thHeader} align="center">
									제목
								</TableCell>
								<TableCell sx={thHeader} align="center">
									작성자
								</TableCell>
								<TableCell sx={thHeader} align="center">
									등록일
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow sx={rowItem}>
								<TableCell
									sx={indexColumn}
									component="th"
									scope="row"
									align="center"
								>
									0
								</TableCell>
								<TableCell align="center">
									개인정보 식별 조치 관련 공지
								</TableCell>
								<TableCell align="center" sx={registerColumn}>
									관리자
								</TableCell>
								<TableCell align="center" sx={createColumn}>
									2024-01-24
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box sx={{ mb: 10, display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={1}
					variant="outlined"
					color="primary"
					siblingCount={2}
					boundaryCount={2}
					hidePrevButton
					hideNextButton
					onChange={pageChange}
					size="small"
				/>
			</Box>
		</Box>
	);
};

export default NoticeList;
