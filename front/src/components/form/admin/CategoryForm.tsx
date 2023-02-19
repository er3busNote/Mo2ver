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

const schema = yup
	.object({
		category: yup
			.string()
			.required('카테고리를 입력해주세요')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
	})
	.required();

interface CategoryProp {
	onSubmit: (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const defaultValues = {
	category: '',
	useyn: 'Y',
	level: 1,
};

const CategoryForm: FC<CategoryProp> = ({ onSubmit }): JSX.Element => {
	const { control, handleSubmit, formState } = useForm<CategoryFormValues>({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema),
	});

	const removeClick = () => {
		console.log('logout');
	};

	const thHeader: SxProps<Theme> = {
		px: 5,
		py: 1.5,
		width: 180,
		bgcolor: '#EEEEEE',
		border: '2px solid #d2d2d2',
		fontWeight: 'bold',
	};
	const thBody: SxProps<Theme> = {
		px: 5,
		border: '2px solid #d2d2d2',
	};
	return (
		<Box
			id="category"
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<TableContainer>
				<Table size="small" sx={{ border: '2px solid #d2d2d2' }}>
					<TableBody>
						<TableRow>
							<TableCell sx={thHeader} align="left" component="th">
								구분
							</TableCell>
							<TableCell sx={thBody} align="left">
								소카테고리
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={thHeader} align="left" component="th">
								카테고리명
							</TableCell>
							<TableCell sx={thBody} align="left">
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
							<TableCell sx={thBody} align="left">
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
							<TableCell sx={thBody} align="left">
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
							<TableCell sx={thBody} align="left">
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
					disabled={formState.isSubmitted && !formState.isValid}
				>
					저장
				</Button>
			</Box>
		</Box>
	);
};

export default CategoryForm;
