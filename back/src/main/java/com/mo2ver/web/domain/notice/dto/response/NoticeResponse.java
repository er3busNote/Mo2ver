package com.mo2ver.web.domain.notice.dto.response;

import com.mo2ver.web.domain.notice.dto.FileInfo;
import com.mo2ver.web.domain.notice.entity.Notice;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class NoticeResponse {

    private Long noticeManageNo;
    private String subject;
    private String contents;
    private Character noticeYesNo;
    private String register;
    private Date registerDate;
    private List<FileInfo> noticeFileList;

    public static NoticeResponse of(Notice notice) {
        return NoticeResponse.builder()
                .noticeManageNo(notice.getNoticeManageNo())
                .subject(notice.getSubject())
                .contents(notice.getNoticeContents())
                .noticeYesNo(notice.getNoticeYesNo())
                .register(notice.getRegister())
                .registerDate(Timestamp.valueOf(notice.getRegisterDate()))
                .noticeFileList(notice.getNoticeFiles().stream()
                        .filter(file -> file.getUseYesNo() == 'Y')
                        .map(FileInfo::of)
                        .collect(Collectors.toList()))
                .build();
    }
}
