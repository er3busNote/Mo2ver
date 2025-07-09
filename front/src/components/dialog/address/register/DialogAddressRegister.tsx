import React, { FC } from 'react';
import { AddressData } from '@api/types';
import DialogPC from '../../cmmn/DialogPC';

interface DialogProps {
    open: boolean;
    replaceField: (addressData: AddressData) => void;
    handleClose: () => void;
}

const DialogAddressRegister: FC<DialogProps> = ({
    open,
    replaceField,
    handleClose,
}): JSX.Element => {
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

export default DialogAddressRegister;
