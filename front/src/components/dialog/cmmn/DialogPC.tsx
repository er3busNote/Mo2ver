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

interface DialogProps {
	title: string;
	open: boolean;
	handleSelect: () => void;
	handleClose: () => void;
	children?: ReactNode;
}

const DialogPC: FC<DialogProps> = ({
	title,
	open,
	handleSelect,
	handleClose,
	children,
}): JSX.Element => {
	const header: SxProps<Theme> = {
		px: 2,
		py: 0,
		color: '#fff',
		fontSize: '1.0rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#363b74',
	};
	const base: SxProps<Theme> = {
		px: 4,
		py: 1,
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			sx={{ '.MuiDialog-paper': { minWidth: '680px' } }}
		>
			<DialogTitle sx={header}>{title}</DialogTitle>
			<DialogContent sx={{ pb: 0 }}>
				<Box sx={base}>{children}</Box>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<ButtonDialog
					buttonType="select"
					device="pc"
					variant="outlined"
					onClick={handleSelect}
				>
					선택
				</ButtonDialog>
				<ButtonDialog
					buttonType="cancel"
					device="pc"
					variant="outlined"
					onClick={handleClose}
				>
					취소
				</ButtonDialog>
			</DialogActions>
		</Dialog>
	);
};

export default DialogPC;
