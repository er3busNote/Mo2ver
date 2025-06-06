import React, { FC, useRef, useEffect, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import { CodeData } from '@api/types';
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
import { HorizontalRule as HorizontalRuleIcon } from '@mui/icons-material';
import RenderTextField from '@components/field/TextField';
import RenderSelectField from '@components/field/SelectField';
import RenderDatePickerField from '@components/field/DatePickerField';
import { BannerVideoFormValues } from '@pages/admin/types';
import goToBanner from '@navigate/admin/banner/goToBanner';
import goToBannerForm from '@navigate/admin/banner/goToBannerForm';
import { renameKeys } from '@utils/code';
import dayjs from 'dayjs';

const fontSize_sm = '13px';
const fontSize_lg = '14px';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

interface BannerVideoProp {
	title: string;
	description: string;
	groupCodeData: Record<string, Array<CodeData>> | undefined;
	onSubmit: (
		data: BannerVideoFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const BannerVideoFormPC: FC<BannerVideoProp> = ({
	title,
	description,
	groupCodeData,
	onSubmit,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const watchValue = useRef<string>('VD');

	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
		watch,
	} = useFormContext<BannerVideoFormValues>();

	useEffect(() => {
		const type = watch('type');
		if (type !== watchValue.current) {
			goToBannerForm({ type, title, description, dispatch, navigate });
		}
	}, [watch('type')]);

	const cancelClick = () => {
		goToBanner({ title, description, dispatch, navigate });
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
												minDate={dayjs()}
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
												minDate={watch('startDate')}
											/>
										)}
									/>
								</LocalizationProvider>
							</TableCell>
						</TableRow>
						{groupCodeData && (
							<>
								<TableRow>
									<TableCell sx={conditionTh} align="center" component="th">
										노출위치
									</TableCell>
									<TableCell sx={conditionTd} align="left">
										<Controller
											name="position"
											control={control}
											render={({ field, fieldState, formState }) => (
												<RenderSelectField
													label="노출 위치"
													datas={renameKeys(groupCodeData, 'BN002')}
													field={field}
													fieldState={fieldState}
													formState={formState}
												/>
											)}
										/>
									</TableCell>
									<TableCell sx={conditionTh} align="center" component="th">
										템플릿 유형
									</TableCell>
									<TableCell sx={conditionTd} align="left">
										<Controller
											name="type"
											control={control}
											render={({ field, fieldState, formState }) => (
												<RenderSelectField
													label="템플릿 유형"
													datas={renameKeys(groupCodeData, 'BN001')}
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
										전시상태코드
									</TableCell>
									<TableCell sx={conditionTd} align="left">
										<Controller
											name="code"
											control={control}
											render={({ field, fieldState, formState }) => (
												<RenderSelectField
													label="전시상태코드"
													datas={renameKeys(groupCodeData, 'BN003')}
													field={field}
													fieldState={fieldState}
													formState={formState}
												/>
											)}
										/>
									</TableCell>
									<TableCell sx={conditionTh} align="center" component="th">
										전시여부
									</TableCell>
									<TableCell sx={conditionTd} align="left">
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
							</>
						)}
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
						동영상
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
					</Grid>
				</Box>
			</Box>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableHead sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								동영상내용
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								동영상
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<></>
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

export default BannerVideoFormPC;
