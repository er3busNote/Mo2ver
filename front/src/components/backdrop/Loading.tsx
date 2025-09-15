import React, { FC } from 'react';
import { Box, Backdrop, CircularProgress } from '@mui/material';

interface LoadingProps {
	open: boolean;
	message?: string;
}

const Loading: FC<LoadingProps> = ({ open, message }) => {
	return (
		<Backdrop
			sx={{
				color: '#fff',
				zIndex: (theme) => theme.zIndex.drawer + 9999,
			}}
			open={open}
		>
			<Box style={{ textAlign: 'center' }}>
				<CircularProgress color="inherit" />
				{message && <Box style={{ marginTop: 16 }}>{message}</Box>}
			</Box>
		</Backdrop>
	);
};

export default Loading;
