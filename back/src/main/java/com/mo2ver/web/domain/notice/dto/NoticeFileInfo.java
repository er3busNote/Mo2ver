package com.mo2ver.web.domain.notice.dto;

import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.common.file.entity.File;
import com.mo2ver.web.domain.notice.entity.Notice;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NoticeFileInfo {

    @NotNull(groups = Update.class)
    private Long noticeNo;

    @NotBlank(message = "제목이 존재하지 않습니다")
    private String title;

    @NotBlank(message = "공지사항이 존재하지 않습니다")
    private String contents;

    private List<FileAttachInfo> noticeFiles;

    public interface Update extends Default {}

    public static NoticeFileInfo of(Notice notice, Function<Long, File> fileFinder) {
        return NoticeFileInfo.builder()
                .noticeNo(notice.getNoticeManageNo())
                .title(notice.getSubject())
                .contents(notice.getNoticeContents())
                .noticeFiles(notice.getNoticeFiles().stream()
                        .filter(file -> file.getUseYesNo() == 'Y')
                        .map(file -> fileFinder.apply(file.getAttachFile().longValue()))
                        .map(FileInfo::of)
                        .map(FileAttachInfo::of)
                        .collect(Collectors.toList()))
                .build();
    }
}
