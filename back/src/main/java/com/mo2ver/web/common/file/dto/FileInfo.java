package com.mo2ver.web.common.file.dto;

import com.mo2ver.web.common.file.domain.File;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileInfo {

    private Integer fileCode;
    private String fileName;
    private String filePath;
    private String fileType;
    private Integer fileSize;
    private String fileExtension;
    private String fileNameWithoutExtension;

    public static FileInfo of(File file, String fileExtension, String fileNameWithoutExtension) {
        return FileInfo.builder()
                .fileCode(file.getFileCode().intValue())
                .fileName(file.getFileName())
                .filePath(file.getFilePath())
                .fileType(file.getFileType())
                .fileSize(file.getFileSize())
                .fileExtension(fileExtension)
                .fileNameWithoutExtension(fileNameWithoutExtension)
                .build();
    }
}
