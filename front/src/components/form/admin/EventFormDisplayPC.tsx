import React, { FC, useState, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoodsData } from '../../../api/types';
import { changeNext, menuActive } from '../../../store/index';
import { TitleInfo } from '../../../store/types';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import ButtonBase from '../../button/ButtonBase';
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
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import GoodsDialogPC from './dialog/GoodsDialogPC';
import RenderTextField from '../../validate/TextField';
import RenderSelectField from '../../validate/SelectField';
import RenderUploadField from '../../validate/UploadField';
import RenderDatePickerField from '../../validate/DatePickerField';
import { EventFormDisplayValues, EventDisplayDetailValues } from './types';
// import _ from 'lodash';

const fontSize_sm = '13px';
const fontSize_lg = '14px';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

interface EventProp {
	title: string;
	description: string;
	onSubmit: (
		data: EventFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const EventFormDisplayPC: FC<EventProp> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useFormContext<EventFormDisplayValues>();

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
		const titleData: TitleInfo = {
			title: title,
			description: description,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive('/admin/event'));
		navigate('/admin/event');
	};

	const conditionTh: SxProps<Theme> = {
		px: 2,
		py: 1.5,
		width: 120,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const conditionTd: SxProps<Theme> = {
		px: 2,
		pt: 0.8,
		pb: 1.5,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		border: tableBorder,
	};
	const uploadTh: SxProps<Theme> = {
		px: 2,
		py: 1,
		width: 120,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const uploadTd: SxProps<Theme> = {
		px: 2,
		py: 1.5,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		borderBottom: 'none',
		display: 'flex',
		justifyContent: 'start',
	};
	const dataTh: SxProps<Theme> = {
		px: 2,
		py: 1.2,
		minWidth: '47px',
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 2,
		py: 0.5,
		border: tableBorder,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
	};
	const dataTdNum: SxProps<Theme> = {
		width: '220px',
		'.MuiInputBase-input': {
			py: 2,
		},
	};
	const bannerForm: SxProps<Theme> = {
		'input[type="text"]': {
			py: 2,
		},
		'.MuiFormControl-root': {
			mt: 0.5,
			overflowX: 'visible',
		},
		'label[id$="title-label"]': {
			top: '0px',
			ml: 1,
		},
		'label[id$="title-label"][data-shrink="true"]': {
			top: '2px',
			ml: 2,
		},
	};
	const inputHeader: SxProps<Theme> = {
		px: 2,
		py: 0,
		color: '#fff',
		fontSize: '1.0rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#363b74',
	};
	const inputBody: SxProps<Theme> = {
		px: 4,
		py: 1,
	};
	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={bannerForm}
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
											/>
										)}
									/>
									<HorizontalRuleIcon />
									<Controller
										name="endDate"
										control={control}
										render={({ field, fieldState, formState }) => (
											<RenderDatePickerField
												label="만료날짜"
												field={field}
												fieldState={fieldState}
												formState={formState}
											/>
										)}
									/>
								</LocalizationProvider>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={uploadTh} align="center" component="th">
								전시 이미지
							</TableCell>
							<TableCell sx={uploadTd}>
								<Controller
									name="displayImg"
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
							<TableCell sx={uploadTh} align="center" component="th">
								이벤트 이미지
							</TableCell>
							<TableCell sx={uploadTd}>
								<Controller
									name="eventImg"
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
						sx={{ fontWeight: 'bold' }}
					>
						상품전시
					</Typography>
				</Box>
				<Box>
					<Grid container spacing={1}>
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
							<GoodsDialogPC
								open={open}
								replaceField={replaceField}
								handleClose={closeGoods}
								header={inputHeader}
								base={inputBody}
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
						{fields.map((data: EventDisplayDetailValues, index: number) => (
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
					device="pc"
					variant="outlined"
					onClick={cancelClick}
				>
					취소
				</ButtonBase>
			</Box>
		</Box>
	);
};

export default EventFormDisplayPC;
