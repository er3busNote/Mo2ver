import React, { FC } from 'react';
import { AddressData } from '@api/types';
import DialogMobile from '../../cmmn/DialogMobile';

interface DialogProps {
	open: boolean;
	replaceField: (addressData: AddressData) => void;
	handleClose: () => void;
}

const DialogAddressRegisterMobile: FC<DialogProps> = ({
	open,
	replaceField,
	handleClose,
}): JSX.Element => {
	const handleSelect = () => {
		replaceField(new Object() as AddressData);
		handleClose();
	};

	return (
		<DialogMobile
			title={'주소록'}
			open={open}
			handleSelect={handleSelect}
			handleClose={handleClose}
		>
			테스트
		</DialogMobile>
	);
};

export default DialogAddressRegisterMobile;
