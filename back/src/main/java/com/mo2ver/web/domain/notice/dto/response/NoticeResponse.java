package com.mo2ver.web.domain.notice.dto.response;

import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.global.common.utils.ObjectUtil;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeResponse {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private Long noticeManageNo;
    private String subject;
    private String contents;
    private Character noticeYesNo;
    private String memberName;
    private String registerDate;
    private List<FileAttachInfo> noticeFileList;

    @QueryProjection
    public NoticeResponse(Long noticeManageNo, String subject, String contents, Character noticeYesNo, String memberName, LocalDateTime registerDate, List<FileInfo> fileInfoList) {
        this.noticeManageNo = noticeManageNo;
        this.subject = subject;
        this.contents = contents;
        this.noticeYesNo = noticeYesNo;
        this.memberName = memberName;
        this.registerDate = registerDate.format(formatter);
        this.noticeFileList = fileInfoList.stream().filter(ObjectUtil::nonAllFieldsNull).map(FileAttachInfo::of).collect(Collectors.toList());
    }
}
