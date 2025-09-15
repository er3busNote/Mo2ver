import React, { FC, ReactNode } from 'react';
import ButtonDialog from '@components/button/ButtonDialog';
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useIsMobile } from '@providers/MobileProvider';

interface DialogProps {
	title: string;
	open: boolean;
	handleSelect: () => void;
	handleClose: () => void;
	children?: ReactNode;
}

const DialogMobile: FC<DialogProps> = ({
	title,
	open,
	handleSelect,
	handleClose,
	children,
}): JSX.Element => {
	const isMobile = useIsMobile();

	const header: SxProps<Theme> = {
		px: 2,
		py: 0.5,
		color: '#fff',
		fontSize: '0.9rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#363b74',
	};
	const base: SxProps<Theme> = {
		px: isMobile ? 0 : 2,
		py: 1,
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle sx={header}>{title}</DialogTitle>
			<DialogContent sx={{ pb: 0 }}>
				<Box sx={base}>{children}</Box>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<ButtonDialog
					buttonType="select"
					device="mobile"
					variant="outlined"
					onClick={handleSelect}
				>
					선택
				</ButtonDialog>
				<ButtonDialog
					buttonType="cancel"
					device="mobile"
					variant="outlined"
					onClick={handleClose}
				>
					취소
				</ButtonDialog>
			</DialogActions>
		</Dialog>
	);
};

export default DialogMobile;
