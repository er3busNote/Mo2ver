import React, { FC, useState, useEffect, BaseSyntheticEvent } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { Controller, useFormContext } from 'react-hook-form';
import { FileData, CategoryData } from '@/types/api';
import useCategoryInfo from '@hooks/category/useCategoryInfo';
import useImageUrl from '@hooks/useImageUrl';
import ButtonGoods from '@components/button/ButtonGoods';
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
import RenderTextField from '@components/field/TextField';
import RenderNumberField from '@components/field/NumberField';
import RenderRadioField from '@components/field/RadioField';
import RenderSelectField from '@components/field/SelectField';
import RenderSelectChipField from '@components/field/SelectChipField';
import RenderDatePickerField from '@components/field/DatePickerField';
import RenderFileField from '@components/field/file/FileField';
import HorizontalScroll from '@components/HorizontalScroll';
import { RegisterFormValues } from '@pages/types';
import {
	HorizontalRule as HorizontalRuleIcon,
	InsertPhotoOutlined as InsertPhotoOutlinedIcon,
} from '@mui/icons-material';
import { fontSize_xs, fontSize_sm, fontSize_lg } from '@utils/style';
import dayjs from 'dayjs';

interface RegisterProp {
	slidesPerView: number;
	spaceBetween: number;
	category: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
	onSubmit: (
		data: RegisterFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const RegisterForm: FC<RegisterProp> = ({
	slidesPerView,
	spaceBetween,
	category,
	file,
	onSubmit,
}): JSX.Element => {
	const [attachFile, setAttachFile] = useState<string>();
	const [files, setFiles] = useState<Array<FileData>>();
	const [largeCategoryCode, setLargeCategoryCode] = useState<string>('');
	const [mediumCategoryCode, setMediumCategoryCode] = useState<string>('');
	const [buyLimitYesNo, setBuyLimitYesNo] = useState<string>('');
	const [salePeriodYesNo, setSalePeriodYesNo] = useState<string>('');
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
		setValue,
		watch,
	} = useFormContext<RegisterFormValues>();

	useEffect(() => {
		const goodsImg = watch('goodsImg');
		const goods = Array.from(goodsImg) as Array<FileData>;
		if (goods.length === 0) setAttachFile(undefined);
		if (goods.length > 0) setAttachFile(goods[0].fileAttachCode);
		if (goods.length > 1) setFiles(goods.slice(1));
		else setFiles([]);
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

	useEffect(() => {
		const buyLimitYesNo = watch('buyLimitYesNo');
		setBuyLimitYesNo(buyLimitYesNo);
	}, [watch('buyLimitYesNo')]);

	useEffect(() => {
		const discountPrice = watch('discountPrice');
		const salePeriodYesNo = watch('salePeriodYesNo');
		if (salePeriodYesNo !== 'Y') {
			if (Number(discountPrice) === 0) {
				setValue('discountPrice', 100, { shouldValidate: false });
			}
			setValue('discountStartDate', dayjs(), { shouldValidate: false });
			setValue('discountEndDate', dayjs(), { shouldValidate: false });
		}
		setSalePeriodYesNo(salePeriodYesNo);
	}, [watch('salePeriodYesNo')]);

	const icon: SxProps<Theme> = {
		fontSize: '9rem',
		color: '#B3B3B3',
	};
	const multilineTd: SxProps<Theme> = {
		borderBlock: 'none',
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
		'& .MuiFormControl-root': {
			width: '80%',
		},
		'& .MuiInputBase-root': {
			py: 1.6,
		},
		'& .MuiInputBase-input': {
			py: 0,
			fontWeight: 'bold',
		},
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
	};
	const registerForm: SxProps<Theme> = {
		mt: { xs: -3, sm: -3, md: 3, lg: 3 },
		mx: { xs: 3, sm: 3, md: 3, lg: 3 },
		mb: { xs: 10, sm: 10 },
		textAlign: 'left',
		'& .MuiFormControl-root': {
			my: { xs: 0, sm: 0.25 },
			overflowX: 'visible',
		},
		'label[id$="name-label"], label[id$="brand-label"], label[id$="year-label"], label[id$="keyword-label"], label[id$="summaryInfo-label"], label[id$="supplyPrice-label"], label[id$="salePrice-label"], label[id$="discountPrice-label"]':
			{
				top: { xs: '-1px', sm: '-0.5px' },
				ml: 1,
			},
		'label[id$="name-label"][data-shrink="true"], label[id$="brand-label"][data-shrink="true"], label[id$="year-label"][data-shrink="true"], label[id$="keyword-label"][data-shrink="true"], label[id$="summaryInfo-label"][data-shrink="true"], label[id$="supplyPrice-label"][data-shrink="true"], label[id$="salePrice-label"][data-shrink="true"], label[id$="discountPrice-label"][data-shrink="true"]':
			{
				top: { xs: '-1px', sm: '0px' },
				ml: 2,
			},
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6} lg={6}>
				<Box sx={{ m: 3, border: '2px #F0F0F0 solid' }}>
					{attachFile ? (
						<CardMedia
							component="img"
							width="100%"
							image={useImageUrl({ file, attachFile })}
							sx={{ p: 1.5, objectFit: 'fill', height: { xs: 460, sm: 556 } }}
							alt="Image"
						/>
					) : (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: { xs: 460, sm: 556 },
							}}
						>
							<InsertPhotoOutlinedIcon sx={icon} />
						</Box>
					)}
				</Box>
				<Box sx={{ m: 3, border: '2px #F0F0F0 solid' }}>
					<Box
						sx={{ p: { xs: 1, sm: 1.5 }, width: '100%', bgcolor: '#fafafa' }}
					>
						<HorizontalScroll
							slidesPerView={slidesPerView}
							spaceBetween={spaceBetween}
							file={file}
							files={files}
							size="small"
						/>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} md={6} lg={6}>
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={registerForm}
				>
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
										키워드
									</TableCell>
									<TableCell sx={dataTd} align="left">
										<Controller
											name="keyword"
											control={control}
											render={({ field, fieldState, formState }) => (
												<RenderSelectChipField
													datas={[
														'전체연령',
														'성인',
														'어린이',
														'유아',
														'가족',
														'여성',
														'남성',
													]}
													label="키워드를 입력해주세요"
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
										상품설명
									</TableCell>
									<TableCell sx={multilineTd} align="left">
										<Controller
											name="summaryInfo"
											control={control}
											render={({ field, fieldState, formState }) => (
												<RenderTextField
													type="text"
													label="상품설명을 입력해주세요"
													multiline
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
											name="buyLimitYesNo"
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
													readonly={buyLimitYesNo !== 'Y'}
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
										할인기간여부
									</TableCell>
									<TableCell sx={dataTd} align="left">
										<Controller
											name="salePeriodYesNo"
											control={control}
											render={({ field, formState }) => (
												<RenderRadioField
													datas={[
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
													readonly={salePeriodYesNo !== 'Y'}
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
														readonly={salePeriodYesNo !== 'Y'}
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
														readonly={salePeriodYesNo !== 'Y'}
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
	);
};

export default RegisterForm;
