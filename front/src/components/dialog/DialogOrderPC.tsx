import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { AddressData } from '@api/types';
import useAddressList from '@hooks/address/useAddressList';
import ButtonDialog from '@components/button/ButtonDialog';
import PageNavigator from '@components/pagination/PageNavigator';
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface DialogProps {
	open: boolean;
	address: ActionCreatorsMapObject;
	replaceField: (addressData: AddressData) => void;
	handleClose: () => void;
	header: SxProps<Theme>;
	base: SxProps<Theme>;
}

const DialogOrderPC: FC<DialogProps> = ({
	open,
	address,
	replaceField,
	handleClose,
	header,
	base,
}): JSX.Element => {
	const addressData = useAddressList({ address });

	const handleSelect = () => {
		replaceField(new Object() as AddressData);
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			sx={{ '.MuiDialog-paper': { minWidth: '680px' } }}
		>
			<DialogTitle sx={header}>주소록</DialogTitle>
			<DialogContent sx={{ pb: 0 }}>
				<Box sx={base}></Box>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<ButtonDialog
					buttonType="select"
					device="pc"
					variant="outlined"
					onClick={handleSelect}
				>
					선택
				</ButtonDialog>
				<ButtonDialog
					buttonType="cancel"
					device="pc"
					variant="outlined"
					onClick={handleClose}
				>
					취소
				</ButtonDialog>
			</DialogActions>
		</Dialog>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	address: bindActionCreators(Api.address, dispatch),
});

export default connect(null, mapDispatchToProps)(DialogOrderPC);
