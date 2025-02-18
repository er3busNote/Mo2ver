package com.mo2ver.web.common.file.dto;

import com.mo2ver.web.global.common.util.BeanUtil;
import com.mo2ver.web.global.common.util.JasyptUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileAttachDto {

    private String fileAttachCode;
    private String fileName;
    private String fileType;
    private Integer fileSize;
    private String fileExtension;

    private static String getEncryptor(Integer id) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.encrypt(String.valueOf(id));
    }

    public static FileAttachDto of(FileDto fileDto) {
        return FileAttachDto.builder()
                .fileAttachCode(getEncryptor(fileDto.getFileCode()))
                .fileName(fileDto.getFileName())
                .fileType(fileDto.getFileType())
                .fileSize(fileDto.getFileSize())
                .fileExtension(fileDto.getFileExtension())
                .build();
    }
}
