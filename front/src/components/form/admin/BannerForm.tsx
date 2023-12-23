import React, { FC, Dispatch, SetStateAction, BaseSyntheticEvent } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	Box,
	Grid,
	Button,
	Typography,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import RenderTextField from '../../validate/TextField';
import RenderSelectField from '../../validate/SelectField';
import RenderDatePickerField from '../../validate/DatePickerField';
import { BannerFormValues } from './types';
// import _ from 'lodash';
import moment from 'moment';

const schema = yup
	.object({
		title: yup
			.string()
			.required('제목을 입력해주세요')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		startDate: yup.date().required('시작날짜가 존재하질 않습니다'),
		endDate: yup
			.date()
			.when(
				'startDate',
				(startDate, schema) => startDate && schema.min(startDate)
			),
	})
	.required();

interface BannerProp {
	onSubmit: (
		data: BannerFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
	title: '',
	startDate: moment().toDate(),
	endDate: moment().toDate(),
	position: '',
	type: 'BN',
	useyn: 'Y',
	bnnrImg: [{ title: '', bnnrText: '', cnntUrl: '', useyn: '' }],
};

const BannerForm: FC<BannerProp> = ({ onSubmit, setOpen }): JSX.Element => {
	const { control, handleSubmit, formState } = useForm<BannerFormValues>({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema),
	});
	const { fields } = useFieldArray({ control, name: 'bnnrImg' });

	const cancelClick = () => {
		setOpen(true);
	};

