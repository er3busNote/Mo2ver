package com.mo2ver.web.domain.notice.dto;

import com.mo2ver.web.domain.notice.entity.NoticeFile;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class FileInfo {

    private String attachFile;
    private Character useYesNo;

    public static String from(FileInfo fileInfo) {
        return JasyptUtil.getEncryptor(Integer.valueOf(fileInfo.getAttachFile()));
    }

    public static FileInfo of(NoticeFile noticeFile) {
        return FileInfo.builder()
                .attachFile(JasyptUtil.getEncryptor(noticeFile.getAttachFile()))
                .useYesNo(noticeFile.getUseYesNo())
                .build();
    }
}
