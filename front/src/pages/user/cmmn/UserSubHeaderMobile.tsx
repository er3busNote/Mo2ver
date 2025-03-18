import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

const UserSubHeaderMobile: FC = (): JSX.Element => {
	const noticeBox: SxProps<Theme> = {
		px: 4,
		py: 2,
		background:
			'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(83,10,124,1) 23%, rgba(136,15,148,1) 100%)',
	};
	const labelChip: SxProps<Theme> = {
		height: '16px',
		fontSize: { xs: '11px', sm: '12px' },
		color: '#fff',
		border: '1px solid #fff',
	};
	const info: SxProps<Theme> = {
		px: 3,
		fontSize: { xs: '11px', sm: '12px' },
		fontWeight: 'bold',
		color: '#fff',
		textDecoration: 'underline',
	};
	return (
		<Box sx={noticeBox}>
			<Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
				<Chip label="공지" variant="outlined" sx={labelChip} />
				<IconButton component={Link} to="#" sx={{ p: 0 }}>
					<Typography component="span" sx={info}>
						개인정보 식별 조치 관련 공지
					</Typography>
				</IconButton>
			</Box>
		</Box>
	);
};

export default UserSubHeaderMobile;
