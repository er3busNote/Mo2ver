import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Grid, Button, CardMedia } from '@mui/material';
import RenderFileField from '../validate/FileField';
import { RegisterFormValues } from './types';

const IMAGE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const registerSchema = yup
	.object()
	.shape({
		name: yup
			.string()
			.required('제목을 입력해주세요')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		brand: yup.string().required('브랜드명을 입력해주세요'),
		gender: yup.string().required('성별을 입력해주세요'),
		year: yup.number().required('등록연도를 입력해주세요'),
		price: yup
			.number()
			.required('가격을 입력해주세요')
			.min(4, '4자 이상 입력해주세요!')
			.max(10, '입력 범위가 초과되었습니다'),
		goodsImg: yup
			.array()
			.min(1, '적어도 하나의 파일을 업로드해야 합니다.')
			.max(5, '최대 5개의 파일을 업로드할 수 있습니다.')
			.default([]),
	})
	.required();

const registerValues: RegisterFormValues = {
	name: '',
	brand: '',
	gender: '',
	year: 2024,
	price: 1000,
	goodsImg: [],
};

const RegisterForm: FC = (): JSX.Element => {
	const [open, setOpen] = useState(true);

	const registerClick = () => {
		setOpen(false);
	};

	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
		watch,
	} = useForm<RegisterFormValues>({
		mode: 'onChange',
		defaultValues: registerValues,
		resolver: yupResolver(registerSchema),
	});

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6} lg={6}>
				<Box sx={{ m: 3, border: '2px #F0F0F0 solid' }}>
					<CardMedia
						component="img"
						width="100%"
						height="556"
						image={IMAGE_INFO[0]}
						sx={{ p: 1.5 }}
						alt="green iguana"
					/>
				</Box>
			</Grid>
			<Grid item xs={12} md={6} lg={6}>
				<Box
					sx={{
						mt: { xs: -3, sm: -3, md: 3, lg: 3 },
						mx: { xs: 6, sm: 6, md: 3, lg: 3 },
						mb: { xs: 10, sm: 10 },
						textAlign: 'left',
					}}
				>
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
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							type="submit"
							sx={{
								mt: 2,
								px: 6,
								py: 1,
								width: '80%',
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
							onClick={registerClick}
						>
							등록
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default RegisterForm;
