import React, { FC, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import {
	Avatar,
	Button,
	IconButton,
	CssBaseline,
	Grid,
	Box,
	Paper,
	Typography,
	Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Copyright from '../Copyright';
import renderField from '../validate/TextField';
import { defaultTheme } from '../../utils/theme';

const theme = createTheme(defaultTheme);

interface SignupProp {
	onSubmit: FormEventHandler<HTMLFormElement>;
	formState: any;
	admin: boolean;
	submitting: boolean;
}

const SignupForm: FC<SignupProp> = ({
	onSubmit,
	formState,
	submitting,
}): JSX.Element => {
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
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
						<Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 0 }}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={
									!submitting &&
									Object.prototype.hasOwnProperty.call(formState, 'syncErrors')
								}
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
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
};

export default SignupForm;
