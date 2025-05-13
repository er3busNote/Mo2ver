package com.mo2ver.web.domain.notice.dto;

import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.common.file.dto.FileInfo;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;
import java.util.stream.Collectors;

@Data
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeFileInfo {

    @NotNull(groups = Update.class)
    private Long noticeNo;

    @NotBlank(message = "제목이 존재하지 않습니다")
    private String title;

    @NotBlank(message = "공지사항이 존재하지 않습니다")
    private String contents;

    private List<FileAttachInfo> noticeFiles;

    public interface Update extends Default {}

    @QueryProjection
    public NoticeFileInfo(Long noticeNo, String title, String contents, List<FileInfo> fileInfoList) {
        this.noticeNo = noticeNo;
        this.title = title;
        this.contents = contents;
        this.noticeFiles = fileInfoList.stream().map(FileAttachInfo::of).collect(Collectors.toList());
    }
}
