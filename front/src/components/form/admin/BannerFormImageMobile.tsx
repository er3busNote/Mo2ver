import React, {
	FC,
	useRef,
	useState,
	useEffect,
	BaseSyntheticEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeNext, menuActive } from '../../../store/index';
import { TitleInfo } from '../../../store/types';
import { Control, Controller, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	Box,
	Fade,
	Grid,
	Modal,
	Button,
	Backdrop,
	Typography,
	InputBase,
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
import RenderTextField from '../../validate/TextField';
import RenderSelectField from '../../validate/SelectField';
import RenderUploadField from '../../validate/UploadField';
import RenderDatePickerField from '../../validate/DatePickerField';
import { BannerFormImageValues } from './types';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

const bnnrImageSchema = yup
	.object()
	.shape({
		title: yup
			.string()
			.required('제목을 입력해주세요')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		startDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.nullable()
			.required('시작날짜가 존재하질 않습니다'),
		endDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.when(
				'startDate',
				(startDate, schema) =>
					startDate &&
					schema.test({
						test: (endDate) =>
							endDate && endDate.isAfter(startDate.toLocaleString()),
						message: '시작날짜 이후여야 합니다',
					})
			)
			.nullable()
			.required('마지막날짜가 존재하질 않습니다'),
		position: yup.string().required(),
		type: yup.string().required(),
		useyn: yup.string().required(),
		bnnrImg: yup
			.array()
			.of(
				yup.object().shape({
					title: yup.string().required(),
					bnnrImg: yup
						.mixed<File>()
						.test(
							'fileSize',
							'File size is too large',
							(value) => value && value.size <= 1024 * 1024 * 5 // 5MB
						)
						.test(
							'fileType',
							'Invalid file type',
							(value) =>
								value && ['image/jpeg', 'image/png'].includes(value.type)
						),
					cnntUrl: yup.string().required(),
					useyn: yup.string().required(),
				})
			)
			.required('이미지 정보를 입력해주세요'),
	})
	.required();

interface BannerProp {
	title: string;
	description: string;
	onSubmit: (
		data: BannerFormImageValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const bnnrImageValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'BN',
	useyn: 'Y',
	bnnrImg: [{ title: '', bnnrImg: undefined, cnntUrl: '', useyn: '' }],
};

interface ModalProps {
	index: number;
	control: Control<BannerFormImageValues> | undefined;
	open: boolean;
	handleClose: () => void;
	style: SxProps<Theme>;
	header: SxProps<Theme>;
	base: SxProps<Theme>;
}

const TitleModal: FC<ModalProps> = ({
	index,
	control,
	open,
	handleClose,
	style,
	header,
	base,
}): JSX.Element => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					<Typography variant="h6" component="h2" sx={header}>
						배너내용 - {index}번째
					</Typography>
					<Box sx={base}>
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
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
};

const CnntUrlModal: FC<ModalProps> = ({
	index,
	control,
	open,
	handleClose,
	style,
	header,
	base,
}): JSX.Element => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					<Typography variant="h6" component="h2" sx={header}>
						연결 URL - {index}번째
					</Typography>
					<Box sx={base}>
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
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
};

