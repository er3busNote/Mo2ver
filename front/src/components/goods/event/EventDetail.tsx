import React, { FC } from 'react';
import EventSubHeader from '../cmmn/EventSubHeader';
import { Box } from '@mui/material';

const EventDetail: FC = (): JSX.Element => {
	return (
		<Box>
			<EventSubHeader />
			<Box sx={{ my: 2 }}> Page is Event Detail </Box>
		</Box>
	);
};

export default EventDetail;
