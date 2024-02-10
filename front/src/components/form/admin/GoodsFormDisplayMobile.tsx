import React, { FC, useRef, useEffect, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeNext, menuActive } from '../../../store/index';
import { TitleInfo } from '../../../store/types';
import { Controller, useForm } from 'react-hook-form';
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
import RenderTextField from '../../validate/TextField';
import RenderSelectField from '../../validate/SelectField';
import RenderDatePickerField from '../../validate/DatePickerField';
import { GoodsFormDisplayValues } from './types';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

const goodsDisplaySchema = yup
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
	})
	.required();

interface GoodsProp {
	title: string;
	description: string;
	onSubmit: (
		data: GoodsFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const goodsDisplayValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'GD',
	useyn: 'Y',
};

const GoodsFormDisplayMobile: FC<GoodsProp> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const watchValue = useRef<string>('GD');
	const { control, handleSubmit, formState, watch } =
		useForm<GoodsFormDisplayValues>({
			mode: 'onChange',
			defaultValues: goodsDisplayValues,
			resolver: yupResolver(goodsDisplaySchema),
		});

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
				case 'BN':
					dispatch(changeNext(titleData));
					dispatch(menuActive('/admin/banner/image'));
					navigate('/admin/banner/image');
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
		border: '2px solid #d2d2d2',
		fontWeight: 'bold',
	};
	const conditionTd: SxProps<Theme> = {
		pl: 1.5,
		pr: 0,
		fontSize: { xs: '12px', sm: '13px' },
		border: '2px solid #d2d2d2',
	};
	const dataTh: SxProps<Theme> = {
		px: { xs: 1, sm: 2 },
		py: 1,
		fontSize: { xs: '11px', sm: '12px' },
		bgcolor: '#EEEEEE',
		border: '2px solid #d2d2d2',
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 1.5,
		py: 0.5,
		border: '2px solid #d2d2d2',
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
	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={bannerForm}
		>
			<TableContainer>
				<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
					<TableBody>
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
								상품찾기
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<TableContainer>
				<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
					<TableHead>
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
							<TableCell sx={dataTh} align="center" component="th">
								관리
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<></>
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

export default GoodsFormDisplayMobile;
