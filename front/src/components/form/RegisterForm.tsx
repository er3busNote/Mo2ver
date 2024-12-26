import React, {
	FC,
	Dispatch,
	SetStateAction,
	useState,
	useEffect,
	BaseSyntheticEvent,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { Controller, useFormContext } from 'react-hook-form';
import { CategoryData } from '../../api/types';
import useCategoryInfo from '../../hooks/category/useCategoryInfo';
import useImageUrl from '../../hooks/useImageUrl';
import ButtonGoods from '../button/ButtonGoods';
import {
	Box,
	Grid,
	CardMedia,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import RenderTextField from '../validate/TextField';
import RenderNumberField from '../validate/NumberField';
import RenderRadioField from '../validate/RadioField';
import RenderSelectField from '../validate/SelectField';
import RenderDatePickerField from '../validate/DatePickerField';
import RenderFileField from '../validate/FileField';
import { RegisterFormValues } from './types';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { FileData } from '../../api/types';

const fontSize_xs = '11px';
const fontSize_sm = '13px';
const fontSize_lg = '13px';

interface RegisterProp {
	category: ActionCreatorsMapObject;
	image: ActionCreatorsMapObject;
	setFiles: Dispatch<SetStateAction<Array<FileData> | undefined>>;
	onSubmit: (
		data: RegisterFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const RegisterForm: FC<RegisterProp> = ({
	category,
	image,
	setFiles,
	onSubmit,
}): JSX.Element => {
	const [file, setFile] = useState<string>();
	const [largeCategoryCode, setLargeCategoryCode] = useState<string>('');
	const [mediumCategoryCode, setMediumCategoryCode] = useState<string>('');
	const largeCategoryData = useCategoryInfo({ category, categoryLevel: 1 });
	const mediumCategoryData = useCategoryInfo({
		category,
		categoryLevel: 2,
		categoryInfo: largeCategoryCode,
	});
	const smallCategoryData = useCategoryInfo({
		category,
		categoryLevel: 3,
		categoryInfo: mediumCategoryCode,
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
		watch,
	} = useFormContext<RegisterFormValues>();

	useEffect(() => {
		const goodsImg = watch('goodsImg');
		const goods = Array.from(goodsImg) as Array<FileData>;
		if (goods.length === 0) setFile(undefined);
		if (goods.length > 0) setFile(goods[0].fileAttachCode);
		if (goods.length > 1) setFiles(goods.slice(1));
	}, [watch('goodsImg')]);

	useEffect(() => {
		const largeCategory = watch('largeCategory');
		setLargeCategoryCode(largeCategory);
		setMediumCategoryCode('');
	}, [watch('largeCategory')]);

	useEffect(() => {
		const mediumCategory = watch('mediumCategory');
		setMediumCategoryCode(mediumCategory);
	}, [watch('mediumCategory')]);

	const icon: SxProps<Theme> = {
		fontSize: '9rem',
		color: '#B3B3B3',
	};
	const conditionTd: SxProps<Theme> = {
		borderBlock: 'none',
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		'& .MuiInputLabel-root': {
			top: { xs: '-9px', md: '-8px', sm: '-6px' },
			left: { xs: '-8px', md: '-8px', sm: '0px' },
		},
		'& .MuiInputLabel-root[data-shrink="true"]': {
			top: { xs: '2px', md: '1px', sm: '0px' },
			left: { xs: '2px', md: '1px', sm: '0px' },
		},
		'& .MuiFormHelperText-root': {
			top: '31px',
			left: '-18px',
			maxWidth: '150px',
			position: 'absolute',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			overflowX: 'clip',
		},
	};
	const dataTh: SxProps<Theme> = {
		width: { xs: 80, sm: 100 },
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#f9f9f9',
		borderBlock: 'none',
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		borderBlock: 'none',
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		'& .MuiFormControl-root': {
			my: { xs: 0, sm: 0.25 },
			overflowX: 'visible',
		},
	};
	const registerForm: SxProps<Theme> = {
		mt: { xs: -3, sm: -3, md: 3, lg: 3 },
		mx: { xs: 6, sm: 6, md: 3, lg: 3 },
		mb: { xs: 10, sm: 10 },
		textAlign: 'left',
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} lg={6}>
					<Box sx={{ m: 3, border: '2px #F0F0F0 solid' }}>
						{file ? (
							<CardMedia
								component="img"
								width="100%"
								height="556"
								image={useImageUrl({ image, file })}
								sx={{ p: 1.5, objectFit: 'fill' }}
								alt="Image"
							/>
						) : (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: 556,
								}}
							>
								<InsertPhotoOutlinedIcon sx={icon} />
							</Box>
						)}
					</Box>
				</Grid>
				<Grid item xs={12} md={6} lg={6}>
					<Box sx={registerForm}>
						<TableContainer>
							<Table size="small">
								<TableBody>
									<TableRow>
										<TableCell sx={dataTh} align="center" component="th">
											상품명
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="name"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderTextField
														type="text"
														label="상품명을 입력해주세요"
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
											브랜드명
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="brand"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderTextField
														type="text"
														label="브랜드명을 입력해주세요"
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
											성별
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="gender"
												control={control}
												render={({ field, formState }) => (
													<RenderRadioField
														datas={[
															{ value: 'Men', label: '남' },
															{ value: 'Women', label: '여' },
														]}
														field={field}
														formState={formState}
													/>
												)}
											/>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={dataTh} align="center" component="th">
											제조일자
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="year"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderTextField
														type="number"
														label="제조일자를 입력해주세요"
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
											대분류
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="largeCategory"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderSelectField
														label="대분류"
														datas={largeCategoryData.map(
															(data: CategoryData) => ({
																value: data.categoryCode,
																label: data.categoryName,
															})
														)}
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
											중분류
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="mediumCategory"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderSelectField
														label="중분류"
														datas={mediumCategoryData.map(
															(data: CategoryData) => ({
																value: data.categoryCode,
																label: data.categoryName,
															})
														)}
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
											소분류
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="smallCategory"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderSelectField
														label="소분류"
														datas={smallCategoryData.map(
															(data: CategoryData) => ({
																value: data.categoryCode,
																label: data.categoryName,
															})
														)}
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
											구매제한여부
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="gender"
												control={control}
												render={({ field, formState }) => (
													<RenderRadioField
														datas={[
															{ value: 'Y', label: '제한' },
															{ value: 'N', label: '제한없음' },
														]}
														field={field}
														formState={formState}
													/>
												)}
											/>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={dataTh} align="center" component="th">
											판매기간
										</TableCell>
										<TableCell sx={conditionTd} align="left">
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<Controller
													name="saleStartDate"
													control={control}
													render={({ field, fieldState, formState }) => (
														<RenderDatePickerField
															label="판매시작일시"
															field={field}
															fieldState={fieldState}
															formState={formState}
														/>
													)}
												/>
												<HorizontalRuleIcon />
												<Controller
													name="saleEndDate"
													control={control}
													render={({ field, fieldState, formState }) => (
														<RenderDatePickerField
															label="판매종료일시"
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
										<TableCell sx={dataTh} align="center" component="th">
											공급가
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="supplyPrice"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderTextField
														type="number"
														label="공급가를 입력해주세요"
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
											판매가
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="salePrice"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderTextField
														type="number"
														label="판매가를 입력해주세요"
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
											최대구매수량
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="maxBuyQuantity"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderNumberField
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
											할인가
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="discountPrice"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderTextField
														type="number"
														label="할인가를 입력해주세요"
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
											할인기간
										</TableCell>
										<TableCell sx={conditionTd} align="left">
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<Controller
													name="discountStartDate"
													control={control}
													render={({ field, fieldState, formState }) => (
														<RenderDatePickerField
															label="할인시작일시"
															field={field}
															fieldState={fieldState}
															formState={formState}
														/>
													)}
												/>
												<HorizontalRuleIcon />
												<Controller
													name="discountEndDate"
													control={control}
													render={({ field, fieldState, formState }) => (
														<RenderDatePickerField
															label="할인종료일시"
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
										<TableCell sx={dataTh} align="center" component="th">
											첨부파일
										</TableCell>
										<TableCell sx={dataTd} align="left">
											<Controller
												name="goodsImg"
												control={control}
												render={({ field, fieldState, formState }) => (
													<RenderFileField
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
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<ButtonGoods
								type="submit"
								buttonType="register"
								variant="outlined"
								disabled={isSubmitted && !isValid}
							>
								등록
							</ButtonGoods>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default RegisterForm;
