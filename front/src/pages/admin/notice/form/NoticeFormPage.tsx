import React, { FC, useState, BaseSyntheticEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dispatch as DispatchAction } from '@reduxjs/toolkit';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { TitleState } from '@/types/store';
import Api from '@api/index';
import { NoticeRequestData, NoticeInfoData } from '@/types/api';
import useCSRFToken from '@hooks/member/query/useCSRFToken';
import useNoticeDetail from '@services/notice/useNoticeDetail';
import NoticeFormPC from './NoticeFormPC';
import NoticeFormMobile from './NoticeFormMobile';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { NoticeFormValues } from '@/types/admin/form';

const noticeSchema = yup
	.object()
	.shape({
		title: yup
			.string()
			.required('제목을 입력해주세요')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		contents: yup.string().required('필수항목'),
		noticeFiles: yup
			.array()
			.of(
				yup.object().shape({
					fileAttachCode: yup
						.string()
						.test(
							'non-empty', // 커스텀 테스트 이름
							'fileAttachCode는 빈 문자열일 수 없습니다.', // 에러 메시지
							(value) => value !== '' // 빈 문자열이 아닌지 체크
						)
						.required('첨부파일코드는 필수 항목입니다.'),
					fileSize: yup
						.number()
						.test(
							'non-zero-size', // 커스텀 테스트 이름
							'fileSize는 0일 수 없습니다.', // 에러 메시지
							(value) => value !== 0 // 0이 아닌지 체크
						)
						.required('파일크기는 필수 항목입니다.'),
					fileName: yup.string().required('파일이름은 필수 항목입니다.'),
					fileType: yup.string().required('파일형식은 필수 항목입니다.'),
					fileExtension: yup
						.string()
						.required('파일 확장자는 필수 항목입니다.'),
				})
			)
			.default([]),
	})
	.required();

interface NoticeDispatchProps {
	title: string;
	description: string;
	member: ActionCreatorsMapObject;
	notice: ActionCreatorsMapObject;
}

const noticeValues: NoticeFormValues = {
	title: '',
	contents: '',
	noticeFiles: [],
};

const NoticeFormPage: FC<NoticeDispatchProps> = ({
	title,
	description,
	member,
	notice,
}): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const navigate = useNavigate();
	const location = useLocation();
	const { data: csrfData } = useCSRFToken({ member });
	const [noticeNo, setNoticeNo] = useState<number>();
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
	const componentType = location.state?.noticeNo ? 'Update' : 'Create';

	const methods = useForm<NoticeFormValues>({
		mode: 'onChange',
		defaultValues: noticeValues,
		resolver: yupResolver(noticeSchema),
	});

	if (componentType === 'Update') {
		const noticeNo = location.state?.noticeNo;
		const noticeData: NoticeRequestData = {
			noticeNo: noticeNo,
		};
		const noticeInfo = useNoticeDetail({
			notice,
			noticeData,
			csrfData,
		});
		if (noticeInfo && !isDataLoaded) {
			const { reset } = methods;
			reset({
				title: noticeInfo.title,
				contents: noticeInfo.contents,
				noticeFiles: noticeInfo.noticeFiles,
			});
			if (noticeInfo.noticeNo) setNoticeNo(noticeInfo.noticeNo);
			setIsDataLoaded(true);
		}
	}

	const submitForm = async (
		data: NoticeFormValues,
		noticeForm?: BaseSyntheticEvent<object, any, any>
	) => {
		const noticeFormData: NoticeInfoData = {
			title: data.title,
			contents: data.contents,
			noticeFiles: data.noticeFiles,
		};
		if (componentType === 'Update') {
			noticeFormData.noticeNo = noticeNo;
		}
		if (componentType === 'Create')
			await notice.create(noticeFormData, csrfData);
		if (componentType === 'Update')
			await notice.update(noticeFormData, csrfData);
		if (noticeForm) noticeForm.preventDefault(); // 새로고침 방지
		navigate('/admin/notice');
	};

	return (
		<Box sx={{ py: 2, pl: 4, pr: 4, mb: 10 }}>
			{(componentType === 'Create' ||
				(componentType === 'Update' && isDataLoaded)) && (
				<FormProvider {...methods}>
					{isDesktop && (
						<NoticeFormPC
							title={title}
							description={description}
							onSubmit={submitForm}
						/>
					)}
					{isMobile && (
						<NoticeFormMobile
							title={title}
							description={description}
							onSubmit={submitForm}
						/>
					)}
				</FormProvider>
			)}
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
	description: (state.title as TitleState).description,
});

const mapDispatchToProps = (dispatch: DispatchAction) => ({
	member: bindActionCreators(Api.member, dispatch),
	notice: bindActionCreators(Api.notice, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoticeFormPage);
