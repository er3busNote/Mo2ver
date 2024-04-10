package com.mo2ver.web.global.common.util;

import com.mo2ver.web.global.common.properties.ImagesProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class FileUtil {

    private static final String PROJECT_DIRECTORY = System.getProperty("user.dir");

    @Autowired
    protected ImagesProperties imagesProperties;

    public Path getUploadDirectory(String directoryPath) {
        Path folderPath = Paths.get(imagesProperties.getFilepath());
        Path uploadDirectory = folderPath.resolve(directoryPath);
        this.createDirectory(uploadDirectory.toString()); // 업로드할 디렉토리가 없으면 생성
        return uploadDirectory;
    }

    public File getTargetFile(Path uploadDirectory, String targetFileName) {
        return new File(PROJECT_DIRECTORY + "/" + uploadDirectory + "/" + targetFileName);
    }

    public String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex > 0) {
            return fileName.substring(lastDotIndex + 1);
        }
        return "";
    }

    public String removeFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex > 0) {
            return fileName.substring(0, lastDotIndex);
        }
        return fileName;
    }

    private void createDirectory(String uploadDirectory) {
        File directory = new File(uploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }
}
