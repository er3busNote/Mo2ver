import React, {
	FC,
	Fragment,
	useEffect,
	useRef,
	DragEvent,
	ChangeEvent,
} from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { FileData } from '@/types/api';
import Api from '@api/index';
import useCSRFToken from '@hooks/member/query/useCSRFToken';
import useFileInfo from '@hooks/cmmn/query/useFileInfo';
import {
	Box,
	Typography,
	IconButton,
	List,
	ListItem,
	ListItemText,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import {
	AttachFile as AttachFileIcon,
	Close as CloseIcon,
} from '@mui/icons-material';
import {
	fontSize_xs,
	fontSize_sm,
	fontSize_md,
	fontSize_lg,
} from '@utils/style';
import { isEmpty } from 'lodash';

const VisuallyHiddenInput = styled('input')({
	display: 'none',
});

interface RenderFileFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	member: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

const RenderDragAndDropField: FC<RenderFileFieldProps> = ({
	field: { onChange, value, name },
	member,
	file,
}) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

	const { data: csrfData } = useCSRFToken({ member });
	const { data: dataFiles, setFiles } = useFileInfo({ file, csrfData });
	useEffect(() => {
		if (dataFiles && dataFiles.length > 0 && dataFiles[0].fileSize > 0) {
			onChange([...value, ...dataFiles]);
		}
	}, [dataFiles]);

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const selectedFiles = event.dataTransfer.files;
		if (selectedFiles) {
			setFiles(selectedFiles);
		}
	};
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files;
		if (selectedFiles) {
			setFiles(selectedFiles);
		}
	};
	const handleDelete = (index: number) => {
		onChange(value.filter((_, i: number) => i != index));
	};

	const handleInput = () => {
		fileInputRef.current?.click();
	};

	const dragAndDropBox: SxProps<Theme> = {
		p: 2,
		border: '1px solid #ccc',
		borderRadius: 1,
		bgcolor: '#f9f9f9',
	};
	const helperText: SxProps<Theme> = {
		fontSize: {
			xs: fontSize_xs,
			sm: fontSize_sm,
			md: fontSize_md,
			lg: fontSize_lg,
		},
	};
	const fileInput: SxProps<Theme> = {
		color: '#1976d2',
		cursor: 'pointer',
		fontSize: {
			xs: fontSize_xs,
			sm: fontSize_sm,
			md: fontSize_md,
			lg: fontSize_lg,
		},
	};
	const fileList: SxProps<Theme> = {
		p: 2,
		mt: 2,
		background: 'white',
	};
	const fileItem: SxProps<Theme> = {
		whiteSpace: 'normal',
		wordBreak: 'break-word',
	};
	const fileSize: SxProps<Theme> = {
		fontSize: { xs: fontSize_xs, sm: fontSize_sm, lg: fontSize_lg },
	};

	return (
		<Fragment>
			<Box
				onDrop={handleFileDrop}
				onDragOver={(e) => e.preventDefault()}
				sx={dragAndDropBox}
			>
				<Box display="flex" alignItems="center" gap={1}>
					<AttachFileIcon fontSize="small" />
					{isDesktop && (
						<Typography sx={helperText}>파일을 드래그 하세요. 또는</Typography>
					)}
					<Typography sx={fileInput} onClick={handleInput}>
						파일 첨부
					</Typography>
				</Box>
				<VisuallyHiddenInput
					type="file"
					ref={fileInputRef}
					name={name}
					onChange={handleFileChange}
					multiple
				/>
				{!isEmpty(value) && (
					<List sx={fileList}>
						{value &&
							value.map((fileData: FileData, index: number) => (
								<ListItem
									key={index}
									secondaryAction={
										<IconButton edge="end" onClick={() => handleDelete(index)}>
											<CloseIcon fontSize="small" />
										</IconButton>
									}
									disablePadding
								>
									<ListItemText
										primary={
											<Typography sx={fileItem} variant="caption" noWrap>
												{fileData.fileName}{' '}
												<Typography
													sx={fileSize}
													component="span"
													color="text.secondary"
												>
													({(fileData.fileSize / 1024).toFixed(2)} KB)
												</Typography>
											</Typography>
										}
									/>
								</ListItem>
							))}
					</List>
				)}
			</Box>
		</Fragment>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(null, mapDispatchToProps)(RenderDragAndDropField);
