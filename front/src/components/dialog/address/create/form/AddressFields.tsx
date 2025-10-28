import React, { FC, useState } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { Controller, useFormContext } from 'react-hook-form';
import {
	Box,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import DialogSearchPC from '@components/dialog/address/search/DialogSearchPC';
import DialogSearchMobile from '@components/dialog/address/search/DialogSearchMobile';
import RenderTextField from '@components/field/TextField';
import RenderTextSearchField from '@components/field/TextSearchField';
import { fontSize_xs, fontSize_sm, fontSize_lg } from '@utils/style';
import { AddressFormValues } from '@/types/form';

const tableBorder = '1px solid #d2d2d2';

interface AddressFieldsProps {
	address: ActionCreatorsMapObject;
}

const AddressFields: FC<AddressFieldsProps> = ({ address }): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [open, setOpen] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<string>('');
	const { control } = useFormContext<AddressFormValues>();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const dataTh: SxProps<Theme> = {
		p: 0,
		width: { xs: 80, sm: 100 },
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#f9f9f9',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		border: tableBorder,
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
	};
	const addressForm: SxProps<Theme> = {
		'input[type="text"]': {
			py: { xs: 1.5, sm: 2 },
		},
		'.MuiFormControl-root': {
			mt: 0.5,
			overflowX: 'visible',
		},
		'label[id$="memberName-label"], label[id$="cellPhoneNumber-label"], label[id$="zipcode-label"], label[id$="roadNameBasicAddress-label"], label[id$="roadNameDetailAddress-label"]':
			{
				top: { xs: '-3px', sm: '0px' },
				ml: { xs: 0.5, sm: 1 },
			},
		'label[id$="memberName-label"][data-shrink="true"], label[id$="cellPhoneNumber-label"][data-shrink="true"], label[id$="zipcode-label"][data-shrink="true"], label[id$="roadNameBasicAddress-label"][data-shrink="true"], label[id$="roadNameDetailAddress-label"][data-shrink="true"]':
			{
				top: { xs: '-1px', sm: '0px' },
				ml: { xs: 1, sm: 2 },
			},
	};

	return (
		<Box mt={1.5} sx={addressForm}>
			<TableContainer>
				<Table size="small">
					<TableBody>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								수령자
							</TableCell>
							<TableCell sx={dataTd} align="left">
								<Controller
									name="memberName"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="수령자를 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								핸드폰번호
							</TableCell>
							<TableCell sx={dataTd} align="left">
								<Controller
									name="cellPhoneNumber"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="핸드폰번호를 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								우편번호
							</TableCell>
							<TableCell sx={dataTd} align="left">
								<Controller
									name="zipcode"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextSearchField
											type="text"
											label="우편번호를 입력해주세요"
											handleOpen={handleOpen}
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								배송지주소
							</TableCell>
							<TableCell sx={dataTd} align="left">
								<Controller
									name="roadNameBasicAddress"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="배송지주소를 입력해주세요"
											readonly={true}
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								상세주소
							</TableCell>
							<TableCell sx={dataTd} align="left">
								<Controller
									name="roadNameDetailAddress"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="상세주소를 입력해주세요"
											readonly={true}
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			{isDesktop && (
				<DialogSearchPC
					open={open}
					address={address}
					setSelectedValue={setSelectedValue}
					handleClose={handleClose}
				/>
			)}
			{isMobile && (
				<DialogSearchMobile
					open={open}
					address={address}
					setSelectedValue={setSelectedValue}
					handleClose={handleClose}
				/>
			)}
		</Box>
	);
};

export default AddressFields;
