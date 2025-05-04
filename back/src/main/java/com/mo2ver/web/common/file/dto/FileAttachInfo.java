package com.mo2ver.web.common.file.dto;

import com.mo2ver.web.global.common.utils.JasyptUtil;
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

    public static FileAttachInfo from(Integer fileAttachCode, String fileName, String fileType, Integer fileSize, String fileExtension) {
        return new FileAttachInfo(JasyptUtil.getEncryptor(fileAttachCode), fileName, fileType, fileSize, fileExtension);
    }

    public static String from(Integer fileAttachCode) {
        return JasyptUtil.getEncryptor(fileAttachCode);
    }

    public static FileAttachInfo of(Integer fileAttachCode) {
        return FileAttachInfo.builder()
                .fileAttachCode(JasyptUtil.getEncryptor(fileAttachCode))
                .build();
    }

    public static FileAttachInfo of(FileInfo fileInfo) {
        return FileAttachInfo.builder()
                .fileAttachCode(JasyptUtil.getEncryptor(fileInfo.getFileCode()))
                .fileName(fileInfo.getFileName())
                .fileType(fileInfo.getFileType())
                .fileSize(fileInfo.getFileSize())
                .fileExtension(fileInfo.getFileExtension())
                .build();
    }
}
