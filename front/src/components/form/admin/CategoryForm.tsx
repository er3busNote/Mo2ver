import React, { FC, BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	Box,
	Button,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import RenderTextField from '../../validate/TextField';
import RenderRadioField from '../../validate/RadioField';
import { CategoryFormValues } from './types';

const tableBorder = '1px solid #d2d2d2';

const schema = yup
	.object()
	.shape({
		category: yup
			.string()
			.required('카테고리를 입력해주세요')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		useyn: yup.string().required(),
		level: yup.number().required(),
	})
	.required();

interface CategoryProp {
	onSubmit: (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const defaultValues: CategoryFormValues = {
	category: '',
	useyn: 'Y',
	level: 1,
};

const CategoryForm: FC<CategoryProp> = ({ onSubmit }): JSX.Element => {
	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useForm<CategoryFormValues>({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema),
	});

	const removeClick = () => {
		console.log('logout');
	};

	const thHeader: SxProps<Theme> = {
		px: { xs: 2, sm: 5 },
		py: 1.5,
		width: { xs: 100, sm: 180 },
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const tdHeader: SxProps<Theme> = {
		border: tableBorder,
		fontSize: { xs: '12px', sm: '12px', md: '13px', lg: '14px' },
	};
	const categoryForm: SxProps<Theme> = {
		'.MuiFormControl-root': {
			overflowX: 'visible',
		},
		'.MuiFormLabel-root': {
			ml: 1,
		},
		'.MuiInputLabel-shrink': {
			mt: 0.5,
			ml: 1.5,
		},
	};
	return (
		<Box
			id="category"
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={categoryForm}
		>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableBody>
						<TableRow>
							<TableCell sx={thHeader} align="left" component="th">
								구분
							</TableCell>
							<TableCell sx={tdHeader} align="left">
								소카테고리
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={thHeader} align="left" component="th">
								카테고리명
							</TableCell>
							<TableCell sx={tdHeader} align="left">
								<Controller
									name="category"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="카테고리명을 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={thHeader} align="left" component="th">
								노출여부
							</TableCell>
							<TableCell sx={tdHeader} align="left">
								<Controller
									name="useyn"
									control={control}
									render={({ field, formState }) => (
										<RenderRadioField
											datas={[
												{ value: 'Y', label: '노출' },
												{ value: 'N', label: '비노출' },
											]}
											field={field}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={thHeader} align="left" component="th">
								노출순서
							</TableCell>
							<TableCell sx={tdHeader} align="left">
								<Controller
									name="level"
									control={control}
									render={({ field, formState }) => (
										<RenderRadioField
											datas={[
												{ value: 1, label: '대분류' },
												{ value: 2, label: '중분류' },
												{ value: 3, label: '소분류' },
											]}
											field={field}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={thHeader} align="left" component="th">
								코드명
							</TableCell>
							<TableCell sx={tdHeader} align="left">
								C001001002
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ pt: 4, display: 'flex', justifyContent: 'space-between' }}>
				<Button
					sx={{
						px: 6,
						py: 1,
						fontSize: '14px',
						fontWeight: 'bold',
						bgcolor: '#7D7D7D',
						border: '1px solid #757595',
						borderRadius: 0,
						color: '#fff',
						'&:hover': {
							bgcolor: '#A1A1A1',
						},
					}}
					variant="outlined"
					onClick={removeClick}
				>
					삭제
				</Button>
				<Button
					type="submit"
					sx={{
						px: 6,
						py: 1,
						fontSize: '14px',
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
			</Box>
		</Box>
	);
};

export default CategoryForm;
