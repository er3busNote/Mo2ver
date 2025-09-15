import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { AddressData } from '@/types/api';
import useAddressList from '@hooks/address/query/useAddressList';
import DialogPC from '../cmmn/DialogPC';
import {
	Radio,
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
	addressNo: string;
	setField: () => void;
	handleClose: () => void;
}

const DialogAddressPC: FC<DialogProps> = ({
	open,
	address,
	addressNo,
	setField,
	handleClose,
}): JSX.Element => {
	const [addressNoSel, setAddressNo] = useState<string>();
	const { data: addressData } = useAddressList({ address });

	useEffect(() => {
		setAddressNo(addressNo);
	}, [addressNo]);

	const handleSelect = () => {
		setField();
		handleClose();
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAddressNo(event.target.value);
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
		<DialogPC
			title={'주소록'}
			open={open}
			handleSelect={handleSelect}
			handleClose={handleClose}
		>
			<TableContainer>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell sx={thHeader} align="center">
								선택
							</TableCell>
							<TableCell sx={thHeader} align="center">
								담당자
							</TableCell>
							<TableCell sx={thHeader} align="center">
								전화번호
							</TableCell>
							<TableCell sx={thHeader} align="center">
								기본주소
							</TableCell>
							<TableCell sx={thHeader} align="center">
								상세주소
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{addressData?.map((data: AddressData, index: number) => (
							<TableRow key={index} sx={rowItem}>
								<TableCell align="center">
									<Radio
										size="small"
										checked={addressNoSel === data.addressNo}
										onChange={handleChange}
										value={data.addressNo}
									/>
								</TableCell>
								<TableCell align="center">{data.memberName}</TableCell>
								<TableCell align="center">{data.cellPhoneNumber}</TableCell>
								<TableCell align="center">
									{data.roadNameBasicAddress}
								</TableCell>
								<TableCell align="center">
									{data.roadNameDetailAddress}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</DialogPC>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	address: bindActionCreators(Api.address, dispatch),
});

export default connect(null, mapDispatchToProps)(DialogAddressPC);