	const thHeader: SxProps<Theme> = {
		px: { xs: 1, sm: 2 },
		py: 1,
		width: '12%',
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
		bgcolor: '#EEEEEE',
		border: '2px solid #d2d2d2',
		fontWeight: 'bold',
	};
	const tdHeader: SxProps<Theme> = {
		border: '2px solid #d2d2d2',
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
	};
	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
			<TableContainer>
				<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
					<TableBody>
						<TableRow>
							<TableCell sx={thHeader} align="center" component="th">
								키워드 검색
							</TableCell>
							<TableCell colSpan={3} sx={tdHeader} align="left">
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
							<TableCell sx={thHeader} align="center" component="th">
								전시기간
							</TableCell>
							<TableCell colSpan={3} sx={tdHeader} align="left">
								<LocalizationProvider dateAdapter={AdapterMoment}>
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
							<TableCell sx={thHeader} align="center" component="th">
								노출 위치
							</TableCell>
							<TableCell sx={tdHeader} align="left">
								<Controller
									name="position"
									control={control}
									render={({ field, formState }) => (
										<RenderSelectField
											label="노출 위치"
											datas={[
												{ value: '', label: '전체' },
												{ value: '11', label: '메인상단-A' },
												{ value: '12', label: '메인상단-B' },
												{ value: '20', label: '메인중간' },
												{ value: '30', label: '메인중하단' },
												{ value: '40', label: '메인하단' },
												{ value: '50', label: '메인최상단' },
											]}
											field={field}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
							<TableCell sx={thHeader} align="center" component="th">
								템플릿 유형
							</TableCell>
							<TableCell sx={tdHeader} align="left">
								<Controller
									name="type"
									control={control}
									render={({ field, formState }) => (
										<RenderSelectField
											label="템플릿 유형"
											datas={[
												{ value: 'BN', label: '배너이미지' },
												{ value: 'GD', label: '상품전시' },
												{ value: 'VD', label: '동영상' },
											]}
											field={field}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={thHeader} align="center" component="th">
								전시여부
							</TableCell>
							<TableCell colSpan={3} sx={tdHeader} align="left">
								<Controller
									name="useyn"
									control={control}
									render={({ field, formState }) => (
										<RenderSelectField
											label="전시여부"
											datas={[
												{ value: '', label: '전체' },
												{ value: 'Y', label: '예' },
												{ value: 'N', label: '아니오' },
											]}
											field={field}
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
						배너이미지
					</Typography>
				</Box>
				<Box>
					<Grid container spacing={1}>
						<Grid item>
							<Button
								type="submit"
								sx={{
									px: 4,
									py: 0.8,
									fontSize: '8px',
									fontWeight: 'bold',
									bgcolor: '#7940B6',
									border: '1px solid #757595',
									borderRadius: 0,
									color: '#fff',
									'&:hover': {
										bgcolor: '#9373B5',
									},
								}}
								variant="outlined"
								disabled={formState.isSubmitted && !formState.isValid}
							>
								저장
							</Button>
						</Grid>
						<Grid item>
							<Button
								sx={{
									px: 4,
									py: 0.8,
									fontSize: '8px',
									fontWeight: 'bold',
									bgcolor: '#363658',
									border: '1px solid #757595',
									borderRadius: 0,
									color: '#fff',
									'&:hover': {
										bgcolor: '#757595',
									},
								}}
								variant="outlined"
							>
								추가
							</Button>
						</Grid>
						<Grid item>
							<Button
								sx={{
									px: 4,
									py: 0.8,
									fontSize: '8px',
									fontWeight: 'bold',
									bgcolor: '#363658',
									border: '1px solid #757595',
									borderRadius: 0,
									color: '#fff',
									'&:hover': {
										bgcolor: '#757595',
									},
								}}
								variant="outlined"
							>
								삭제
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<TableContainer>
				<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
					<TableHead>
						<TableRow>
							<TableCell
								sx={{ ...thHeader, width: '30%' }}
								align="center"
								component="th"
							>
								배너내용
							</TableCell>
							<TableCell
								sx={{ ...thHeader, width: '40%' }}
								align="center"
								component="th"
							>
								배너이미지
							</TableCell>
							<TableCell
								sx={{ ...thHeader, width: '25%' }}
								align="center"
								component="th"
							>
								URL
							</TableCell>
							<TableCell
								sx={{ ...thHeader, width: '15%' }}
								align="center"
								component="th"
							>
								전시여부
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{fields.map((field, index) => (
							<TableRow key={field.id}>
								<TableCell sx={tdHeader} align="center">
									<Controller
										name={`bnnrImg.${index}.title`}
										control={control}
										render={({ field, fieldState, formState }) => (
											<RenderTextField
												type="text"
												label="배너내용을 입력해주세요"
												field={field}
												fieldState={fieldState}
												formState={formState}
											/>
										)}
									/>
								</TableCell>
								<TableCell sx={tdHeader} align="center">
									<Controller
										name={`bnnrImg.${index}.bnnrText`}
										control={control}
										render={({ field, fieldState, formState }) => (
											<RenderTextField
												type="text"
												label="배경이미지을 입력해주세요"
												field={field}
												fieldState={fieldState}
												formState={formState}
											/>
										)}
									/>
								</TableCell>
								<TableCell sx={tdHeader} align="center">
									<Controller
										name={`bnnrImg.${index}.cnntUrl`}
										control={control}
										render={({ field, fieldState, formState }) => (
											<RenderTextField
												type="text"
												label="URL을 입력해주세요"
												field={field}
												fieldState={fieldState}
												formState={formState}
											/>
										)}
									/>
								</TableCell>
								<TableCell sx={tdHeader} align="center">
									<Controller
										name={`bnnrImg.${index}.useyn`}
										control={control}
										render={({ field, formState }) => (
											<RenderSelectField
												label="전시여부"
												datas={[
													{ value: '', label: '전체' },
													{ value: 'Y', label: '예' },
													{ value: 'N', label: '아니오' },
												]}
												field={field}
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
				<Button
					sx={{
						px: 6,
						py: 1,
						fontSize: '14px',
						fontWeight: 'bold',
						bgcolor: '#363658',
						border: '1px solid #757595',
						borderRadius: 0,
						color: '#fff',
						'&:hover': {
							bgcolor: '#757595',
						},
					}}
					variant="outlined"
					onClick={cancelClick}
				>
					취소
				</Button>
			</Box>
		</Box>
	);
};

export default BannerForm;
