import React, { FC, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Box, Chip, Tab, Tabs, IconButton, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface UserSubHeaderProps {
	tab: number;
	setTab: (value: number) => void;
}

const UserSubHeaderPC: FC<UserSubHeaderProps> = ({
	tab,
	setTab,
}): JSX.Element => {
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setTab(newValue);
	};

	const labelChip: SxProps<Theme> = {
		height: '25px',
		color: '#fff',
		border: '1px solid #fff',
	};
	const info: SxProps<Theme> = {
		px: 3,
		fontSize: { sm: '12px', lg: '13px' },
		fontWeight: 'bold',
		color: '#fff',
		textDecoration: 'underline',
	};
	const labelTabs: SxProps<Theme> = {
		minHeight: '45px',
	};
	const labelTab: SxProps<Theme> = {
		py: 0,
		minHeight: '45px',
		fontWeight: 'bold',
	};
	return (
		<Box
			sx={{
				px: 4,
				pt: 4,
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
				<Chip label="공지" variant="outlined" sx={labelChip} />
				<IconButton component={Link} to="#" sx={{ p: 0 }}>
					<Typography component="span" sx={info}>
						개인정보 식별 조치 관련 공지
					</Typography>
				</IconButton>
			</Box>
			<Box
				sx={{
					bgcolor: '#fff',
					borderTopLeftRadius: '12px',
					borderTopRightRadius: '12px',
					position: 'relative',
				}}
			>
				<Tabs value={tab} onChange={handleChange} sx={labelTabs}>
					<Tab label="주문/배송내역" sx={labelTab} />
					<Tab label="상품등록내역" sx={labelTab} />
					<Tab label="회원정보수정" sx={labelTab} disabled />
				</Tabs>
			</Box>
		</Box>
	);
};

export default UserSubHeaderPC;
