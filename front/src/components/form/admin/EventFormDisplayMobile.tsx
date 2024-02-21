import React, {
	FC,
	useState,
	Dispatch,
	SetStateAction,
	BaseSyntheticEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	GoodsData,
	CategoryData,
	CategoryPageData,
} from '../../../services/types';
import { changeNext, menuActive } from '../../../store/index';
import { TitleInfo } from '../../../store/types';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GoodsDialogMobile from './dialog/GoodsDialogMobile';
import RenderTextField from '../../validate/TextField';
import RenderSelectField from '../../validate/SelectField';
import RenderUploadField from '../../validate/UploadField';
import RenderDatePickerField from '../../validate/DatePickerField';
import { EventFormDisplayValues, EventDisplayDetailValues } from './types';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import { isMobile } from 'react-device-detect';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

const eventDisplaySchema = yup
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
		useyn: yup.string().required('필수항목'),
		displayImg: yup
			.mixed<File>()
			.test('file', '파일을 선택하세요', (value) => value && value.size > 0)
			.test(
				'fileSize',
				'파일크기가 너무 작습니다',
				(value) => value && value.size <= 1024 * 1024 * 5 // 5MB
			)
			.test(
				'fileType',
				'지원되는 파일 타입이 아닙니다',
				(value) => value && ['image/jpeg', 'image/png'].includes(value.type)
			),
		eventImg: yup
			.mixed<File>()
			.test('file', '파일을 선택하세요', (value) => value && value.size > 0)
			.test(
				'fileSize',
				'파일크기가 너무 작습니다',
				(value) => value && value.size <= 1024 * 1024 * 5 // 5MB
			)
			.test(
				'fileType',
				'지원되는 파일 타입이 아닙니다',
				(value) => value && ['image/jpeg', 'image/png'].includes(value.type)
			),
		goods: yup
			.array()
			.of(
				yup.object().shape({
					goodsCode: yup.string().required('상품코드'),
					goodsName: yup.string().required('상품내용'),
					salePrice: yup.number().required('판매가'),
					sortSequence: yup
						.number()
						.positive('1 이상의 값을 입력해주세요')
						.required('정렬순서'),
				})
			)
			.required('상품 전시 정보를 선택해주세요'),
	})
	.required();

interface EventProp {
	title: string;
	description: string;
	goodsData: CategoryPageData;
	largeCategoryData: Array<CategoryData>;
	mediumCategoryData: Array<CategoryData>;
	smallCategoryData: Array<CategoryData>;
	setLargeCategoryCode: Dispatch<SetStateAction<string>>;
	setMediumCategoryCode: Dispatch<SetStateAction<string>>;
	setSmallCategoryCode: Dispatch<SetStateAction<string>>;
	setPage: Dispatch<SetStateAction<number>>;
	searchClick: (goodsName: string) => void;
	onSubmit: (
		data: EventFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const eventDisplayValues: EventFormDisplayValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	useyn: 'Y',
	displayImg: undefined,
	eventImg: undefined,
	goods: [],
};

const EventFormDisplayMobile: FC<EventProp> = ({
	title,
	description,
	goodsData,
	largeCategoryData,
	mediumCategoryData,
	smallCategoryData,
	setLargeCategoryCode,
	setMediumCategoryCode,
	setSmallCategoryCode,
	setPage,
	searchClick,
	onSubmit,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useForm<EventFormDisplayValues>({
		mode: 'onChange',
		defaultValues: eventDisplayValues,
		resolver: yupResolver(eventDisplaySchema),
	});
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
	const bannerForm: SxProps<Theme> = {
		'input[type="text"]': {
			py: 1.5,
		},
		'.MuiFormControl-root': {
			mt: 0.5,
			overflowX: 'visible',
		},
		'label[id$="title-label"], label[id$="bnnrText-label"], label[id$="cnntUrl-label"]':
			{
				top: '-5px',
				ml: 1,
			},
		'label[id$="title-label"][data-shrink="true"], label[id$="bnnrText-label"][data-shrink="true"], label[id$="cnntUrl-label"][data-shrink="true"]':
			{
				top: '5px',
				ml: 2,
			},
	};
	const inputHeader: SxProps<Theme> = {
		px: 2,
		py: 0.5,
		color: '#fff',
		fontSize: '0.9rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#363b74',
	};
	const inputBody: SxProps<Theme> = {
		px: isMobile ? 0 : 2,
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
							<TableCell sx={uploadTh} align="center" component="th">
								전시
							</TableCell>
							<TableCell sx={uploadTd} align="left">
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
						</TableRow>
						<TableRow>
							<TableCell sx={uploadTh} align="center" component="th">
								이벤트
							</TableCell>
							<TableCell sx={uploadTd} align="left">
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
						sx={{ fontSize: '16px', fontWeight: 'bold' }}
					>
						상품전시
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
								disabled={isSubmitted && !isValid}
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
								onClick={openGoods}
							>
								상품찾기
							</Button>
							<GoodsDialogMobile
								open={open}
								goodsData={goodsData}
								largeCategoryData={largeCategoryData}
								mediumCategoryData={mediumCategoryData}
								smallCategoryData={smallCategoryData}
								setLargeCategoryCode={setLargeCategoryCode}
								setMediumCategoryCode={setMediumCategoryCode}
								setSmallCategoryCode={setSmallCategoryCode}
								setPage={setPage}
								searchClick={searchClick}
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

export default EventFormDisplayMobile;
