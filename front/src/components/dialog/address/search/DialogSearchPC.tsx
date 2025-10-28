import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { JusoData } from '@/types/api';
import useAddressSearch from '@hooks/address/query/useAddressSearch';
import DialogPC from '@components/dialog/cmmn/DialogPC';
import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface DialogProps {
	open: boolean;
	address: ActionCreatorsMapObject;
	setSelectedValue: Dispatch<SetStateAction<string>>;
	handleClose: () => void;
}

const DialogSearchPC: FC<DialogProps> = ({
	open,
	address,
	setSelectedValue,
	handleClose,
}): JSX.Element => {
	const [keyword, setKeyword] = useState<string>('');
	const { data: addressData } = useAddressSearch({ address, keyword });

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
		<DialogPC title={'주소록'} open={open} handleClose={handleClose}>
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
								지번주소
							</TableCell>
							<TableCell sx={thHeader} align="center">
								도로명주소
							</TableCell>
							<TableCell sx={thHeader} align="center">
								상세건물명
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{addressData?.map((data: JusoData, index: number) => (
							<TableRow key={index} sx={rowItem}>
								<TableCell align="center">{data.admCd}</TableCell>
								<TableCell align="center">{data.zipNo}</TableCell>
								<TableCell align="center">{data.jibunAddr}</TableCell>
								<TableCell align="center">{data.roadAddrPart1}</TableCell>
								<TableCell align="center">{data.detBdNmList}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</DialogPC>
	);
};

export default DialogSearchPC;
