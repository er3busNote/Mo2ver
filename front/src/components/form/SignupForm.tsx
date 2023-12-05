import React, { FC, BaseSyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	Avatar,
	Button,
	IconButton,
	Grid,
	Box,
	Paper,
	Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import RenderTextField from '../validate/TextField';
import { SignupFormValues } from './types';
import { validateEmail, validatePassword } from '../../utils/validation';

const schema = yup
	.object({
		username: yup
			.string()
			.required('아이디를 입력해주세요')
			.min(3, '3자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		password: yup
			.string()
			.required('비밀번호를 입력해주세요')
			.matches(validatePassword, '특수문자 숫자와 대소문자가 필요합니다')
			.min(8, '8자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		repeat_password: yup
			.string()
			.required('비밀번호를 입력해주세요')
			.oneOf([yup.ref('password')], '패스워드가 일치하지 않습니다'),
		email: yup
			.string()
			.required('이메일을 입력해주세요')
			.matches(validateEmail, '유효하지 않은 이메일 주소입니다')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
	})
	.required();

interface SignupProp {
	onSubmit: (
		data: SignupFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const SignupForm: FC<SignupProp> = ({ onSubmit }): JSX.Element => {
	const { control, handleSubmit, formState } = useForm<SignupFormValues>({
		resolver: yupResolver(schema),
	});
	return (
		<Paper
			sx={{
				mt: 10, // margin-top : 6 * 10 px
				display: 'flex',
				justifyContent: 'center',
				bgcolor: 'background.default',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center', // 가로 중앙
					bgcolor: 'background.paper',
					borderRadius: '16px',
					width: 350,
				}}
			>
				<Avatar sx={{ m: 1, mt: 3, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h6">Sign Up</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={{ mt: 0 }}
				>
					<Controller
						name="username"
						control={control}
						render={({ field, fieldState, formState }) => (
							<RenderTextField
								type="text"
								label="username"
								field={field}
								fieldState={fieldState}
								formState={formState}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field, fieldState, formState }) => (
							<RenderTextField
								type="password"
								label="password"
								field={field}
								fieldState={fieldState}
								formState={formState}
							/>
						)}
					/>
					<Controller
						name="repeat_password"
						control={control}
						render={({ field, fieldState, formState }) => (
							<RenderTextField
								type="password"
								label="repeat password"
								field={field}
								fieldState={fieldState}
								formState={formState}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState, formState }) => (
							<RenderTextField
								type="email"
								label="email address"
								field={field}
								fieldState={fieldState}
								formState={formState}
							/>
						)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={formState.isSubmitted && !formState.isValid}
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="center" sx={{ pb: 2 }}>
						<Grid item>
							<IconButton component={Link} to="/auth/login" sx={{ p: 0 }}>
								<ArrowCircleLeftIcon color="primary" />
							</IconButton>
						</Grid>
						<Grid item xs={8}>
							<Typography variant="subtitle2" sx={{ mt: 0.2 }}>
								Already have an account? Sign in
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Paper>
	);
};

export default SignupForm;
