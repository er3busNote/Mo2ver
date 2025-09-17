import React, { FC } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import useImageUrl from '@hooks/useImageUrl';
import { CardMedia, Dialog, DialogContent, DialogTitle } from '@mui/material';

interface CarouselDialogProps {
	open: boolean;
	attachFile: string;
	name?: string;
	file: ActionCreatorsMapObject;
	handleClose: () => void;
}

const DialogImage: FC<CarouselDialogProps> = ({
	open,
	file,
	attachFile,
	name,
	handleClose,
}): JSX.Element => {
	return (
		<Dialog open={open} onClose={handleClose}>
			{name && <DialogTitle>{name}</DialogTitle>}
			<DialogContent>
				<CardMedia
					component="img"
					image={useImageUrl({ file, attachFile })}
					alt="Image"
				/>
			</DialogContent>
		</Dialog>
	);
};

export default DialogImage;
