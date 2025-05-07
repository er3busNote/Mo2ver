import React, { FC, BaseSyntheticEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ButtonBase from '@components/button/ButtonBase';
import {
	Box,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import RenderTextField from '@components/field/TextField';
import RenderRadioField from '@components/field/RadioField';
import { CategoryFormValues } from '@pages/admin/types';
import {
	fontSize_xs,
	fontSize_sm,
	fontSize_md,
	fontSize_lg,
} from '@utils/style';

const tableBorder = '1px solid #d2d2d2';

interface CategoryProp {
	onSubmit: (
		data: CategoryFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const CategoryForm: FC<CategoryProp> = ({ onSubmit }): JSX.Element => {
	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useFormContext<CategoryFormValues>();

	const removeClick = () => {
		console.log('logout');
	};

	const thHeader: SxProps<Theme> = {
		px: { xs: 2, sm: 5 },
		py: 1,
		width: { xs: 100, sm: 180 },
		fontSize: {
			xs: fontSize_xs,
			sm: fontSize_sm,
			md: fontSize_md,
			lg: fontSize_lg,
		},
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const tdHeader: SxProps<Theme> = {
		border: tableBorder,
		py: 0.5,
		fontSize: {
			xs: fontSize_xs,
			sm: fontSize_sm,
			md: fontSize_md,
			lg: fontSize_lg,
		},
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
				<ButtonBase
					buttonType="remove"
					variant="outlined"
					onClick={removeClick}
				>
					삭제
				</ButtonBase>
				<ButtonBase
					type="submit"
					buttonType="save"
					variant="outlined"
					disabled={isSubmitted && !isValid}
				>
					저장
				</ButtonBase>
			</Box>
		</Box>
	);
};

export default CategoryForm;
