import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { JusoData } from '@/types/api';
import useAddressSearch from '@hooks/address/query/useAddressSearch';
import DialogMobile from '@components/dialog/cmmn/DialogMobile';
import SearchInput from '@components/input/SearchInput';
import ButtonDialog from '@components/button/ButtonDialog';
import {
	Box,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { handleSearchOnChange } from '@handler/dialog';

interface DialogProps {
	open: boolean;
	address: ActionCreatorsMapObject;
	setSelectedValue: Dispatch<SetStateAction<string>>;
	handleClose: () => void;
}

const DialogSearchMobile: FC<DialogProps> = ({
	open,
	address,
	setSelectedValue,
	handleClose,
}): JSX.Element => {
	const [keyword, setKeyword] = useState<string>('');
	const [addressName, setAddressName] = useState<string>('');
	const { data: addressData } = useAddressSearch({
		address,
		keyword: addressName,
	});

	const searchOnChange = handleSearchOnChange(setKeyword);

	const searchClick = () => {
		setAddressName(keyword);
	};

	const handleSelect = (value: string) => {
		setSelectedValue(value);
		handleClose();
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

	return (
		<DialogMobile title={'주소록'} open={open} handleClose={handleClose}>
			<Box sx={{ pt: 0.5, pb: 1, display: 'flex', justifyContent: 'center' }}>
				<SearchInput
					placeholder="주소를 검색할 수 있어요!"
					onChange={searchOnChange}
				/>
				<ButtonDialog
					buttonType="search"
					device="mobile"
					variant="outlined"
					onClick={searchClick}
				>
					검색
				</ButtonDialog>
			</Box>
			<TableContainer>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell sx={thHeader} align="center">
								행정구역코드
							</TableCell>
							<TableCell sx={thHeader} align="center">
								우편번호
							</TableCell>
							<TableCell sx={thHeader} align="center">
								도로명주소
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{addressData &&
							addressData?.map((data: JusoData, index: number) => (
								<TableRow key={index} sx={rowItem}>
									<TableCell align="center">{data.admCd}</TableCell>
									<TableCell align="center">{data.zipNo}</TableCell>
									<TableCell align="center">{data.roadAddrPart1}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</DialogMobile>
	);
};

export default DialogSearchMobile;
