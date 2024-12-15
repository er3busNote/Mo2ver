import React, {
	FC,
	Dispatch,
	SetStateAction,
	useState,
	useEffect,
	BaseSyntheticEvent,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useImageUrl from '../../hooks/useImageUrl';
import { Box, Grid, Button, CardMedia } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import RenderFileField from '../validate/FileField';
import { RegisterFormValues } from './types';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { FileData } from '../../api/types';

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

interface RegisterProp {
	image: ActionCreatorsMapObject;
	setFiles: Dispatch<SetStateAction<Array<FileData> | undefined>>;
	onSubmit: (
		data: RegisterFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const registerValues: RegisterFormValues = {
	name: '',
	brand: '',
	gender: '',
	year: 2024,
	price: 1000,
	goodsImg: [],
};

const RegisterForm: FC<RegisterProp> = ({
	image,
	setFiles,
	onSubmit,
}): JSX.Element => {
	const [open, setOpen] = useState(true);
	const [file, setFile] = useState<string>();

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

	useEffect(() => {
		const goodsImg = watch('goodsImg');
		const goods = Array.from(goodsImg) as Array<FileData>;
		if (goods.length === 0) setFile(undefined);
		if (goods.length > 0) setFile(goods[0].fileAttachCode);
		if (goods.length > 1) setFiles(goods.slice(1));
	}, [watch('goodsImg')]);

	const icon: SxProps<Theme> = {
		fontSize: '9rem',
		color: '#B3B3B3',
	};

	return (
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
