import React, { FC, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import ButtonBase from '@components/button/ButtonBase';
import {
	Box,
	Grid,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import RenderTextField from '@components/field/TextField';
import RenderTextEditorField from '@components/field/TextEditorField';
import RenderDragAndDropField from '@components/field/file/DragAndDropField';
import { NoticeFormValues } from '@pages/admin/types';
import goToNotice from '@navigate/admin/notice/goToNotice';

const fontSize_sm = '13px';
const fontSize_lg = '14px';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

interface NoticeProp {
	title: string;
	description: string;
	onSubmit: (
		data: NoticeFormValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const NoticeFormPC: FC<NoticeProp> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = useFormContext<NoticeFormValues>();

	const cancelClick = () => {
		goToNotice({ title, description, dispatch, navigate });
	};
	const dataTh: SxProps<Theme> = {
		px: 2,
		py: 1.2,
		width: '150px',
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 2,
		py: 0.5,
		border: tableBorder,
		fontSize: { sm: fontSize_sm, lg: fontSize_lg },
	};
	const noticeForm: SxProps<Theme> = {
		'input[type="text"]': {
			py: 2,
		},
		'.MuiFormControl-root': {
			mt: 0.5,
			overflowX: 'visible',
		},
		'label[id$="title-label"]': {
			top: '0px',
			ml: 1,
		},
		'label[id$="title-label"][data-shrink="true"]': {
			top: '2px',
			ml: 2,
		},
	};
	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={noticeForm}
		>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableBody sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								제목
							</TableCell>
							<TableCell colSpan={3} sx={dataTd} align="left">
								<Controller
									name="title"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="제목을 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								공지사항 내용
							</TableCell>
							<TableCell colSpan={3} sx={dataTd} align="left">
								<Controller
									name="contents"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextEditorField
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								첨부파일
							</TableCell>
							<TableCell sx={dataTd} align="left">
								<Controller
									name="noticeFiles"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderDragAndDropField
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ pt: 2 }}>
				<Grid container spacing={1} sx={{ justifyContent: 'center' }}>
					<Grid item>
						<ButtonBase
							type="submit"
							buttonType="save"
							device="pc"
							variant="outlined"
							disabled={isSubmitted && !isValid}
						>
							저장
						</ButtonBase>
					</Grid>
					<Grid item>
						<ButtonBase
							buttonType="cancel"
							device="pc"
							variant="outlined"
							onClick={cancelClick}
						>
							취소
						</ButtonBase>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default NoticeFormPC;
