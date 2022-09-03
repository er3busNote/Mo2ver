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
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Copyright from '../Copyright';
import renderField from '../validate/TextField';
import { defaultTheme } from '../../utils/theme';

const theme = createTheme(defaultTheme);

interface LoginProp {
	onSubmit: FormEventHandler<HTMLFormElement>;
	formState: any;
	submitting: boolean;
}

const LoginForm: FC<LoginProp> = ({
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
						mt: 12, // margin-top : 6 * 12 px
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
						<Typography variant="h6">Log In</Typography>
						<Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
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
				</Paper>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

export default LoginForm;
