import React, { FC } from 'react';
import {
	useForm,
	useFormContext,
	FormProvider,
	SubmitHandler,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import { AddressInfoData } from '@/types/api';
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useIsMobile } from '@context/MobileContext';
import ButtonDialog from '@components/button/ButtonDialog';
import AddressFields from './AddressFields';
import { AddressFormValues } from './types';

const addressSchema = yup
	.object()
	.shape({
		memberName: yup.string().required('수령자를 입력해주세요'),
		cellPhoneNumber: yup.string().required('핸드폰번호를 입력해주세요'),
		zipcode: yup.string().required('우편번호를 입력해주세요'),
		roadNameBasicAddress: yup.string().required('배송지주소를 입력해주세요'),
		roadNameDetailAddress: yup.string().required('상세주소를 입력해주세요'),
	})
	.required();

interface DialogProps {
	title: string;
	open: boolean;
	handleClose: () => void;
	onSubmit: SubmitHandler<AddressFormValues>;
}

interface DialogDispatchProps {
	open: boolean;
	address: ActionCreatorsMapObject;
	setField: () => void;
	handleClose: () => void;
}

const addressValues: AddressFormValues = {
	memberName: '',
	cellPhoneNumber: '',
	zipcode: '',
	roadNameBasicAddress: '',
	roadNameDetailAddress: '',
};

const AddressPC: FC<DialogProps> = ({
	title,
	open,
	handleClose,
	onSubmit,
}): JSX.Element => {
	const {
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useFormContext<AddressFormValues>();

	const header: SxProps<Theme> = {
		px: 2,
		py: 0,
		color: '#fff',
		fontSize: '1.0rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#363b74',
	};
	const base: SxProps<Theme> = {
		px: 1,
		py: 1,
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			sx={{ '.MuiDialog-paper': { minWidth: '400px' } }}
		>
			<DialogTitle sx={header}>{title}</DialogTitle>
			<DialogContent sx={{ pb: 0 }}>
				<Box sx={base}>
					<AddressFields />
				</Box>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<ButtonDialog
					buttonType="select"
					device="pc"
					variant="outlined"
					onClick={handleSubmit(onSubmit)}
					disabled={isSubmitted && !isValid}
				>
					저장
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

const AddressMobile: FC<DialogProps> = ({
	title,
	open,
	handleClose,
	onSubmit,
}): JSX.Element => {
	const isMobile = useIsMobile();
	const {
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useFormContext<AddressFormValues>();

	const header: SxProps<Theme> = {
		px: 2,
		py: 0.5,
		color: '#fff',
		fontSize: '0.9rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#363b74',
	};
	const base: SxProps<Theme> = {
		px: isMobile ? 0 : 0.5,
		py: 1,
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle sx={header}>{title}</DialogTitle>
			<DialogContent sx={{ pb: 0 }}>
				<Box sx={base}>
					<AddressFields />
				</Box>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<ButtonDialog
					buttonType="select"
					device="mobile"
					variant="outlined"
					onClick={handleSubmit(onSubmit)}
					disabled={isSubmitted && !isValid}
				>
					저장
				</ButtonDialog>
				<ButtonDialog
					buttonType="cancel"
					device="mobile"
					variant="outlined"
					onClick={handleClose}
				>
					취소
				</ButtonDialog>
			</DialogActions>
		</Dialog>
	);
};

const DialogAddressForm: FC<DialogDispatchProps> = ({
	open,
	address,
	setField,
	handleClose,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const methods = useForm<AddressFormValues>({
		mode: 'onChange',
		defaultValues: addressValues,
		resolver: yupResolver(addressSchema),
	});

	const submitForm: SubmitHandler<AddressFormValues> = async (
		data: AddressFormValues
	) => {
		const orderFormData: AddressInfoData = {
			memberName: data.memberName,
			cellPhoneNumber: data.cellPhoneNumber,
			zipcode: data.zipcode,
			roadNameBasicAddress: data.roadNameBasicAddress,
			roadNameDetailAddress: data.roadNameDetailAddress,
		};
		await address.create(orderFormData);
		setField();
		handleClose();
	};

	return (
		<FormProvider {...methods}>
			{isDesktop && (
				<AddressPC
					title={'주소록'}
					open={open}
					handleClose={handleClose}
					onSubmit={submitForm}
				/>
			)}
			{isMobile && (
				<AddressMobile
					title={'주소록'}
					open={open}
					handleClose={handleClose}
					onSubmit={submitForm}
				/>
			)}
		</FormProvider>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	address: bindActionCreators(Api.address, dispatch),
});

export default connect(null, mapDispatchToProps)(DialogAddressForm);
