import React, { FC, useState, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import { GoodsData } from '@api/types';
import ButtonBase from '@components/button/ButtonBase';
import {
	Box,
	Grid,
	Typography,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DialogGoodsMobile from '@components/dialog/goods/DialogGoodsMobile';
import RenderTextField from '@components/field/TextField';
import RenderSelectField from '@components/field/SelectField';
import RenderUploadField from '@components/field/file/UploadField';
import RenderDatePickerField from '@components/field/DatePickerField';
import { EventFormValues, EventDetailValues } from '@pages/admin/types';
import goToEvent from '@navigate/admin/event/goToEvent';
import { useIsMobile } from '@context/MobileContext';
import dayjs from 'dayjs';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

interface EventProp {
	title: string;
	description: string;
	onSubmit: (
		data: EventFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const EventFormMobile: FC<EventProp> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
		watch,
	} = useFormContext<EventFormValues>();

	const { fields, replace } = useFieldArray({
		control,
		name: 'goods',
	});
	const replaceField = (productData: readonly GoodsData[]) => {
		replace(
			productData.map(({ goodsCode, goodsName, salePrice }, i: number) => ({
				goodsCode,
				goodsName,
				salePrice,
				sortSequence: i + 1,
			}))
		);
	};

	const openGoods = () => setOpen(true);
	const closeGoods = () => setOpen(false);

	const cancelClick = () => {
		goToEvent({ title, description, dispatch, navigate });
	};

	const conditionTh: SxProps<Theme> = {
		px: 1,
		py: 1.5,
		width: '20%',
		fontSize: { xs: '11px', sm: '13px' },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const conditionTd: SxProps<Theme> = {
		pl: 1.5,
		pr: 0,
		fontSize: { xs: '12px', sm: '13px' },
		border: tableBorder,
	};
	const uploadTh: SxProps<Theme> = {
		px: 1,
		py: 1.5,
		width: '20%',
		fontSize: { xs: '11px', sm: '13px' },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const uploadTd: SxProps<Theme> = {
		pl: 1.5,
		pr: 0,
		fontSize: { xs: '12px', sm: '13px' },
		display: 'flex',
		justifyContent: 'start',
	};
	const dataTh: SxProps<Theme> = {
		px: { xs: 1, sm: 2 },
		py: 1,
		fontSize: { xs: '11px', sm: '12px' },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 1.5,
		py: 0.5,
		border: tableBorder,
		fontSize: { xs: '11px', sm: '12px' },
	};
	const dataTdNum: SxProps<Theme> = {
		px: isMobile ? 0 : 1,
		width: isMobile ? '94px' : '130px',
		'.MuiFormControl-root': {
			height: '34px',
		},
		'.MuiFormHelperText-root': {
			display: 'none',
		},
		'.MuiInputBase-root': {
			overflowY: 'hidden',
		},
	};
	const dateHorizonIcon: SxProps<Theme> = {
		px: 0.5,
	};
	const eventForm: SxProps<Theme> = {
		'input[type="text"]': {
			py: 1.5,
		},
		'.MuiFormControl-root': {
			mt: 0.5,
			overflowX: 'visible',
		},
		'label[id$="title-label"]': {
			top: '-3px',
			ml: 0.5,
		},
		'label[id$="title-label"][data-shrink="true"]': {
			top: '-1px',
			ml: 1,
		},
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={eventForm}
		>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableBody sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								제목
							</TableCell>
							<TableCell colSpan={3} sx={dataTd} align="left">
								<Controller
									name="title"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="제목을 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								노출기간
							</TableCell>
							<TableCell colSpan={3} sx={conditionTd} align="left">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Controller
										name="startDate"
										control={control}
										render={({ field, fieldState, formState }) => (
											<RenderDatePickerField
												label="시작날짜"
												field={field}
												fieldState={fieldState}
												formState={formState}
												minDate={dayjs()}
											/>
										)}
									/>
									<Typography component="span" sx={dateHorizonIcon}>
										-
									</Typography>
									<Controller
										name="endDate"
										control={control}
										render={({ field, fieldState, formState }) => (
											<RenderDatePickerField
												label="만료날짜"
												field={field}
												fieldState={fieldState}
												formState={formState}
												minDate={watch('startDate')}
											/>
										)}
									/>
								</LocalizationProvider>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={uploadTh} align="center" component="th">
								전시
							</TableCell>
							<TableCell sx={uploadTd} align="left">
								<Controller
									name="displayFile"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderUploadField
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={uploadTh} align="center" component="th">
								이벤트
							</TableCell>
							<TableCell sx={uploadTd} align="left">
								<Controller
									name="eventFile"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderUploadField
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								전시여부
							</TableCell>
							<TableCell colSpan={3} sx={conditionTd} align="left">
								<Controller
									name="useyn"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderSelectField
											label="전시여부"
											datas={[
												{ value: '', label: '전체' },
												{ value: 'Y', label: '예' },
												{ value: 'N', label: '아니오' },
											]}
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
			<Box
				sx={{ pt: 4, pb: 2, display: 'flex', justifyContent: 'space-between' }}
			>
				<Box>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						sx={{ fontSize: '16px', fontWeight: 'bold' }}
					>
						상품전시
					</Typography>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Grid container spacing={1} sx={{ justifyContent: 'end' }}>
						<Grid item>
							<ButtonBase
								type="submit"
								buttonType="save"
								size="small"
								variant="outlined"
								disabled={isSubmitted && !isValid}
							>
								저장
							</ButtonBase>
						</Grid>
						<Grid item>
							<ButtonBase
								buttonType="search"
								size="small"
								variant="outlined"
								onClick={openGoods}
							>
								상품찾기
							</ButtonBase>
							<DialogGoodsMobile
								open={open}
								replaceField={replaceField}
								handleClose={closeGoods}
								goodsSaveData={watch('goods')}
							/>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableHead sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								상품코드
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								상품명
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								판매가
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								노출순서
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{fields.map((data: EventDetailValues, index: number) => (
							<TableRow key={index}>
								<TableCell sx={dataTd} align="center">
									{data.goodsCode}
								</TableCell>
								<TableCell sx={dataTd} align="center">
									{data.goodsName}
								</TableCell>
								<TableCell sx={dataTd} align="center">
									{data.salePrice.toLocaleString()}
								</TableCell>
								<TableCell sx={dataTdNum} align="center">
									<Controller
										name={`goods.${index}.sortSequence`}
										control={control}
										render={({ field, fieldState, formState }) => (
											<RenderTextField
												type="number"
												label="노출순서"
												field={field}
												fieldState={fieldState}
												formState={formState}
											/>
										)}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ pt: 2 }}>
				<ButtonBase
					buttonType="cancel"
					device="mobile"
					variant="outlined"
					onClick={cancelClick}
				>
					취소
				</ButtonBase>
			</Box>
		</Box>
	);
};

export default EventFormMobile;
