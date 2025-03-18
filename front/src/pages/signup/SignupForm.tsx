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
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import RenderTextField from '@components/validate/TextField';
import { SignupFormValues } from '@pages/types';

interface SignupProp {
	onSubmit: (
		data: SignupFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const SignupForm: FC<SignupProp> = ({ onSubmit }): JSX.Element => {
	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useFormContext<SignupFormValues>();

	const signupForm: SxProps<Theme> = {
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
				mt: 10, // margin-top : 6 * 10 px
				display: 'flex',
				justifyContent: 'center',
				bgcolor: 'background.default',
			}}
		>
			<Box
				id={'signup'}
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
					sx={signupForm}
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
						disabled={isSubmitted && !isValid}
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
		</Box>
	);
};

export default SignupForm;
