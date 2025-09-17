import React, { FC, useRef, useMemo, useState, useEffect } from 'react';
import {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import Api from '@api/index';
import useCSRFToken from '@hooks/member/query/useCSRFToken';
import useFileInfo from '@services/cmmn/useFileInfo';
import useImageUrl from '@services/useImageUrl';
import { Box, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import {
	fontSize_xs,
	fontSize_sm,
	fontSize_md,
	fontSize_lg,
} from '@utils/style';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toFileList } from '@utils/file';

interface RenderTextFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	member: ActionCreatorsMapObject;
	file: ActionCreatorsMapObject;
}

const RenderTextEditorField: FC<RenderTextFieldProps> = ({
	field: { onChange, value },
	member,
	file,
}) => {
	const theme = useTheme();

	const { data: csrfData } = useCSRFToken({ member });
	const { data: dataFiles, setFiles } = useFileInfo({ file, csrfData });
	const [imageUrl, setImageUrl] = useState<string>('');
	useEffect(() => {
		if (dataFiles && dataFiles.length > 0 && dataFiles[0].fileSize > 0) {
			const attachFile = dataFiles[0].fileAttachCode;
			const imageUrl = useImageUrl({ file, attachFile });
			setImageUrl(imageUrl);
		}
	}, [dataFiles]);

	useEffect(() => {
		if (imageUrl) {
			const editor = quillRef.current?.getEditor();
			const range = editor?.getSelection();
			if (range && editor) {
				editor.insertEmbed(range.index, 'image', imageUrl);
			}
		}
	}, [imageUrl]);

	// 이미지 붙여넣기 감지 및 처리
	useEffect(() => {
		const quill = quillRef.current?.getEditor();

		if (!quill) return;

		const editorRoot = quill.root;

		const handlePaste = async (event: ClipboardEvent) => {
			const clipboardData = event.clipboardData;
			const items = clipboardData?.items;

			if (!items) return;

			const imageFiles: File[] = Array.from(items)
				.filter(
					(item) => item.kind === 'file' && item.type.startsWith('image/')
				)
				.map((item) => item.getAsFile())
				.filter((file): file is File => !!file);

			if (imageFiles.length > 0) {
				event.preventDefault();
				setFiles(toFileList(imageFiles));
			}
		};

		editorRoot.addEventListener('paste', handlePaste, { capture: true });

		return () => {
			editorRoot.removeEventListener('paste', handlePaste, { capture: true });
		};
	}, []);

	const quillRef = useRef<ReactQuill>(null);
	const imageHandler = () => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = () => {
			if (input.files && input.files.length > 0) {
				setFiles(input.files);
			}
		};
	};

	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					['image'],
					[{ header: [1, 2, 3, 4, 5, false] }],
					['bold', 'underline'],
				],
				handlers: {
					image: imageHandler,
				},
			},
		};
	}, []);

	const textInput: SxProps<Theme> = {
		'& .ql-editor': {
			fontSize: '18px',
			[theme.breakpoints.down('lg')]: { fontSize: fontSize_lg },
			[theme.breakpoints.down('md')]: { fontSize: fontSize_md },
			[theme.breakpoints.down('sm')]: { fontSize: fontSize_sm },
			[theme.breakpoints.down('xs')]: { fontSize: fontSize_xs },
		},
	};

	return (
		<Box sx={textInput}>
			<ReactQuill
				ref={quillRef}
				theme="snow"
				value={value}
				modules={modules}
				onChange={onChange}
			/>
		</Box>
	);
};

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	file: bindActionCreators(Api.file, dispatch),
});

export default connect(null, mapDispatchToProps)(RenderTextEditorField);
