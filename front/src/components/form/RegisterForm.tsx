import React, { FC, useState } from 'react';
import { Box, Grid, Button, CardMedia } from '@mui/material';

const IMAGE_INFO = [
	'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const RegisterForm: FC = (): JSX.Element => {
	const [open, setOpen] = useState(true);

	const registerClick = () => {
		setOpen(false);
	};

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
