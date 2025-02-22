package com.mo2ver.web.common.file.dto;

import com.mo2ver.web.global.common.util.BeanUtil;
import com.mo2ver.web.global.common.util.JasyptUtil;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FileAttachInfo {

    private String fileAttachCode;
    private String fileName;
    private String fileType;
    private Integer fileSize;
    private String fileExtension;

    private static String getEncryptor(Integer id) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.encrypt(String.valueOf(id));
    }

    public static FileAttachInfo from(Integer fileAttachCode, String fileName, String fileType, Integer fileSize, String fileExtension) {
        return new FileAttachInfo(getEncryptor(fileAttachCode), fileName, fileType, fileSize, fileExtension);
    }

    public static FileAttachInfo of(FileInfo fileInfo) {
        return FileAttachInfo.builder()
                .fileAttachCode(getEncryptor(fileInfo.getFileCode()))
                .fileName(fileInfo.getFileName())
                .fileType(fileInfo.getFileType())
                .fileSize(fileInfo.getFileSize())
                .fileExtension(fileInfo.getFileExtension())
                .build();
    }
}
