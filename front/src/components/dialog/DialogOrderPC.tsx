import React, { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { AddressData } from '@api/types';
import useAddressList from '@hooks/address/useAddressList';
import PageNavigator from '@components/pagination/PageNavigator';
import DialogPC from './cmmn/DialogPC';

interface DialogProps {
	open: boolean;
	address: ActionCreatorsMapObject;
	replaceField: (addressData: AddressData) => void;
	handleClose: () => void;
}

const DialogOrderPC: FC<DialogProps> = ({
	open,
	address,
	replaceField,
	handleClose,
}): JSX.Element => {
	const addressData = useAddressList({ address });

	const handleSelect = () => {
		replaceField(new Object() as AddressData);
		handleClose();
	};

	return (
		<DialogPC
			title={'주소록'}
			open={open}
			handleSelect={handleSelect}
			handleClose={handleClose}
		>
			테스트
		</DialogPC>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	address: bindActionCreators(Api.address, dispatch),
});

export default connect(null, mapDispatchToProps)(DialogOrderPC);