const BannerFormImageMobile: FC<BannerProp> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const watchValue = useRef<string>('BN');
	const [titleOpen, setTitleOpen] = useState(false);
	const [cnntUrlOpen, setCnntUrlOpen] = useState(false);
	const { control, handleSubmit, formState, watch } =
		useForm<BannerFormImageValues>({
			mode: 'onChange',
			defaultValues: bnnrImageValues,
			resolver: yupResolver(bnnrImageSchema),
		});
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'bnnrImg',
	});
	const addNewField = () => {
		append({ title: '', bnnrImg: undefined, cnntUrl: '', useyn: '' });
	};
	const removeField = () => {
		remove(-1);
	};

	useEffect(() => {
		const type = watch('type');
		if (type !== watchValue.current) {
			const titleData: TitleInfo = {
				title: title,
				description: description,
				prevTitle: title,
				prevDescription: description,
			};
			switch (type) {
				case 'GD':
					dispatch(changeNext(titleData));
					dispatch(menuActive('/admin/banner/goods'));
					navigate('/admin/banner/goods');
					break;
				case 'VD':
					dispatch(changeNext(titleData));
					dispatch(menuActive('/admin/banner/video'));
					navigate('/admin/banner/video');
					break;
				default:
					break;
			}
		}
	}, [watch('type')]);

	const openTitle = () => setTitleOpen(true);
	const closeTitle = () => setTitleOpen(false);
	const openCnntUrl = () => setCnntUrlOpen(true);
	const closeCnntUrl = () => setCnntUrlOpen(false);

	const cancelClick = () => {
		const titleData: TitleInfo = {
			title: title,
			description: description,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive('/admin/banner'));
		navigate('/admin/banner');
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
	const dateHorizonIcon: SxProps<Theme> = {
		px: 0.5,
	};
	const bannerForm: SxProps<Theme> = {
		'input[type="text"]': {
			py: 1.5,
		},
		'.MuiFormControl-root': {
			mt: 0.5,
			overflowX: 'visible',
		},
		'label[id$="title-label"], label[id$="bnnrImg-label"], label[id$="cnntUrl-label"]':
			{
				top: '-5px',
				ml: 1,
			},
		'label[id$="title-label"][data-shrink="true"], label[id$="bnnrImg-label"][data-shrink="true"], label[id$="cnntUrl-label"][data-shrink="true"]':
			{
				top: '5px',
				ml: 2,
			},
	};
	const modalStyle: SxProps<Theme> = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: { xs: 300, sm: 400 },
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
	};
	const inputBase: SxProps<Theme> = {
		fontSize: '12px',
		fontWeight: 'bold',
		color: '#000',
		'.MuiInputBase-readOnly': {
			textAlign: 'center',
		},
	};
	const inputHeader: SxProps<Theme> = {
		px: 2,
		color: '#fff',
		fontSize: '0.9rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#363b74',
	};
	const inputBody: SxProps<Theme> = {
		px: 4,
		py: 1,
		'.MuiFormControl-root': {
			width: '100% !important',
			overflowX: 'visible',
		},
		'.MuiFormLabel-root': {
			left: '10px !important',
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
											/>
										)}
									/>
								</LocalizationProvider>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								노출위치
							</TableCell>
							<TableCell sx={conditionTd} align="left">
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
						</TableRow>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								템플릿
							</TableCell>
							<TableCell sx={conditionTd} align="left">
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
							<TableCell sx={conditionTh} align="center" component="th">
								전시여부
							</TableCell>
							<TableCell colSpan={3} sx={conditionTd} align="left">
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
						sx={{ fontSize: '16px', fontWeight: 'bold' }}
					>
						배너이미지
					</Typography>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Grid container spacing={1} sx={{ justifyContent: 'end' }}>
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
								onClick={addNewField}
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
								onClick={removeField}
							>
								삭제
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableHead sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								배너내용
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								배너이미지
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								URL
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								전시여부
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{fields.map((field, index) => (
							<TableRow key={field.id}>
								<TableCell sx={dataTd} align="center">
									<InputBase
										sx={inputBase}
										placeholder={`${index}`}
										onClick={openTitle}
										readOnly={true}
									/>
									<TitleModal
										index={index}
										control={control}
										open={titleOpen}
										handleClose={closeTitle}
										style={modalStyle}
										header={inputHeader}
										base={inputBody}
									/>
								</TableCell>
								<TableCell sx={dataTd} align="center">
									<Controller
										name={`bnnrImg.${index}.bnnrImg`}
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
								<TableCell sx={dataTd} align="center">
									<InputBase
										sx={inputBase}
										placeholder={'click'}
										onClick={openCnntUrl}
										readOnly={true}
									/>
									<CnntUrlModal
										index={index}
										control={control}
										open={cnntUrlOpen}
										handleClose={closeCnntUrl}
										style={modalStyle}
										header={inputHeader}
										base={inputBody}
									/>
								</TableCell>
								<TableCell sx={dataTd} align="center">
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
						width: '100%',
						fontSize: { xs: '10px', sm: '12px' },
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

export default BannerFormImageMobile;
