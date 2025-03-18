import React, { FC, BaseSyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useFormContext } from 'react-hook-form';
import {
	Avatar,
	Button,
	IconButton,
	Grid,
	Box,
	Typography,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RenderTextField from '@components/validate/TextField';
import { LoginFormValues } from '@pages/types';

interface LoginProp {
	onSubmit: (
		data: LoginFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const LoginForm: FC<LoginProp> = ({ onSubmit }): JSX.Element => {
	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useFormContext<LoginFormValues>();

	const loginForm: SxProps<Theme> = {
		mt: 0,
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
			sx={{
				mt: 12, // margin-top : 6 * 12 px
				display: 'flex',
				justifyContent: 'center',
				bgcolor: 'background.default',
			}}
		>
			<Box
				id={'login'}
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
				<Typography variant="h6">Log In</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={loginForm}
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={isSubmitted && !isValid}
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container justifyContent="center" sx={{ pb: 2 }}>
						<Grid item xs={8}>
							<Typography variant="subtitle2" sx={{ mt: 0.2 }}>
								{"Don't have an account? Sign Up"}
							</Typography>
						</Grid>
						<Grid item>
							<IconButton component={Link} to="/auth/signup" sx={{ p: 0 }}>
								<ArrowCircleRightIcon color="primary" />
							</IconButton>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};

export default LoginForm;
